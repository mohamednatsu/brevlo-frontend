'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { BrainCircuit, Sparkles, Gauge, Bookmark } from 'lucide-react';

const features = [
       {
              icon: <BrainCircuit className="w-8 h-8" />,
              title: "Context-Aware AI",
              description: "Understands academic, business, and technical content with industry-specific comprehension",
              color: "text-primary dark:text-primary-400"
       },
       {
              icon: <Sparkles className="w-8 h-8" />,
              title: "Smart Highlighting",
              description: "Identifies key terms, concepts, and action items automatically",
              color: "text-secondary dark:text-secondary-300"
       },
       {
              icon: <Gauge className="w-8 h-8" />,
              title: "Lightning Fast",
              description: "Processes 10,000 words in under 30 seconds with 98% accuracy",
              color: "text-primary dark:text-primary-400"
       },
       {
              icon: <Bookmark className="w-8 h-8" />,
              title: "Multi-Format Export",
              description: "Save as PDF, Markdown, or directly to your favorite apps",
              color: "text-secondary dark:text-secondary-300"
       }
];

export default function FeaturesSection() {
       const ref = useRef(null);
       const isInView = useInView(ref, { once: false, amount: 0.2 });

       const container = {
              hidden: { opacity: 0 },
              show: {
                     opacity: 1,
                     transition: {
                            staggerChildren: 0.15,
                            when: "beforeChildren"
                     }
              }
       };

       const item = {
              hidden: { y: 50, opacity: 0 },
              show: (i) => ({
                     y: 0,
                     opacity: 1,
                     transition: {
                            type: "spring",
                            stiffness: 100,
                            damping: 10,
                            delay: i * 0.1
                     }
              })
       };

       return (
              <motion.section
                     ref={ref}
                     variants={container}
                     initial="hidden"
                     animate={isInView ? "show" : "hidden"}
                     className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300"
              >
                     <div className="container mx-auto px-6">
                            <motion.div
                                   className="text-center mb-16"
                                   variants={item}
                                   custom={0}
                            >
                                   <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                                          Powerful Features
                                   </h2>
                                   <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                                          Everything you need to work smarter, not harder
                                   </p>
                            </motion.div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                                   {features.map((feature, i) => (
                                          <motion.div
                                                 key={i}
                                                 variants={item}
                                                 custom={i + 1}
                                                 className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl dark:hover:shadow-gray-700/50 transition-all duration-300"
                                                 whileHover={{ y: -5 }}
                                          >
                                                 <div className={`${feature.color} mb-5`}>
                                                        {feature.icon}
                                                 </div>
                                                 <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                                                        {feature.title}
                                                 </h3>
                                                 <p className="text-gray-600 dark:text-gray-300">
                                                        {feature.description}
                                                 </p>
                                          </motion.div>
                                   ))}
                            </div>
                     </div>
              </motion.section>
       );
}