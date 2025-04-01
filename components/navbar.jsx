'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import logo from '@/assets/logo.png';
import MainButton from './ui/MainButton';
import SecondButton from './ui/SecondButton';
import ThemeToggle from './ui/ThemeToggle';
import Link from 'next/link';

const navItems = [
       { name: 'Home', href: '/' },
       { name: 'Features', href: '/features' },
       { name: 'Pricing', href: '/pricing' },
       { name: 'About', href: '/about' },
];

export default function Navbar() {
       const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
       const [scrolled, setScrolled] = useState(false);

       useEffect(() => {
              const handleScroll = () => {
                     if (window.scrollY > 10) {
                            setScrolled(true);
                     } else {
                            setScrolled(false);
                     }
              };

              window.addEventListener('scroll', handleScroll);
              return () => window.removeEventListener('scroll', handleScroll);
       }, []);

       return (
              <motion.header
                     initial={{ opacity: 0, y: -20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.5 }}
                     className={`fixed top-0 left-0 right-0 z-50 md:w-3/4 w-[90%] mx-auto rounded-lg mt-4 shadow-xl ${scrolled ? 'bg-white shadow-lg' : 'bg-white backdrop-blur-sm'}`}
              >
                     <div className="container mx-auto px-4 py-3">
                            <div className="flex justify-between items-center px-5">
                                   <div className="md:hidden block">
                                          <ThemeToggle />
                                   </div>
                                   {/* Logo */}
                                   <motion.div
                                          initial={{ scale: 0.8, opacity: 0 }}
                                          animate={{ scale: 1, opacity: 1 }}
                                          transition={{ delay: 0.2 }}
                                          className='cursor-pointer '
                                   >
                                          <Image
                                                 alt='logo'
                                                 quality={100}
                                                 src={logo}
                                                 className='w-[60px] h-[60px] hover:translate-y-[-2]  transition-all duration-300'
                                          />
                                   </motion.div>

                                   {/* Desktop Navigation */}
                                   <nav className="hidden md:flex items-center space-x-8">
                                          {navItems.map((item) => (
                                                 <motion.a
                                                        key={item.name}
                                                        href={item.href}
                                                        className="text-gray-700 hover:text-primary transition-colors relative group"
                                                        whileHover={{ scale: 1.09 }}
                                                 >
                                                        {item.name}
                                                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
                                                 </motion.a>
                                          ))}
                                          <div className="md:block hidden">
                                                 <ThemeToggle />
                                          </div>

                                          <div className="flex justify-center items-center gap-5">
                                                 <MainButton>
                                                        <Link href={"/auth"}>
                                                               Sign Up
                                                        </Link>
                                                 </MainButton>
                                                 <SecondButton>
                                                        <Link href={"/auth"}>
                                                               Log in
                                                        </Link>
                                                 </SecondButton>
                                          </div>
                                   </nav>

                                   {/* Mobile Menu Button */}
                                   <motion.button
                                          className="md:hidden p-2 rounded-md text-gray-700"
                                          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                          whileTap={{ scale: 0.95 }}
                                   >
                                          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                                   </motion.button>
                            </div>

                            {/* Mobile Menu */}
                            <AnimatePresence>

                                   {mobileMenuOpen && (
                                          <motion.nav
                                                 initial={{ opacity: 0, height: 0 }}
                                                 animate={{ opacity: 1, height: 'auto' }}
                                                 exit={{ opacity: 0, height: 0 }}
                                                 transition={{ duration: 0.3 }}
                                                 className="md:hidden overflow-hidden"
                                          >
                                                 <div className="pt-4 pb-6 space-y-5">
                                                        {navItems.map((item) => (
                                                               <motion.a
                                                                      key={item.name}
                                                                      href={item.href}
                                                                      className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                                                                      initial={{ x: -20, opacity: 0 }}
                                                                      animate={{ x: 0, opacity: 1 }}
                                                                      exit={{ x: -20, opacity: 0 }}
                                                                      transition={{ duration: 0.2 }}
                                                                      onClick={() => setMobileMenuOpen(false)}
                                                               >
                                                                      {item.name}
                                                               </motion.a>
                                                        ))}


                                                        <div className="flex justify-center items-center gap-5">
                                                               <MainButton>
                                                                      <Link href={"/auth"}>
                                                                             Sign Up
                                                                      </Link>
                                                               </MainButton>
                                                               <SecondButton>
                                                                      <Link href={"/auth"}>
                                                                             Log in
                                                                      </Link>
                                                               </SecondButton>
                                                        </div>
                                                 </div>
                                          </motion.nav>
                                   )}
                            </AnimatePresence>
                     </div>
              </motion.header>
       );
}