'use client';

import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ArrowRight, Sparkles, Zap, BookOpen, Mic, ChevronRight } from 'lucide-react';

export default function HeroSection() {
       const [currentFeature, setCurrentFeature] = useState(0);
       const controls = useAnimation();
       const textControls = useAnimation();

       const features = [
              {
                     title: "Lecture Notes",
                     description: "Transform lengthy lectures into concise study guides",
                     icon: <BookOpen size={20} />
              },
              {
                     title: "Meeting Minutes",
                     description: "Extract action items from hours of discussions",
                     icon: <Mic size={20} />
              },
              {
                     title: "Research Papers",
                     description: "Get key findings without reading entire documents",
                     icon: <Zap size={20} />
              }
       ];

       // Auto-rotate features
       useEffect(() => {
              const interval = setInterval(() => {
                     setCurrentFeature((prev) => (prev + 1) % features.length);
              }, 3000);
              return () => clearInterval(interval);
       }, [features.length]);

       // Animation sequences
       useEffect(() => {
              const sequence = async () => {
                     await controls.start({
                            y: [0, -10, 0],
                            transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                     });

                     await textControls.start({
                            backgroundPosition: ['0% 50%', '100% 50%'],
                            transition: { duration: 3, repeat: Infinity, repeatType: "reverse" }
                     });
              };
              sequence();
       }, [controls, textControls]);

       return (
              <section className="relative overflow-hidden min-h-[90vh] md:min-h-[80vh] flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 sm:px-6 transition-colors duration-300 my-9 rounded-lg">
                     {/* Modern geometric background */}
                     <div className="absolute inset-0 overflow-hidden opacity-10 dark:opacity-5">
                            <div className="absolute top-0 right-9 w-64 h-64 bg-primary rounded-full mix-blend-multiply filter blur-3xl dark:bg-primary/70"></div>
                            <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary rounded-full mix-blend-multiply filter blur-3xl dark:bg-secondary/70"></div>
                     </div>

                     <div className="container mx-auto py-16 relative z-10">
                            <div className="flex flex-col lg:flex-row items-center gap-8 xl:gap-12">
                                   {/* Left content */}
                                   <div className="lg:w-1/2 space-y-6 md:space-y-8">
                                          <motion.div
                                                 initial={{ opacity: 0, y: 20 }}
                                                 animate={{ opacity: 1, y: 0 }}
                                                 transition={{ duration: 0.8 }}
                                          >
                                                 <motion.span
                                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-300 mb-3 md:mb-4 text-sm md:text-base"
                                                        whileHover={{ scale: 1.05 }}
                                                 >
                                                        <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
                                                        <span className="font-medium">Next-Gen AI Summarization</span>
                                                 </motion.span>

                                                 <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6 leading-tight">
                                                        <motion.span
                                                               className="bg-[linear-gradient(90deg,#e84545,#ffd061,#e84545)] bg-[length:200%_auto] bg-clip-text text-transparent"
                                                               animate={textControls}
                                                        >
                                                               Smarter Reading,
                                                        </motion.span>{' '}
                                                        <br className="hidden sm:block" />Faster Understanding
                                                 </h1>

                                                 {/* Animated feature carousel */}
                                                 <div className="relative h-24 md:h-32 mb-6 md:mb-8 overflow-hidden">
                                                        <AnimatePresence mode="wait">
                                                               <motion.div
                                                                      key={currentFeature}
                                                                      initial={{ opacity: 0, y: 20 }}
                                                                      animate={{ opacity: 1, y: 0 }}
                                                                      exit={{ opacity: 0, y: -20 }}
                                                                      transition={{ duration: 0.5 }}
                                                                      className="absolute inset-0"
                                                               >
                                                                      <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-2">
                                                                             {features[currentFeature].description}
                                                                      </p>
                                                                      <div className="flex items-center gap-2 text-primary dark:text-primary-400 font-medium">
                                                                             {features[currentFeature].icon}
                                                                             <span>{features[currentFeature].title}</span>
                                                                      </div>
                                                               </motion.div>
                                                        </AnimatePresence>
                                                 </div>

                                                 <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                                                        <motion.button
                                                               className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-5 py-2 sm:px-6 sm:py-3 rounded-lg font-medium transition-colors shadow-md dark:shadow-primary/30 text-sm sm:text-base"
                                                               whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(232, 69, 69, 0.3)" }}
                                                               whileTap={{ scale: 0.95 }}
                                                        >
                                                               Get Started <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                                                        </motion.button>

                                                        <motion.button
                                                               className="flex items-center justify-center gap-2 border-2 border-secondary text-gray-900 dark:text-white hover:bg-secondary/10 px-5 py-2 sm:px-6 sm:py-3 rounded-lg font-medium transition-colors text-sm sm:text-base"
                                                               whileHover={{
                                                                      scale: 1.05,
                                                                      backgroundColor: 'rgba(255, 208, 97, 0.1)'
                                                               }}
                                                               whileTap={{ scale: 0.95 }}
                                                        >
                                                               See Live Demo
                                                        </motion.button>
                                                 </div>
                                          </motion.div>
                                   </div>

                                   {/* Right content - animated 3D card */}
                                   <div className="lg:w-1/2 relative mt-8 lg:mt-0 w-full max-w-lg mx-auto lg:mx-0">
                                          <motion.div
                                                 className="relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-xl dark:shadow-gray-900/50"
                                                 initial={{ opacity: 0, y: 50, rotateY: 15 }}
                                                 animate={{
                                                        opacity: 1,
                                                        y: 0,
                                                        rotateY: 0,
                                                        transition: { type: 'spring', stiffness: 100 }
                                                 }}
                                                 whileHover={{
                                                        y: -10,
                                                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                                                 }}
                                          >
                                                 <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-r from-primary to-secondary flex items-center px-4">
                                                        <div className="flex gap-2">
                                                               <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-white/80"></div>
                                                               <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-white/60"></div>
                                                               <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-white/40"></div>
                                                        </div>
                                                 </div>

                                                 <motion.div
                                                        className="p-6 sm:p-8 pt-14 sm:pt-16"
                                                        animate={controls}
                                                 >
                                                        <div className="space-y-4 sm:space-y-6">
                                                               {/* Animated summary visualization */}
                                                               <div className="relative">
                                                                      <div className="h-3 sm:h-4 bg-gray-200 dark:bg-gray-700 rounded-full mb-3 sm:mb-4 w-full"></div>
                                                                      <motion.div
                                                                             className="absolute top-0 h-3 sm:h-4 bg-primary rounded-full"
                                                                             initial={{ width: 0 }}
                                                                             animate={{ width: '85%' }}
                                                                             transition={{ delay: 0.5, duration: 1.5 }}
                                                                      ></motion.div>
                                                               </div>

                                                               <div className="grid grid-cols-3 gap-3 sm:gap-4">
                                                                      {features.map((feature, index) => (
                                                                             <motion.div
                                                                                    key={index}
                                                                                    className="h-16 sm:h-24 bg-gray-100 dark:bg-gray-700 rounded-lg flex flex-col items-center justify-center p-2"
                                                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                                                    animate={{ opacity: 1, scale: 1 }}
                                                                                    transition={{ delay: 0.2 + index * 0.1 }}
                                                                             >
                                                                                    <div className="text-primary dark:text-primary-400 mb-1">
                                                                                           {feature.icon}
                                                                                    </div>
                                                                                    <span className="text-xs sm:text-sm text-center font-medium text-gray-900 dark:text-white">
                                                                                           {feature.title}
                                                                                    </span>
                                                                             </motion.div>
                                                                      ))}
                                                               </div>

                                                               <motion.div
                                                                      className="bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 p-3 sm:p-4 rounded-lg"
                                                                      initial={{ opacity: 0 }}
                                                                      animate={{ opacity: 1 }}
                                                                      transition={{ delay: 1.5 }}
                                                               >
                                                                      <div className="h-2 sm:h-3 bg-primary/30 dark:bg-primary/40 rounded-full w-3/4 mb-1 sm:mb-2"></div>
                                                                      <div className="h-2 sm:h-3 bg-secondary/30 dark:bg-secondary/40 rounded-full w-1/2"></div>
                                                               </motion.div>
                                                        </div>
                                                 </motion.div>
                                          </motion.div>

                                          {/* Floating AI orb - only on larger screens */}
                                          <motion.div
                                                 className="hidden absolute -bottom-6 -right-6 w-16 h-16 lg:w-24 lg:h-24 rounded-full bg-gradient-to-r from-primary to-secondary md:flex items-center justify-center shadow-lg"
                                                 initial={{ scale: 0, opacity: 0 }}
                                                 animate={{
                                                        scale: 1,
                                                        opacity: 1,
                                                        y: [0, -15, 0],
                                                        rotate: [0, 10, -10, 0]
                                                 }}
                                                 transition={{
                                                        delay: 0.5,
                                                        y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                                                        rotate: { duration: 8, repeat: Infinity, ease: "easeInOut" }
                                                 }}
                                          >
                                                 <Sparkles className="text-white w-6 h-6 lg:w-8 lg:h-8" />
                                          </motion.div>

                                          {/* Mobile feature switcher */}
                                          <div className="md:hidden flex justify-center gap-2 mt-6">
                                                 {features.map((_, index) => (
                                                        <button
                                                               key={index}
                                                               onClick={() => setCurrentFeature(index)}
                                                               className={`w-2 h-2 rounded-full ${currentFeature === index ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'}`}
                                                               aria-label={`Show feature ${index + 1}`}
                                                        />
                                                 ))}
                                          </div>
                                   </div>
                            </div>
                     </div>
              </section>
       );
}