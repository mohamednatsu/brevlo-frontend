'use client'

import { useEffect, useRef, useState } from 'react'
import { Lock, Mail, User, Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import logoDark from '@/assets/logo.png'
import { SlSocialGoogle } from "react-icons/sl"
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import axios from 'axios'
import { useAuth } from '@/context/AuthContext'
import { supabase } from '@/lib/supabaseClient'


// Configure your Node.js backend URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

// Configure Axios instance for Node.js backend
const api = axios.create({
       baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
       timeout: 10000, // 10 second timeout
       headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json' // Explicitly request JSON
       }
});

// Add response interceptor
api.interceptors.response.use(
       (response) => {
              // Check for HTML responses
              const contentType = response.headers['content-type'];
              if (contentType && contentType.includes('text/html')) {
                     throw new Error('Server returned HTML instead of JSON');
              }
              return response;
       },
       (error) => {
              // Handle errors globally
              return Promise.reject(error);
       }
);

export default function AuthPage() {
       const [isLogin, setIsLogin] = useState(true)
       const [showPassword, setShowPassword] = useState(false)
       const [isLoading, setIsLoading] = useState(false)
       const [errorMessage, setErrorMessage] = useState('')
       const [successMessage, setSuccessMessage] = useState('')
       const [formData, setFormData] = useState({
              name: '',
              email: '',
              password: ''
       })
       const [errors, setErrors] = useState({})
       const router = useRouter()
       const { setUser, login } = useAuth()

       const toggleAuthMode = () => {
              setIsLogin(!isLogin)
              setErrors({})
              setErrorMessage('')
       }

       const togglePasswordVisibility = () => setShowPassword(!showPassword)

       const handleChange = (e) => {
              const { name, value } = e.target
              setFormData(prev => ({ ...prev, [name]: value }))
              if (errors[name]) {
                     setErrors(prev => ({ ...prev, [name]: '' }))
              }
       }

       // Add this near your other state declarations
       const [oauthError, setOauthError] = useState('');

       // Add this to your useEffect
       useEffect(() => {
              const urlParams = new URLSearchParams(window.location.search);
              const error = urlParams.get('error');

              if (error) {
                     setOauthError(decodeURIComponent(error));
                     // Clear the error from URL
                     const cleanUrl = window.location.pathname;
                     window.history.replaceState({}, document.title, cleanUrl);
              }

              // ... rest of your useEffect for handling success
       }, [router, setUser]);

       // Add this to your JSX to display errors

       // Add a ref to your password input
       const passwordRef = useRef(null);

       // Add this effect to focus password field when switching to login
       useEffect(() => {
              if (isLogin && passwordRef.current) {
                     passwordRef.current.focus();
              }
       }, [isLogin]);

       useEffect(() => {
              const handleGoogleCallback = async () => {
                     const urlParams = new URLSearchParams(window.location.search);
                     const accessToken = urlParams.get('access_token');
                     const refreshToken = urlParams.get('refresh_token');
                     const userData = urlParams.get('user');

                     if (accessToken && userData) {
                            try {
                                   const user = JSON.parse(decodeURIComponent(userData));

                                   // Store tokens and user data
                                   setUser(user);
                                   localStorage.setItem('user', JSON.stringify(user));
                                   localStorage.setItem('token', accessToken);
                                   if (refreshToken) {
                                          localStorage.setItem('refresh_token', refreshToken);
                                   }

                                   // Redirect to dashboard
                                   const redirectPath = localStorage.getItem('redirectAfterLogin') || '/dashboard/upload';
                                   localStorage.removeItem('redirectAfterLogin');
                                   router.push(redirectPath);
                                   toast.success('Google login successful!');
                                   login(user);
                            } catch (error) {
                                   console.error('Google callback error:', error);
                                   toast.error('Failed to process Google authentication');
                                   localStorage.setItem('token', "Google callback error:");
                            }
                     }
              };

              handleGoogleCallback();
       }, [router, setUser]);

       const validateForm = () => {
              const newErrors = {}

              if (!isLogin && !formData.name.trim()) {
                     newErrors.name = 'Full name is required'
              }

              if (!formData.email.trim()) {
                     newErrors.email = 'Email is required'
              } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                     newErrors.email = 'Please enter a valid email'
              }

              if (!formData.password) {
                     newErrors.password = 'Password is required'
              } else if (!isLogin && formData.password.length < 8) {
                     newErrors.password = 'Password must be at least 8 characters'
              }

              setErrors(newErrors)
              return Object.keys(newErrors).length === 0
       }

       // Update your handleSubmit function
       const handleSubmit = async (e) => {
              
              e.preventDefault();

              if (!validateForm()) return;

              setIsLoading(true);
              setErrorMessage('');
              setSuccessMessage('');

              try {
                     const endpoint = isLogin ? '/auth/login' : '/auth/register';
                     const response = await api.post(endpoint, formData);

                     if (!response.data) {
                            throw new Error('Invalid server response');
                     }

                     const { data } = response;

                     if (data.success) {
                            if (isLogin) {
                                   setUser(data.user);

                                   // Store user session with Supabase
                                   const { data: sessionData, error } = await supabase.auth.setSession({
                                          access_token: data.access_token,
                                          refresh_token: data.refresh_token // Ensure you receive refreshToken from API
                                   });

                                   if (error) {
                                          throw new Error('Failed to set session');
                                   }

                                   console.log("Session stored:", sessionData);

                                   router.push('/dashboard/upload'); // Redirect to dashboard
                            } else {
                                   setSuccessMessage('Account created successfully! Please login.');
                                   setIsLogin(true);
                                   setFormData(prev => ({ ...prev, password: '' }));
                                   toast.success('Account created! Please login.');
                            }
                     } else {
                            setErrorMessage(data.error || 'Authentication failed');
                            throw new Error(data.error || 'Authentication failed');
                     }
              } catch (error) {
                     let errorMsg = 'An unexpected error occurred';

                     if (error.response) {
                            switch (error.response.status) {
                                   case 400:
                                          errorMsg = 'Validation error';
                                          break;
                                   case 401:
                                          errorMsg = 'Invalid email or password';
                                          break;
                                   case 409:
                                          errorMsg = 'Email already registered';
                                          break;
                                   case 500:
                                          errorMsg = 'Server error. Please try again later.';
                                          break;
                                   default:
                                          errorMsg = error.response.data?.error || error.message;
                            }
                     } else if (error.request) {
                            errorMsg = 'Network error. Please check your connection.';
                     } else {
                            errorMsg = error.message;
                     }

                     console.error('Authentication error:', error);
                     setErrorMessage(errorMsg);
                     toast.error(errorMsg);
              } finally {
                     setIsLoading(false);
              }
       };

       // Update your success message display to include login prompt
       {
              successMessage && (
                     <div className="w-full max-w-md mb-4">
                            <div className="text-green-500 text-center text-sm px-6 py-4 bg-green-500/30 capitalize rounded-lg">
                                   {successMessage}
                                   {!isLogin && (
                                          <button
                                                 onClick={() => setIsLogin(true)}
                                                 className="block mt-2 text-primary hover:underline"
                                          >
                                                 Click here to login
                                          </button>
                                   )}
                            </div>
                     </div>
              )
       }

       const handleGoogleSignIn = () => {
              // Store the desired redirect path
              localStorage.setItem('redirectAfterLogin', '/dashboard/upload');
              login();
              // Initiate Google OAuth flow
              window.location.href = `${API_BASE_URL}/auth/google`;
       }

       return (
              <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
                     <div className="container mx-auto px-6 py-12">
                            <div className="flex flex-col items-center">
                                   {/* Logo */}
                                   <div className="mb-8">
                                          <div className="block">
                                                 <Image
                                                        src={logoDark}
                                                        alt="Logo"
                                                        className='rounded-lg shadow-md hover:scale-105 transition-transform'
                                                        width={180}
                                                        height={40}
                                                 />
                                          </div>
                                   </div>

                                   {errorMessage && (
                                          <div className="w-full max-w-md mb-4">
                                                 <div className="text-red-500 text-center text-sm px-6 py-4 bg-red-500/30 capitalize rounded-lg">
                                                        {errorMessage}
                                                 </div>
                                          </div>
                                   )}
                                   {successMessage && (
                                          <div className="w-full max-w-md mb-4">
                                                 <div className="text-green-500 text-center text-sm px-6 py-4 bg-green-500/30 capitalize rounded-lg">
                                                        {successMessage}
                                                 </div>
                                          </div>
                                   )}
                                   {
                                          oauthError && (
                                                 <div className="w-full max-w-md mb-4">
                                                        <div className="text-red-500 text-sm px-6 py-4 bg-red-500/30 capitalize rounded-lg">
                                                               {oauthError}
                                                        </div>
                                                 </div>
                                          )
                                   }

                                   {/* Auth Card */}
                                   <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-colors duration-300">
                                          {/* Tabs */}
                                          <div className="flex border-b border-gray-200 dark:border-gray-700">
                                                 <button
                                                        className={`flex-1 py-4 px-6 text-center font-medium ${isLogin ? 'text-primary border-b-2 border-primary' : 'text-gray-500 dark:text-gray-400'}`}
                                                        onClick={toggleAuthMode}
                                                 >
                                                        Sign In
                                                 </button>
                                                 <button
                                                        className={`flex-1 py-4 px-6 text-center font-medium ${!isLogin ? 'text-primary border-b-2 border-primary' : 'text-gray-500 dark:text-gray-400'}`}
                                                        onClick={toggleAuthMode}
                                                 >
                                                        Sign Up
                                                 </button>
                                          </div>

                                          {/* Form */}
                                          <form onSubmit={handleSubmit} className="p-6 space-y-4">
                                                 {!isLogin && (
                                                        <div className="space-y-2">
                                                               <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                                      Full Name
                                                               </label>
                                                               <div className="relative">
                                                                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                                             <User className="h-5 w-5 text-gray-400" />
                                                                      </div>
                                                                      <input
                                                                             type="text"
                                                                             id="name"
                                                                             name="name"
                                                                             value={formData.name}
                                                                             onChange={handleChange}
                                                                             className={`block w-full pl-10 pr-10 py-3 border ${errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none`}
                                                                             placeholder="John Doe"
                                                                      />
                                                               </div>
                                                               {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                                        </div>
                                                 )}

                                                 <div className="space-y-2">
                                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                               Email Address
                                                        </label>
                                                        <div className="relative">
                                                               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                                      <Mail className="h-5 w-5 text-gray-400" />
                                                               </div>
                                                               <input
                                                                      type="email"
                                                                      id="email"
                                                                      name="email"
                                                                      value={formData.email}
                                                                      onChange={handleChange}
                                                                      className={`block w-full pl-10 pr-10 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none`}
                                                                      placeholder="your@email.com"
                                                               />
                                                        </div>
                                                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                                 </div>

                                                 <div className="space-y-2">
                                                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                               Password
                                                        </label>
                                                        <div className="relative">
                                                               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                                      <Lock className="h-5 w-5 text-gray-400" />
                                                               </div>
                                                               <input
                                                                      type={showPassword ? "text" : "password"}
                                                                      id="password"
                                                                      ref={passwordRef}
                                                                      name="password"
                                                                      value={formData.password}
                                                                      onChange={handleChange}
                                                                      className={`block w-full pl-10 pr-10 py-3 border ${errors.password ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none`}
                                                                      placeholder={isLogin ? "Your password" : "At least 8 characters"}
                                                               />
                                                               <button
                                                                      type="button"
                                                                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                                                      onClick={togglePasswordVisibility}
                                                               >
                                                                      {showPassword ? (
                                                                             <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300" />
                                                                      ) : (
                                                                             <Eye className="h-5 w-5 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300" />
                                                                      )}
                                                               </button>
                                                        </div>
                                                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                                                 </div>

                                                 {isLogin && (
                                                        <div className="flex items-center justify-between">
                                                               <div className="flex items-center">
                                                                      <input
                                                                             id="remember-me"
                                                                             name="remember-me"
                                                                             type="checkbox"
                                                                             className="h-4 w-4 text-primary focus:ring-primary border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
                                                                      />
                                                                      <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                                                                             Remember me
                                                                      </label>
                                                               </div>
                                                               <Link href="/forgot-password" className="text-sm text-primary hover:text-primary/80">
                                                                      Forgot password?
                                                               </Link>
                                                        </div>
                                                 )}

                                                 <button
                                                        type="submit"
                                                        className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all disabled:opacity-70"
                                                        disabled={isLoading}
                                                 >
                                                        {isLoading ? (
                                                               <Loader2 className="h-5 w-5 animate-spin" />
                                                        ) : (
                                                               <>
                                                                      {isLogin ? 'Sign In' : 'Create Account'}
                                                                      <ArrowRight className="ml-2 h-4 w-4" />
                                                               </>
                                                        )}
                                                 </button>
                                          </form>

                                          {/* Social Auth */}
                                          <div className="px-6 pb-6">
                                                 <div className="relative">
                                                        <div className="absolute inset-0 flex items-center">
                                                               <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                                                        </div>
                                                        <div className="relative flex justify-center text-sm">
                                                               <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                                                                      Or continue with
                                                               </span>
                                                        </div>
                                                 </div>

                                                 <div className="mt-6 grid grid-cols-1 gap-3">
                                                        <button
                                                               type="button"
                                                               onClick={handleGoogleSignIn}
                                                               className="w-full inline-flex justify-center items-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all"
                                                               disabled={isLoading}
                                                        >
                                                               <SlSocialGoogle className="h-5 w-5" />
                                                               <span className="ml-2">Google</span>
                                                        </button>
                                                 </div>
                                          </div>

                                          {/* Switch Auth Mode */}
                                          <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 text-center">
                                                 <p className="text-sm text-gray-600 dark:text-gray-300">
                                                        {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                                                        <button
                                                               type="button"
                                                               onClick={toggleAuthMode}
                                                               className="font-medium text-primary hover:text-primary/80"
                                                        >
                                                               {isLogin ? 'Sign up' : 'Sign in'}
                                                        </button>
                                                 </p>
                                          </div>
                                   </div>

                                   {/* Footer Links */}
                                   <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
                                          <p>© {new Date().getFullYear()} Brevlo . All rights reserved.</p>
                                          <div className="mt-2 flex justify-center space-x-4">
                                                 <Link href="/terms" className="hover:text-gray-700 dark:hover:text-gray-300">
                                                        Terms
                                                 </Link>
                                                 <Link href="/privacy" className="hover:text-gray-700 dark:hover:text-gray-300">
                                                        Privacy
                                                 </Link>
                                                 <Link href="/contact" className="hover:text-gray-700 dark:hover:text-gray-300">
                                                        Contact
                                                 </Link>
                                          </div>
                                   </div>
                            </div>
                     </div>
              </div>
       )
}