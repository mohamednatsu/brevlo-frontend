'use client'

import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { Sparkle } from 'lucide-react'
import { Mail, Twitter, Github, Linkedin } from 'lucide-react'
import logo from "@/assets/logo.png"
import Image from 'next/image'


export default function Footer() {
       const currentYear = new Date().getFullYear()

       const footerLinks = [
              {
                     title: 'Product',
                     links: [
                            { name: 'Features', href: '/features' },
                            { name: 'Pricing', href: '/pricing' },
                            { name: 'Demo', href: '/demo' },
                            { name: 'Updates', href: '/updates' }
                     ]
              },
              {
                     title: 'Company',
                     links: [
                            { name: 'About', href: '/about' },
                            { name: 'Careers', href: '/careers' },
                            { name: 'Blog', href: '/blog' },
                            { name: 'Press', href: '/press' }
                     ]
              },
              {
                     title: 'Resources',
                     links: [
                            { name: 'Documentation', href: '/docs' },
                            { name: 'Help Center', href: '/support' },
                            { name: 'API Status', href: '/status' },
                            { name: 'Community', href: '/community' }
                     ]
              },
              {
                     title: 'Legal',
                     links: [
                            { name: 'Privacy', href: '/privacy' },
                            { name: 'Terms', href: '/terms' },
                            { name: 'Security', href: '/security' },
                            { name: 'Cookies', href: '/cookies' }
                     ]
              }
       ]

       const socialLinks = [
              { icon: <Twitter size={20} />, href: 'https://twitter.com' },
              { icon: <Github size={20} />, href: 'https://github.com' },
              { icon: <Linkedin size={20} />, href: 'https://linkedin.com' },
              { icon: <Mail size={20} />, href: 'mailto:contact@example.com' }
       ]

       return (
              <footer className="bg-dark text-white pt-16 pb-8">
                     <div className="container mx-auto px-6">
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 mb-12">
                                   {/* Logo and description */}
                                   <motion.div
                                          initial={{ opacity: 0, y: 20 }}
                                          whileInView={{ opacity: 1, y: 0 }}
                                          viewport={{ once: true }}
                                          transition={{ delay: 0.1 }}
                                          className="col-span-2 lg:col-span-1"
                                   >
                                          <div className="flex items-center gap-2 mb-4">
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
                                                               className='w-[70px] h-[70px] hover:translate-y-[-2]  transition-all duration-300 rounded-lg'
                                                        />
                                                 </motion.div>
                                          </div>
                                          <p className="text-gray-400 mb-6">
                                                 Transforming content into actionable insights with advanced AI technology.
                                          </p>
                                          <div className="flex gap-4">
                                                 {socialLinks.map((social, index) => (
                                                        <motion.a
                                                               key={index}
                                                               href={social.href}
                                                               target="_blank"
                                                               rel="noopener noreferrer"
                                                               whileHover={{ y: -3, color: '#ffd061' }}
                                                               className="text-gray-400 hover:text-secondary transition-colors"
                                                        >
                                                               {social.icon}
                                                        </motion.a>
                                                 ))}
                                          </div>
                                   </motion.div>

                                   {/* Footer links columns */}
                                   {footerLinks.map((column, index) => (
                                          <motion.div
                                                 key={column.title}
                                                 initial={{ opacity: 0, y: 20 }}
                                                 whileInView={{ opacity: 1, y: 0 }}
                                                 viewport={{ once: true }}
                                                 transition={{ delay: 0.2 + index * 0.1 }}
                                          >
                                                 <h3 className="text-lg font-semibold mb-4 text-white">{column.title}</h3>
                                                 <ul className="space-y-3">
                                                        {column.links.map((link) => (
                                                               <li key={link.name}>
                                                                      <motion.a
                                                                             href={link.href}
                                                                             className="text-gray-400 hover:text-white transition-colors"
                                                                             whileHover={{ x: 5 }}
                                                                      >
                                                                             {link.name}
                                                                      </motion.a>
                                                               </li>
                                                        ))}
                                                 </ul>
                                          </motion.div>
                                   ))}

                                   {/* Newsletter (mobile full width) */}
                                   <motion.div
                                          initial={{ opacity: 0, y: 20 }}
                                          whileInView={{ opacity: 1, y: 0 }}
                                          viewport={{ once: true }}
                                          transition={{ delay: 0.5 }}
                                          className="col-span-2 md:col-span-4 lg:col-span-1 mt-8 lg:mt-0"
                                   >
                                          <h3 className="text-lg font-semibold mb-4 text-white">Stay Updated</h3>
                                          <p className="text-gray-400 mb-4">
                                                 Subscribe to our newsletter for the latest updates.
                                          </p>
                                          <div className="flex">
                                                 <input
                                                        type="email"
                                                        placeholder="Your email"
                                                        className="bg-gray-800 text-white px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary w-full"
                                                 />
                                                 <motion.button
                                                        className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-r-lg transition-colors"
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                 >
                                                        Subscribe
                                                 </motion.button>
                                          </div>
                                   </motion.div>
                            </div>

                            {/* Divider */}
                            <motion.div
                                   initial={{ scaleX: 0 }}
                                   whileInView={{ scaleX: 1 }}
                                   viewport={{ once: true }}
                                   transition={{ duration: 0.5 }}
                                   className="h-px bg-gray-700 w-full my-8"
                                   style={{ originX: 0 }}
                            />

                            {/* Bottom row */}
                            <div className="flex flex-col md:flex-row justify-between items-center">
                                   <motion.p
                                          initial={{ opacity: 0 }}
                                          whileInView={{ opacity: 1 }}
                                          viewport={{ once: true }}
                                          transition={{ delay: 0.6 }}
                                          className="text-gray-500 text-sm mb-4 md:mb-0"
                                   >
                                          © {currentYear} Brevlo. All rights reserved.
                                   </motion.p>

                                   <div className="flex gap-6">
                                          <motion.a
                                                 href="/terms"
                                                 className="text-gray-500 hover:text-white text-sm transition-colors cursor-pointer"
                                                 initial={{ opacity: 0 }}
                                                 whileInView={{ opacity: 1 }}
                                                 viewport={{ once: true }}
                                                 transition={{ delay: 0.7 }}
                                          >
                                                 Terms of Service
                                          </motion.a>
                                          <motion.a
                                                 href="/privacy"
                                                 className="text-gray-500 hover:text-white text-sm transition-colors cursor-pointer"
                                                 initial={{ opacity: 0 }}
                                                 whileInView={{ opacity: 1 }}
                                                 viewport={{ once: true }}
                                                 transition={{ delay: 0.8 }}
                                          >
                                                 Privacy Policy
                                          </motion.a>
                                          <motion.a
                                                 href="/cookies"
                                                 className="text-gray-500 hover:text-white text-sm transition-colors cursor-pointer"
                                                 initial={{ opacity: 0 }}
                                                 whileInView={{ opacity: 1 }}
                                                 viewport={{ once: true }}
                                                 transition={{ delay: 0.9 }}
                                          >
                                                 Cookie Policy
                                          </motion.a>
                                   </div>
                            </div>
                     </div>
              </footer>
       )
}