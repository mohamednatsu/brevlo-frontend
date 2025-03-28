'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react'
import av1 from "@/assets/images/av1.jpg"
import av2 from "@/assets/images/av2.jpg"
import av3 from "@/assets/images/av3.jpg"
import av4 from "@/assets/images/av4.jpg"
import Image from 'next/image'

export default function TestimonialsSection() {
       const ref = useRef()
       const isInView = useInView(ref, { once: false, amount: 0.2 })

       const testimonials = [
              {
                     id: 1,
                     name: 'Dr. Sarah Johnson',
                     role: 'Research Scientist, MIT',
                     content: 'This AI summarizer has revolutionized how I process research papers. What used to take me hours now takes minutes, with surprisingly accurate results.',
                     rating: 5,
                     avatar: av1
              },
              {
                     id: 2,
                     name: 'Michael Chen',
                     role: 'Product Manager, Google',
                     content: 'Our team uses SummarizeAI to distill lengthy meeting notes into actionable items. The context awareness is impressive—it even recognizes our product names correctly.',
                     rating: 4,
                     avatar: av2
              },
              {
                     id: 3,
                     name: 'Emma Rodriguez',
                     role: 'Law Student, Harvard',
                     content: 'As a law student drowning in case files, this tool has been a lifesaver. It highlights key precedents and arguments better than some human summaries Ive paid for!',
                     rating: 5,
                     avatar: av4
              },
              {
                     id: 4,
                     name: 'David Park',
                     role: 'Journalist, NY Times',
                     content: 'I use SummarizeAI daily to quickly grasp the essence of long reports and press releases. The accuracy is remarkable—it even preserves nuanced political context.',
                     rating: 5,
                     avatar: av3
              }
       ]

       // Animation variants
       const container = {
              hidden: { opacity: 0 },
              show: {
                     opacity: 1,
                     transition: {
                            staggerChildren: 0.15,
                            when: "beforeChildren"
                     }
              }
       }

       const item = {
              hidden: { y: 30, opacity: 0 },
              show: (i) => ({
                     y: 0,
                     opacity: 1,
                     transition: {
                            delay: i * 0.1,
                            type: "spring",
                            stiffness: 100
                     }
              })
       }

       return (
              <section className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300" id="testimonials">
                     <div className="container mx-auto px-6">
                            <motion.div
                                   ref={ref}
                                   variants={container}
                                   initial="hidden"
                                   animate={isInView ? "show" : "hidden"}
                                   className="text-center mb-16"
                            >
                                   <motion.h2
                                          className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4"
                                          variants={item}
                                          custom={0}
                                   >
                                          Trusted by Professionals Worldwide
                                   </motion.h2>
                                   <motion.p
                                          className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
                                          variants={item}
                                          custom={0.5}
                                   >
                                          Don't just take our word for it—here's what our users say
                                   </motion.p>
                            </motion.div>

                            <div className="relative">
                                   {/* Testimonial cards */}
                                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                          {testimonials.map((testimonial, i) => (
                                                 <motion.div
                                                        key={testimonial.id}
                                                        variants={item}
                                                        custom={i + 1}
                                                        className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl dark:hover:shadow-gray-700/30 transition-all h-full flex flex-col"
                                                        whileHover={{ y: -5 }}
                                                 >
                                                        <Quote className="text-primary/30 dark:text-primary-400/30 w-8 h-8 mb-4" />
                                                        <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow">"{testimonial.content}"</p>

                                                        <div className="flex items-center gap-4">
                                                               <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                                                                      <Image
                                                                             src={testimonial.avatar}
                                                                             alt={testimonial.name}
                                                                             className="w-full h-full object-cover"
                                                                      />
                                                               </div>
                                                               <div>
                                                                      <h4 className="font-bold text-gray-900 dark:text-white">{testimonial.name}</h4>
                                                                      <p className="text-gray-500 dark:text-gray-400 text-sm">{testimonial.role}</p>
                                                                      <div className="flex mt-1">
                                                                             {[...Array(5)].map((_, starIndex) => (
                                                                                    <Star
                                                                                           key={starIndex}
                                                                                           size={16}
                                                                                           className={starIndex < testimonial.rating ?
                                                                                                  "text-yellow-400 fill-yellow-400" :
                                                                                                  "text-gray-300 dark:text-gray-600"}
                                                                                    />
                                                                             ))}
                                                                      </div>
                                                               </div>
                                                        </div>
                                                 </motion.div>
                                          ))}
                                   </div>

                                   {/* Navigation arrows */}
                                   <motion.button
                                          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 bg-white dark:bg-gray-800 p-2 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                          whileHover={{ scale: 1.1 }}
                                          whileTap={{ scale: 0.9 }}
                                   >
                                          <ChevronLeft className="text-gray-600 dark:text-gray-300" />
                                   </motion.button>
                                   <motion.button
                                          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 bg-white dark:bg-gray-800 p-2 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                          whileHover={{ scale: 1.1 }}
                                          whileTap={{ scale: 0.9 }}
                                   >
                                          <ChevronRight className="text-gray-600 dark:text-gray-300" />
                                   </motion.button>
                            </div>

                            {/* Stats bar */}
                            <motion.div
                                   initial={{ opacity: 0, y: 30 }}
                                   whileInView={{ opacity: 1, y: 0 }}
                                   viewport={{ once: true }}
                                   transition={{ delay: 0.5 }}
                                   className="mt-16 bg-gradient-to-r from-primary to-secondary rounded-xl p-8 text-white"
                            >
                                   <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                          <div className="text-center">
                                                 <div className="text-3xl font-bold mb-2">10K+</div>
                                                 <div className="text-sm opacity-90">Active Users</div>
                                          </div>
                                          <div className="text-center">
                                                 <div className="text-3xl font-bold mb-2">98%</div>
                                                 <div className="text-sm opacity-90">Accuracy Rate</div>
                                          </div>
                                          <div className="text-center">
                                                 <div className="text-3xl font-bold mb-2">4.9/5</div>
                                                 <div className="text-sm opacity-90">Average Rating</div>
                                          </div>
                                          <div className="text-center">
                                                 <div className="text-3xl font-bold mb-2">50M+</div>
                                                 <div className="text-sm opacity-90">Words Processed</div>
                                          </div>
                                   </div>
                            </motion.div>
                     </div>
              </section>
       )
}