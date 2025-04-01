'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

export default function AuthSuccessPage() {
       const router = useRouter();
       const { setUser } = useAuth();

       useEffect(() => {
              const handleAuthSuccess = async () => {
                     try {
                            // Extract token from URL
                            const params = new URLSearchParams(window.location.search);
                            const token = params.get('token');

                            if (!token) {
                                   throw new Error('Authentication token missing');
                            }

                            // Store token
                            localStorage.setItem('token', token);

                            // Fetch user data
                            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/auth/me`, {
                                   headers: {
                                          'Authorization': `Bearer ${token}`
                                   }
                            });

                            if (!response.ok) {
                                   throw new Error('Failed to fetch user data');
                            }

                            const { user } = await response.json();

                            // Update auth context
                            setUser(user);
                            localStorage.setItem('user', JSON.stringify(user));

                            // Redirect to dashboard/upload
                            const redirectPath ='/dashboard/upload';
                            localStorage.removeItem('redirectAfterLogin');
                            router.push(redirectPath);

                     } catch (error) {
                            console.error('Authentication error:', error);
                            toast.error(error.message);
                            router.push('/auth');
                     }
              };

              handleAuthSuccess();
       }, [router, setUser]);

       return (
              <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
                     <div className="text-center">
                            <h1 className="text-2xl font-bold mb-4">Authenticating...</h1>
                            <p>Please wait while we log you in.</p>
                     </div>
              </div>
       );
}