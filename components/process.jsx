'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Upload, Cpu, FileText, Download } from 'lucide-react';

const steps = [
       { icon: <Upload size={24} />, title: "Upload Content", description: "Drag & drop files or paste text" },
       { icon: <Cpu size={24} />, title: "AI Processing", description: "Our algorithms analyze the content" },
       { icon: <FileText size={24} />, title: "Review Summary", description: "Edit and refine key points" },
       { icon: <Download size={24} />, title: "Export & Share", description: "Multiple format options" }
];

export default function ProcessSection() {
       const ref = useRef(null);
       const isInView = useInView(ref, { once: false, amount: 0.3 });

       const lineVariants = {
              hidden: { scaleX: 0 },
              show: {
                     scaleX: 1,
                     transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] }
              }
       };

       const item = {
              hidden: { y: 30, opacity: 0 },
              show: (i) => ({
                     y: 0,
                     opacity: 1,
                     transition: {
                            delay: i * 0.2 + 0.5,
                            type: "spring",
                            stiffness: 100
                     }
              })
       };

       return (
              <section ref={ref} className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
                     <div className="container mx-auto px-6">
                            <motion.div
                                   className="text-center mb-16"
                                   initial={{ opacity: 0, y: 30 }}
                                   animate={isInView ? { opacity: 1, y: 0 } : {}}
                                   transition={{ delay: 0.2 }}
                            >
                                   <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">How It Works</h2>
                                   <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                                          Simple steps to powerful results
                                   </p>
                            </motion.div>

                            <div className="relative">
                                   {/* Animated connecting line */}
                                   <motion.div
                                          className="hidden md:block absolute h-1 bg-gradient-to-r from-primary to-secondary top-1/2 left-8 right-8 -translate-y-1/2"
                                          initial="hidden"
                                          animate={isInView ? "show" : "hidden"}
                                          variants={lineVariants}
                                          style={{ transformOrigin: 'left center' }}
                                   />

                                   <div className="grid md:grid-cols-4 gap-8">
                                          {steps.map((step, i) => (
                                                 <motion.div
                                                        key={i}
                                                        custom={i}
                                                        initial="hidden"
                                                        animate={isInView ? "show" : "hidden"}
                                                        variants={item}
                                                        className="text-center bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md dark:border-white dark:border-[0.5px] relative z-10 transition-colors duration-300"
                                                        whileHover={{ scale: 1.05 }}
                                                 >
                                                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary dark:text-primary-300">
                                                               {step.icon}
                                                        </div>
                                                        <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">{step.title}</h3>
                                                        <p className="text-gray-600 dark:text-gray-400 text-sm">{step.description}</p>
                                                        <span className="absolute -top-3 -right-3 bg-secondary text-white w-8 h-8 flex items-center justify-center rounded-full font-bold">
                                                               {i + 1}
                                                        </span>
                                                 </motion.div>
                                          ))}
                                   </div>
                            </div>
                     </div>
              </section>
       );
}