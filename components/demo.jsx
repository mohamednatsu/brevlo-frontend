// components/DemoSection.tsx
'use client';

import { motion } from 'framer-motion';
// import { Textarea } from './ui/textarea';
// import { Button } from './ui/MainButton';

export default function DemoSection() {
       return (
              <section className="py-20 bg-gradient-to-br from-dark to-dark/90 text-white">
                     <div className="container mx-auto px-6">
                            <div className="flex flex-col lg:flex-row gap-12 items-center">
                                   <motion.div
                                          className="lg:w-1/2"
                                          initial={{ opacity: 0, x: -30 }}
                                          whileInView={{ opacity: 1, x: 0 }}
                                          viewport={{ once: true }}
                                   >
                                          <h2 className="text-4xl font-bold mb-6">Try It Yourself</h2>
                                          <p className="text-gray-300 mb-8">
                                                 Paste any text below to see our AI in action
                                          </p>

                                          <textarea
                                                 placeholder="Paste article, lecture notes, or meeting transcript..."
                                                 className="min-h-[200px] bg-gray-800 border-gray-700 text-white mb-4"
                                          />
                                          <button className="bg-primary hover:bg-primary/90">
                                                 Generate Summary
                                          </button>
                                   </motion.div>

                                   <motion.div
                                          className="lg:w-1/2 bg-white/10 backdrop-blur p-8 rounded-xl border border-gray-700"
                                          initial={{ opacity: 0, x: 30 }}
                                          whileInView={{ opacity: 1, x: 0 }}
                                          viewport={{ once: true }}
                                   >
                                          <div className="h-64 flex items-center justify-center">
                                                 <p className="text-gray-400">AI-generated summary will appear here</p>
                                          </div>
                                   </motion.div>
                            </div>
                     </div>
              </section>
       );
}