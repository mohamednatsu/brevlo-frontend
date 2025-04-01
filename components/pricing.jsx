'use client'

import { motion } from 'framer-motion'
import { Check, Zap, Star, Gem, Crown, Sparkles } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'
import Link from 'next/link'

export default function PricingPage() {
       const { theme } = useTheme()
       const plans = [
              {
                     name: 'Starter',
                     price: '$0',
                     period: 'per month',
                     description: 'Perfect for individuals getting started',
                     icon: <Zap className="text-primary dark:text-primary-400" size={20} />,
                     featured: false,
                     cta: 'Get Started',
                     features: [
                            '15 summaries per month',
                            'Basic AI models',
                            'PDF & Text exports',
                            'Email support',
                            '1 user account'
                     ]
              },
              {
                     name: 'Pro',
                     price: '$9',
                     period: 'per month',
                     description: 'For power users and small teams',
                     icon: <Star className="text-secondary dark:text-secondary-300" size={20} />,
                     featured: true,
                     cta: 'Popular Choice',
                     features: [
                            '50 summaries per month',
                            'Advanced AI models',
                            'All export formats',
                            'Priority support',
                            'Up to 3 users',
                     ]
              },
              {
                     name: 'Enterprise',
                     price: 'Custom',
                     period: 'tailored plan',
                     description: 'For organizations with heavy usage',
                     icon: <Crown className="text-primary dark:text-primary-400" size={20} />,
                     featured: false,
                     cta: 'Contact Sales',
                     features: [
                            'Unlimited summaries',
                            'Premium AI models',
                            'All export formats',
                            '24/7 dedicated support',
                            'Unlimited users',
                            'Advanced analytics',
                            'SSO & On-prem options'
                     ]
              }
       ]

       const faqs = [
              {
                     question: "Can I change plans later?",
                     answer: "Yes, you can upgrade or downgrade at any time."
              },
              {
                     question: "Do you offer discounts for students?",
                     answer: "We offer 50% off for verified students and educators."
              },
              {
                     question: "Is there a free trial?",
                     answer: "Yes, all paid plans come with a 14-day free trial."
              },
              {
                     question: "What payment methods do you accept?",
                     answer: "We accept all major credit cards, PayPal, and bank transfers."
              }
       ]

       return (
              <div className={`bg-gray-50 dark:bg-gray-900 transition-colors duration-300`}>
                     {/* Hero Section */}
                     <section className={`py-20 bg-gradient-to-br from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10`}>
                            <div className="container mx-auto px-6 text-center">
                                   <motion.div
                                          initial={{ opacity: 0, y: 20 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          transition={{ duration: 0.5 }}
                                   >
                                          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-300 mb-6">
                                                 <Sparkles size={16} />
                                                 <span className="font-medium">Simple Pricing</span>
                                          </span>
                                          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                                                 Choose Your Perfect Plan
                                          </h1>
                                          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                                                 Flexible options for every need. Start with a 14-day free trial - no credit card required.
                                          </p>
                                   </motion.div>
                            </div>
                     </section>

                     {/* Pricing Plans */}
                     <section className="py-16">
                            <div className="container mx-auto px-6">
                                   {/* Toggle for annual/monthly */}
                                   <motion.div
                                          className="flex justify-center mb-16"
                                          initial={{ opacity: 0 }}
                                          whileInView={{ opacity: 1 }}
                                          viewport={{ once: true }}
                                   >
                                          <div className="bg-white dark:bg-gray-800 p-1 rounded-lg shadow-sm dark:shadow-gray-700/50 inline-flex">
                                                 <button className="px-6 py-2 rounded-md font-medium bg-primary text-white">
                                                        Monthly
                                                 </button>
                                                 <button className="px-6 py-2 rounded-md font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                                                        Annual (Save 20%)
                                                 </button>
                                          </div>
                                   </motion.div>

                                   {/* Plans Grid */}
                                   <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                                          {plans.map((plan, index) => (
                                                 <motion.div
                                                        key={plan.name}
                                                        initial={{ opacity: 0, y: 30 }}
                                                        whileInView={{ opacity: 1, y: 0 }}
                                                        viewport={{ once: true }}
                                                        transition={{ delay: index * 0.1 }}
                                                        className={`relative rounded-xl overflow-hidden border-2 ${plan.featured
                                                                      ? 'border-primary dark:border-primary-400 shadow-lg dark:shadow-primary/20'
                                                                      : 'border-gray-200 dark:border-gray-700 shadow-md dark:shadow-gray-800/50'
                                                               }`}
                                                 >
                                                        {plan.featured && (
                                                               <div className="absolute top-0 right-0 bg-primary dark:bg-primary-500 text-white px-4 py-1 text-sm font-medium rounded-bl-lg">
                                                                      Most Popular
                                                               </div>
                                                        )}
                                                        <div className="bg-white dark:bg-gray-800 p-8 transition-colors duration-300">
                                                               <div className="flex items-center gap-3 mb-4">
                                                                      <div className="p-2 bg-primary/10 dark:bg-primary/20 rounded-lg">
                                                                             {plan.icon}
                                                                      </div>
                                                                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{plan.name}</h3>
                                                               </div>
                                                               <div className="mb-6">
                                                                      <span className="text-4xl font-bold text-gray-900 dark:text-white">{plan.price}</span>
                                                                      <span className="text-gray-600 dark:text-gray-300 ml-2">{plan.period}</span>
                                                               </div>
                                                               <p className="text-gray-600 dark:text-gray-300 mb-6">{plan.description}</p>
                                                               <motion.button
                                                                      className={`w-full py-3 rounded-lg font-medium mb-8 transition-colors ${plan.featured
                                                                                    ? 'bg-primary hover:bg-primary/90 dark:bg-primary-600 dark:hover:bg-primary-700 text-white'
                                                                                    : 'border-2 border-primary dark:border-primary-400 text-primary dark:text-primary-400 hover:bg-primary/10 dark:hover:bg-primary/20'
                                                                             }`}
                                                                      whileHover={{ scale: 1.02 }}
                                                                      whileTap={{ scale: 0.98 }}
                                                               >
                                                                      <Link href={"/auth"}>
                                                                      {plan.cta}
                                                                      </Link>
                                                               </motion.button>
                                                               <ul className="space-y-3">
                                                                      {plan.features.map((feature, i) => (
                                                                             <li key={i} className="flex items-start gap-3">
                                                                                    <Check className="text-primary dark:text-primary-400 mt-0.5 flex-shrink-0" size={18} />
                                                                                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                                                                             </li>
                                                                      ))}
                                                               </ul>
                                                        </div>
                                                 </motion.div>
                                          ))}
                                   </div>
                            </div>
                     </section>

                     {/* Comparison Table */}
                     <section className="py-16 bg-white dark:bg-gray-800 transition-colors duration-300">
                            <div className="container mx-auto px-6">
                                   <motion.div
                                          initial={{ opacity: 0 }}
                                          whileInView={{ opacity: 1 }}
                                          viewport={{ once: true }}
                                          className="text-center mb-16"
                                   >
                                          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                                                 Plan Comparison
                                          </h2>
                                          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                                                 See how our plans stack up against each other
                                          </p>
                                   </motion.div>

                                   <div className="overflow-x-auto">
                                          <table className="w-full">
                                                 <thead>
                                                        <tr className="border-b border-gray-200 dark:border-gray-700">
                                                               <th className="text-left pb-4 font-semibold text-gray-700 dark:text-gray-300">Features</th>
                                                               {plans.map((plan) => (
                                                                      <th key={plan.name} className="text-center pb-4 font-semibold text-gray-700 dark:text-gray-300">
                                                                             {plan.name}
                                                                      </th>
                                                               ))}
                                                        </tr>
                                                 </thead>
                                                 <tbody>
                                                        <tr className="border-b border-gray-200 dark:border-gray-700">
                                                               <td className="py-4 text-gray-700 dark:text-gray-300">Summaries per month</td>
                                                               {plans.map((plan) => (
                                                                      <td key={plan.name} className="text-center py-4 text-gray-700 dark:text-gray-300">
                                                                             {plan.features[0].replace(' summaries per month', '')}
                                                                      </td>
                                                               ))}
                                                        </tr>
                                                        <tr className="border-b border-gray-200 dark:border-gray-700">
                                                               <td className="py-4 text-gray-700 dark:text-gray-300">AI Models</td>
                                                               {plans.map((plan) => (
                                                                      <td key={plan.name} className="text-center py-4 text-gray-700 dark:text-gray-300">
                                                                             {plan.features[1].replace(' AI models', '')}
                                                                      </td>
                                                               ))}
                                                        </tr>
                                                        <tr className="border-b border-gray-200 dark:border-gray-700">
                                                               <td className="py-4 text-gray-700 dark:text-gray-300">User Accounts</td>
                                                               {plans.map((plan) => (
                                                                      <td key={plan.name} className="text-center py-4 text-gray-700 dark:text-gray-300">
                                                                             {plan.features[4]?.includes('Unlimited') ? 'Unlimited' : plan.features[4]?.replace(' users', '') || '1'}
                                                                      </td>
                                                               ))}
                                                        </tr>
                                                        <tr className="border-b border-gray-200 dark:border-gray-700">
                                                               <td className="py-4 text-gray-700 dark:text-gray-300">Support</td>
                                                               {plans.map((plan) => (
                                                                      <td key={plan.name} className="text-center py-4 text-gray-700 dark:text-gray-300">
                                                                             {plan.features[3]}
                                                                      </td>
                                                               ))}
                                                        </tr>
                                                 </tbody>
                                          </table>
                                   </div>
                            </div>
                     </section>

                     {/* FAQ Section */}
                     <section className="py-16 bg-gray-50 dark:bg-gray-800/50 transition-colors duration-300">
                            <div className="container mx-auto px-6">
                                   <motion.div
                                          initial={{ opacity: 0 }}
                                          whileInView={{ opacity: 1 }}
                                          viewport={{ once: true }}
                                          className="text-center mb-16"
                                   >
                                          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                                                 Frequently Asked Questions
                                          </h2>
                                          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                                                 Everything you need to know about our pricing
                                          </p>
                                   </motion.div>

                                   <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                                          {faqs.map((faq, index) => (
                                                 <motion.div
                                                        key={index}
                                                        initial={{ opacity: 0, y: 20 }}
                                                        whileInView={{ opacity: 1, y: 0 }}
                                                        viewport={{ once: true }}
                                                        transition={{ delay: index * 0.1 }}
                                                        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm dark:shadow-gray-700/50 transition-colors duration-300"
                                                 >
                                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{faq.question}</h3>
                                                        <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
                                                 </motion.div>
                                          ))}
                                   </div>
                            </div>
                     </section>

                     {/* CTA Section */}
                     <section className="py-20 bg-gradient-to-br from-primary to-secondary dark:from-primary-600 dark:to-secondary-600 text-white">
                            <div className="container mx-auto px-6 text-center">
                                   <motion.div
                                          initial={{ opacity: 0, scale: 0.9 }}
                                          whileInView={{ opacity: 1, scale: 1 }}
                                          viewport={{ once: true }}
                                   >
                                          <h2 className="text-3xl md:text-4xl font-bold mb-6">
                                                 Ready to transform your workflow?
                                          </h2>
                                          <p className="text-lg mb-8 max-w-2xl mx-auto">
                                                 Join thousands of professionals who save hours every week with our AI summarizer.
                                          </p>
                                          <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                                 <motion.button
                                                        className="px-8 py-3 bg-white text-gray-900 rounded-lg font-medium shadow-lg hover:bg-gray-100 transition-colors"
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                 >
                                                        Start 14-Day Free Trial
                                                 </motion.button>
                                                 <motion.button
                                                        className="px-8 py-3 border-2 border-white text-white rounded-lg font-medium hover:bg-white/10 transition-colors"
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                 >
                                                        Contact Sales
                                                 </motion.button>
                                          </div>
                                   </motion.div>
                            </div>
                     </section>
              </div>
       )
}