// context/AuthContext.js
'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
       const [user, setUser] = useState(null)
       const [loading, setLoading] = useState(true)
       const [isUpdatingRequests, setIsUpdatingRequests] = useState(false)
       const router = useRouter()

       useEffect(() => {
              const loadUser = async () => {
                     try {
                            // Get session from Supabase
                            const { data: { session }, error } = await supabase.auth.getSession()

                            if (error) throw error

                            if (session) {
                                   // Get user profile with remaining requests
                                   const { data: profile, error: profileError } = await supabase
                                          .from('profiles')
                                          .select('*')
                                          .eq('id', session.user.id)
                                          .single()

                                   if (profileError) throw profileError

                                   const userData = {
                                          id: session.user.id,
                                          email: session.user.email,
                                          name: profile.full_name || session.user.email.split('@')[0],
                                          avatar: profile.avatar_url || null,
                                          isVerified: session.user.email_confirmed_at !== null,
                                          remainingRequests: profile.remaining_requests || 0,
                                          isPro: profile.is_pro || false
                                   }

                                   setUser(userData)
                                   localStorage.setItem('user', JSON.stringify(userData))
                                   localStorage.setItem('token', session.access_token)
                            }
                     } catch (error) {
                            console.error('Failed to load user:', error)
                     } finally {
                            setLoading(false)
                     }
              }

              loadUser()
       }, [])

       const login = async (userData) => {
              try {
                     // Get fresh profile data on login
                     const { data: profile, error } = await supabase
                            .from('profiles')
                            .select('*')
                            .eq('id', userData.id)
                            .single()

                     if (error) throw error

                     const completeUserData = {
                            ...userData,
                            remainingRequests: profile.remaining_requests,
                            isPro: profile.is_pro
                     }

                     setUser(completeUserData)
                     localStorage.setItem('user', JSON.stringify(completeUserData))
              } catch (error) {
                     console.error('Login error:', error)
              }
       }


       const updateRemainingRequests = async (decrementBy = 1) => {
              if (!user || isUpdatingRequests) return;

              setIsUpdatingRequests(true);

              try {
                     // Get fresh data from database to avoid race conditions
                     const { data: current, error: fetchError } = await supabase
                            .from('profiles')
                            .select('remaining_requests, is_pro')
                            .eq('id', user.id)
                            .single();

                     if (fetchError) throw fetchError;

                     // Don't decrement for Pro users
                     if (current.is_pro) {
                            setIsUpdatingRequests(false);
                            return;
                     }

                     // Calculate new count (never below 0)
                     const newCount = Math.max(0, current.remaining_requests - decrementBy);

                     // Update database
                     const { error: updateError } = await supabase
                            .from('profiles')
                            .update({ remaining_requests: newCount })
                            .eq('id', user.id);

                     if (updateError) throw updateError;

                     // Update state
                     setUser(prev => ({
                            ...prev,
                            remainingRequests: newCount
                     }));

                     return newCount;
              } catch (error) {
                     console.error('Failed to update remaining requests:', error);
                     throw error;
              } finally {
                     setIsUpdatingRequests(false);
              }
       };

       const logout = async () => {
              try {
                     await supabase.auth.signOut()
                     setUser(null)
                     localStorage.removeItem('user')
                     localStorage.removeItem('token')
                     router.push('/auth')
              } catch (error) {
                     console.error('Logout failed:', error)
              }
       }

       return (
              <AuthContext.Provider value={{
                     user,
                     loading,
                     login,
                     logout,
                     setUser,
                     updateRemainingRequests
              }}>
                     {children}
              </AuthContext.Provider>
       )
}

export const useAuth = () => {
       const context = useContext(AuthContext)
       if (!context) {
              throw new Error('useAuth must be used within an AuthProvider')
       }
       return context
}