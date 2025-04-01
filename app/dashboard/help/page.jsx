'use client'

import { useState } from 'react'
import {
       MessageCircleQuestion, Mail, BookOpen, Mic, Video, Youtube, FileText,
       ChevronDown, ChevronUp, CheckCircle, Upload
} from 'lucide-react'

export default function HelpPage() {
       // Example use cases
       const [useCases] = useState([
              {
                     id: 1,
                     title: 'Summarize Lecture Recordings',
                     description: 'Upload your audio recordings of lectures and get concise summaries of key points.',
                     steps: [
                            'Click the Audio Lecture option',
                            'Drag & drop your recording file',
                            'Select summary language',
                            'Get your AI-generated summary'
                     ],
                     icon: Mic,
                     color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300'
              },
              {
                     id: 2,
                     title: 'Condense Video Lectures',
                     description: 'Process video lectures by uploading files or linking to online videos.',
                     steps: [
                            'Choose Video Lecture or YouTube option',
                            'Upload file or paste YouTube URL',
                            'Wait for processing to complete',
                            'Download summary in multiple formats'
                     ],
                     icon: Video,
                     color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300'
              },
              {
                     id: 3,
                     title: 'Summarize Text Notes',
                     description: 'Paste your lecture notes or textbook excerpts for quick summarization.',
                     steps: [
                            'Select Text Content option',
                            'Paste your text content',
                            'Choose summary length',
                            'Review and edit the generated summary'
                     ],
                     icon: FileText,
                     color: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-300'
              },
              {
                     id: 4,
                     title: 'YouTube Video Summaries',
                     description: 'Get summaries of educational YouTube videos without watching the full content.',
                     steps: [
                            'Click YouTube Video option',
                            'Paste the video URL',
                            'Select key topics to focus on',
                            'Receive timestamped summary'
                     ],
                     icon: Youtube,
                     color: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-300'
              }
       ])

       // FAQ items
       const [faqs, setFaqs] = useState([
              {
                     id: 1,
                     question: 'How accurate are the summaries?',
                     answer: 'Our AI produces highly accurate summaries focused on key concepts, but they should be reviewed as supplementary material. Accuracy is typically 85-95% for clear audio/video.',
                     expanded: false
              },
              {
                     id: 2,
                     question: 'What file formats are supported?',
                     answer: 'We support MP3, WAV, AAC for audio; MP4, MOV, AVI for video; and direct text input. YouTube links must be in standard format.',
                     expanded: false
              },
              {
                     id: 3,
                     question: 'Can I edit the generated summaries?',
                     answer: 'Yes! All summaries include an edit mode where you can refine the content, add notes, and highlight important sections.',
                     expanded: false
              },
              {
                     id: 4,
                     question: 'Is there a limit to file size or duration?',
                     answer: 'Current limits: 100MB for files, 2 hours for audio/video. For longer content, consider breaking it into sections.',
                     expanded: false
              }
       ])

       // Toggle FAQ expansion
       const toggleFaq = (id) => {
              setFaqs(faqs.map(faq =>
                     faq.id === id ? { ...faq, expanded: !faq.expanded } : { ...faq, expanded: false }
              ))
       }

       return (
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                     {/* Hero Section */}
                     <div className="text-center mb-12">
                            <div className="inline-flex items-center justify-center p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-4">
                                   <MessageCircleQuestion className="h-8 w-8 text-blue-600 dark:text-blue-300" />
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Get the Most from Lecture Summarizer</h1>
                            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                                   Practical examples to help you quickly master our summarization tools
                            </p>
                     </div>

                     {/* Use Cases Section */}
                     <div className="mb-12">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">How Students Use Our Tool</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                   {useCases.map((useCase) => (
                                          <div key={useCase.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
                                                 <div className="p-6">
                                                        <div className="flex items-start space-x-4">
                                                               <div className={`p-3 rounded-lg ${useCase.color}`}>
                                                                      <useCase.icon className="h-6 w-6" />
                                                               </div>
                                                               <div>
                                                                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{useCase.title}</h3>
                                                                      <p className="text-gray-600 dark:text-gray-300 mb-4">{useCase.description}</p>
                                                                      <div className="space-y-3">
                                                                             {useCase.steps.map((step, index) => (
                                                                                    <div key={index} className="flex items-start">
                                                                                           <div className="flex-shrink-0 mt-1">
                                                                                                  <div className="flex items-center justify-center h-5 w-5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-300">
                                                                                                         <CheckCircle className="h-3 w-3" />
                                                                                                  </div>
                                                                                           </div>
                                                                                           <p className="ml-3 text-sm text-gray-700 dark:text-gray-300">{step}</p>
                                                                                    </div>
                                                                             ))}
                                                                      </div>
                                                               </div>
                                                        </div>
                                                 </div>
                                          </div>
                                   ))}
                            </div>
                     </div>

                     {/* Quick Start Section */}
                     <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-12 border border-gray-200 dark:border-gray-700">
                            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                                   <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Quick Start Guide</h2>
                            </div>
                            <div className="p-6">
                                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                          {/* Step 1 */}
                                          <div className="flex flex-col items-center text-center p-4">
                                                 <div className="mb-4 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300">
                                                        <span className="text-lg font-bold">1</span>
                                                 </div>
                                                 <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Choose Input Method</h3>
                                                 <p className="text-gray-600 dark:text-gray-300">
                                                        Select from audio, video, text, or YouTube options based on your lecture format.
                                                 </p>
                                          </div>

                                          {/* Step 2 */}
                                          <div className="flex flex-col items-center text-center p-4">
                                                 <div className="mb-4 flex items-center justify-center h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300">
                                                        <span className="text-lg font-bold">2</span>
                                                 </div>
                                                 <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Upload Content</h3>
                                                 <p className="text-gray-600 dark:text-gray-300">
                                                        Drag & drop files, paste text, or enter YouTube URL. Our system will process your input.
                                                 </p>
                                          </div>

                                          {/* Step 3 */}
                                          <div className="flex flex-col items-center text-center p-4">
                                                 <div className="mb-4 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-300">
                                                        <span className="text-lg font-bold">3</span>
                                                 </div>
                                                 <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Receive Summary</h3>
                                                 <p className="text-gray-600 dark:text-gray-300">
                                                        Get your concise summary, edit if needed, and download in preferred format.
                                                 </p>
                                          </div>
                                   </div>
                                   <div className="mt-8 flex justify-center">
                                          <button className="flex items-center px-5 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                                                 <Upload className="h-5 w-5 mr-2" />
                                                 Try it now
                                          </button>
                                   </div>
                            </div>
                     </div>

                     {/* FAQ Section */}
                     <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-8 border border-gray-200 dark:border-gray-700">
                            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                                   <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Common Questions</h2>
                            </div>
                            <div className="divide-y divide-gray-200 dark:divide-gray-700">
                                   {faqs.map((faq) => (
                                          <div key={faq.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                                                 <button
                                                        onClick={() => toggleFaq(faq.id)}
                                                        className="flex justify-between items-center w-full text-left"
                                                 >
                                                        <h3 className="text-lg font-medium text-gray-900 dark:text-white pr-4">{faq.question}</h3>
                                                        {faq.expanded ? (
                                                               <ChevronUp className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                                                        ) : (
                                                               <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                                                        )}
                                                 </button>
                                                 {faq.expanded && (
                                                        <div className="mt-4 pl-2">
                                                               <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
                                                        </div>
                                                 )}
                                          </div>
                                   ))}
                            </div>
                     </div>

                     {/* Support Section */}
                     <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
                            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                                   <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Need More Help?</h2>
                            </div>
                            <div className="p-6">
                                   <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                                          <div className="flex items-start space-x-4">
                                                 <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-300">
                                                        <Mail className="h-6 w-6" />
                                                 </div>
                                                 <div>
                                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Email Support</h3>
                                                        <p className="text-gray-600 dark:text-gray-300 mb-2">
                                                               Get personalized help from our support team within 24 hours.
                                                        </p>
                                                        <a
                                                               href="mailto:support@lecturesummarizer.com"
                                                               className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
                                                        >
                                                               Contact us <ChevronUp className="ml-1 h-4 w-4 rotate-90" />
                                                        </a>
                                                 </div>
                                          </div>
                                          <div className="flex items-start space-x-4">
                                                 <div className="p-3 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300">
                                                        <BookOpen className="h-6 w-6" />
                                                 </div>
                                                 <div>
                                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Documentation</h3>
                                                        <p className="text-gray-600 dark:text-gray-300 mb-2">
                                                               Explore our detailed guides and video tutorials.
                                                        </p>
                                                        <button className="inline-flex items-center text-primary hover:text-primary/80 font-medium">
                                                               View docs <ChevronUp className="ml-1 h-4 w-4 rotate-90" />
                                                        </button>
                                                 </div>
                                          </div>
                                   </div>
                            </div>
                     </div>
              </div>
       )
}