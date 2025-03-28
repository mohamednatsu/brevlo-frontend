import { Phone } from "lucide-react";
import { MapPin } from "lucide-react";
import { Mail } from "lucide-react";
import { Send } from "lucide-react";

export default function ContactSection() {
       return (
              <section className="py-20 bg-white dark:bg-gray-900 mx-auto transition-colors md:w-3/4 w-full duration-300" id="contact">
                     <div className="container mx-auto px-6">
                            <div className="text-center mb-16">
                                   <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                                          Get In Touch
                                   </h2>
                                   <p className="text-lg tex outline-nonet-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                                          Have questions or want to learn more? We'd love to hear from you.
                                   </p>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                   {/* Contact Form */}
                                   <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-lg">
                                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send us a message</h3>

                                          <form className="space-y-6">
                                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                        <div>
                                                               <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                                      Name
                                                               </label>
                                                               <input
                                                                      type="text"
                                                                      id="name"
                                                                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                                                                      placeholder="Your name"
                                                               />
                                                        </div>
                                                        <div>
                                                               <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                                      Email
                                                               </label>
                                                               <input
                                                                      type="email"
                                                                      id="email"
                                                                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                                                                      placeholder="your.email@example.com"
                                                               />
                                                        </div>
                                                 </div>

                                                 <div>
                                                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                               Subject
                                                        </label>
                                                        <input
                                                               type="text"
                                                               id="subject"
                                                               className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                                                               placeholder="What's this about?"
                                                        />
                                                 </div>

                                                 <div>
                                                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                               Message
                                                        </label>
                                                        <textarea
                                                               id="message"
                                                               rows={5}
                                                               className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                                                               placeholder="Your message here..."
                                                        ></textarea>
                                                 </div>

                                                 <button
                                                        type="submit"
                                                        className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2"
                                                 >
                                                        <Send size={18} />
                                                        Send Message
                                                 </button>
                                          </form>
                                   </div>

                                   {/* Contact Info */}
                                   <div className="space-y-8">
                                          <div>
                                                 <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Contact Information</h3>
                                                 <p className="text-gray-600 dark:text-gray-300 mb-8">
                                                        Feel free to reach out through any of these channels. Our team typically responds within 24 hours.
                                                 </p>
                                          </div>

                                          <div className="space-y-6">
                                                 <div className="flex items-start gap-4">
                                                        <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-full text-primary dark:text-primary-300">
                                                               <Mail size={20} />
                                                        </div>
                                                        <div>
                                                               <h4 className="font-medium text-gray-900 dark:text-white">Email</h4>
                                                               <p className="text-gray-600 dark:text-gray-400">contact@summarizeai.com</p>
                                                               <p className="text-gray-600 dark:text-gray-400">support@summarizeai.com</p>
                                                        </div>
                                                 </div>

                                                 <div className="flex items-start gap-4">
                                                        <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-full text-primary dark:text-primary-300">
                                                               <Phone size={20} />
                                                        </div>
                                                        <div>
                                                               <h4 className="font-medium text-gray-900 dark:text-white">Phone</h4>
                                                               <p className="text-gray-600 dark:text-gray-400">+1 (555) 123-4567</p>
                                                               <p className="text-gray-600 dark:text-gray-400">Mon-Fri, 9am-5pm EST</p>
                                                        </div>
                                                 </div>

                                                 <div className="flex items-start gap-4">
                                                        <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-full text-primary dark:text-primary-300">
                                                               <MapPin size={20} />
                                                        </div>
                                                        <div>
                                                               <h4 className="font-medium text-gray-900 dark:text-white">Office</h4>
                                                               <p className="text-gray-600 dark:text-gray-400">123 Tech Street</p>
                                                               <p className="text-gray-600 dark:text-gray-400">San Francisco, CA 94107</p>
                                                        </div>
                                                 </div>
                                          </div>

                                          
                                   </div>
                            </div>
                     </div>
              </section>
       )
}