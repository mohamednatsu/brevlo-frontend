// app/pricing/page.js
export default function Pricing() {
       return (
              <div className="py-12">
                     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <h1 className="text-3xl font-bold text-center mb-8">Choose Your Plan</h1>

                            <div className="grid md:grid-cols-2 gap-8">
                                   {/* Free Plan */}
                                   <div className="border rounded-lg p-6">
                                          <h2 className="text-xl font-semibold">Free</h2>
                                          <p className="text-3xl font-bold mt-2">$0<span className="text-sm font-normal">/month</span></p>
                                          <ul className="mt-4 space-y-2">
                                                 <li>✓ 15 free requests per month</li>
                                                 <li>✓ Basic features</li>
                                                 <li>✗ No priority support</li>
                                          </ul>
                                   </div>

                                   {/* Pro Plan */}
                                   <div className="border-2 border-purple-500 rounded-lg p-6 bg-purple-50 dark:bg-purple-900/10">
                                          <div className="flex justify-between items-start">
                                                 <div>
                                                        <h2 className="text-xl font-semibold">Pro</h2>
                                                        <p className="text-3xl font-bold mt-2">$9<span className="text-sm font-normal">/month</span></p>
                                                 </div>
                                                 <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                                                        Popular
                                                 </span>
                                          </div>
                                          <ul className="mt-4 space-y-2">
                                                 <li>✓ Unlimited requests</li>
                                                 <li>✓ All premium features</li>
                                                 <li>✓ Priority support</li>
                                                 <li>✓ Advanced analytics</li>
                                          </ul>
                                          <button className="mt-6 w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors">
                                                 Upgrade Now
                                          </button>
                                   </div>
                            </div>
                     </div>
              </div>
       )
}