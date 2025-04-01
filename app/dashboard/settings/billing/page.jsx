'use client'

import { useState, useEffect } from 'react'
import { CreditCard, History, Receipt, BadgeCheck, Plus, Download, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { toast } from 'sonner'
import { useSession } from 'next-auth/react'

export default function BillingPage() {
       const { data: session } = useSession()
       const [isLoading, setIsLoading] = useState({
              planChange: false,
              paymentMethods: false,
              invoices: false
       })
       const [billingData, setBillingData] = useState(null)
       const [showAddCard, setShowAddCard] = useState(false)
       const [newCard, setNewCard] = useState({
              number: '',
              expiry: '',
              cvc: '',
              name: ''
       })

       // Fetch billing data
       useEffect(() => {
              const fetchBillingData = async () => {
                     try {
                            // Simulate API call
                            await new Promise(resolve => setTimeout(resolve, 800))

                            const mockData = {
                                   plan: 'pro',
                                   paymentMethod: 'card_visa',
                                   autoRenew: true,
                                   nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
                                   usage: {
                                          summariesUsed: Math.floor(Math.random() * 100),
                                          summariesLimit: 100,
                                          storageUsed: (Math.random() * 50).toFixed(1),
                                          storageLimit: '50 GB'
                                   },
                                   paymentMethods: [
                                          {
                                                 id: 'card_visa',
                                                 type: 'card',
                                                 brand: 'visa',
                                                 last4: '4242',
                                                 exp: '12/24',
                                                 primary: true
                                          },
                                          {
                                                 id: 'card_mastercard',
                                                 type: 'card',
                                                 brand: 'mastercard',
                                                 last4: '5555',
                                                 exp: '05/25',
                                                 primary: false
                                          }
                                   ],
                                   invoices: [
                                          {
                                                 id: `inv_${Math.floor(Math.random() * 10000)}`,
                                                 date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
                                                 amount: 9.00,
                                                 status: 'paid',
                                                 downloadUrl: '#'
                                          },
                                          {
                                                 id: `inv_${Math.floor(Math.random() * 10000)}`,
                                                 date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
                                                 amount: 9.00,
                                                 status: 'paid',
                                                 downloadUrl: '#'
                                          },
                                          {
                                                 id: `inv_${Math.floor(Math.random() * 10000)}`,
                                                 date: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
                                                 amount: 9.00,
                                                 status: 'paid',
                                                 downloadUrl: '#'
                                          }
                                   ]
                            }

                            setBillingData(mockData)
                     } catch (error) {
                            toast.error('Failed to load billing data')
                     }
              }

              fetchBillingData()
       }, [session])

       const plans = [
              {
                     id: 'free',
                     name: 'Free',
                     price: 0,
                     features: [
                            '10 summaries/month',
                            'Basic support',
                            'PDF exports'
                     ]
              },
              {
                     id: 'pro',
                     name: 'Pro',
                     price: 9,
                     features: [
                            '100 summaries/month',
                            'Priority support',
                            'Advanced analytics',
                            'PDF exports'
                     ]
              },
              {
                     id: 'enterprise',
                     name: 'Enterprise',
                     price: 29,
                     features: [
                            'Unlimited summaries',
                            '24/7 support',
                            'Team features',
                            'Advanced analytics',
                            'API access'
                     ]
              }
       ]

       const handlePlanChange = async (planId) => {
              setIsLoading(prev => ({ ...prev, planChange: true }))
              try {
                     // Simulate API call
                     await new Promise(resolve => setTimeout(resolve, 1500))

                     setBillingData(prev => ({
                            ...prev,
                            plan: planId,
                            usage: {
                                   ...prev.usage,
                                   summariesLimit: planId === 'free' ? 10 : planId === 'pro' ? 100 : Infinity
                            }
                     }))

                     toast.success(`Plan changed to ${planId === 'free' ? 'Free' : planId === 'pro' ? 'Pro' : 'Enterprise'}`)
              } catch (error) {
                     toast.error('Failed to change plan')
              } finally {
                     setIsLoading(prev => ({ ...prev, planChange: false }))
              }
       }

       const handleAutoRenewChange = async (checked) => {
              try {
                     // Simulate API call
                     await new Promise(resolve => setTimeout(resolve, 800))

                     setBillingData(prev => ({ ...prev, autoRenew: checked }))
                     toast.info(`Auto-renew ${checked ? 'enabled' : 'disabled'}`)
              } catch (error) {
                     toast.error('Failed to update auto-renew setting')
              }
       }

       const handleSetPrimary = async (methodId) => {
              setIsLoading(prev => ({ ...prev, paymentMethods: true }))
              try {
                     // Simulate API call
                     await new Promise(resolve => setTimeout(resolve, 800))

                     setBillingData(prev => ({
                            ...prev,
                            paymentMethods: prev.paymentMethods.map(method => ({
                                   ...method,
                                   primary: method.id === methodId
                            }))
                     }))

                     toast.success('Primary payment method updated')
              } catch (error) {
                     toast.error('Failed to update payment method')
              } finally {
                     setIsLoading(prev => ({ ...prev, paymentMethods: false }))
              }
       }

       const handleAddCard = async (e) => {
              e.preventDefault()
              setIsLoading(prev => ({ ...prev, paymentMethods: true }))

              try {
                     // Simulate API call
                     await new Promise(resolve => setTimeout(resolve, 1200))

                     const last4 = newCard.number.slice(-4)
                     const newMethod = {
                            id: `card_${Math.random().toString(36).substr(2, 8)}`,
                            type: 'card',
                            brand: newCard.number.startsWith('4') ? 'visa' : 'mastercard',
                            last4,
                            exp: newCard.expiry,
                            primary: false
                     }

                     setBillingData(prev => ({
                            ...prev,
                            paymentMethods: [...prev.paymentMethods, newMethod]
                     }))

                     setNewCard({ number: '', expiry: '', cvc: '', name: '' })
                     setShowAddCard(false)
                     toast.success('Payment method added successfully')
              } catch (error) {
                     toast.error('Failed to add payment method')
              } finally {
                     setIsLoading(prev => ({ ...prev, paymentMethods: false }))
              }
       }

       const handleDownloadInvoice = async (invoiceId) => {
              setIsLoading(prev => ({ ...prev, invoices: true }))
              try {
                     // Simulate API call
                     await new Promise(resolve => setTimeout(resolve, 1000))
                     toast.success(`Invoice ${invoiceId} downloaded`)
              } catch (error) {
                     toast.error('Failed to download invoice')
              } finally {
                     setIsLoading(prev => ({ ...prev, invoices: false }))
              }
       }

       if (!billingData) {
              return (
                     <div className="flex justify-center items-center h-64">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                     </div>
              )
       }

       return (
              <div className="space-y-6">
                     {/* Current Plan */}
                     <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
                                   <h2 className="text-xl font-semibold flex items-center">
                                          <CreditCard className="h-5 w-5 mr-2" />
                                          Your Plan
                                   </h2>
                                   <div className="flex items-center space-x-2">
                                          <span className="text-sm text-gray-500 dark:text-gray-400">
                                                 Auto-renew
                                          </span>
                                          <Switch
                                                 checked={billingData.autoRenew}
                                                 onCheckedChange={handleAutoRenewChange}
                                                 disabled={isLoading.planChange}
                                          />
                                   </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                   {plans.map((plan) => (
                                          <div
                                                 key={plan.id}
                                                 className={`p-4 border rounded-lg transition-all ${billingData.plan === plan.id
                                                               ? 'border-primary ring-2 ring-primary/50 bg-primary/5'
                                                               : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                                                        }`}
                                          >
                                                 <h3 className="font-medium text-gray-900 dark:text-white">{plan.name}</h3>
                                                 <p className="text-2xl font-bold mt-2">
                                                        ${plan.price}<span className="text-sm font-normal text-gray-500">/month</span>
                                                 </p>
                                                 <ul className="mt-3 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                                        {plan.features.map((feature, i) => (
                                                               <li key={i} className="flex items-center">
                                                                      <BadgeCheck className="h-4 w-4 text-green-500 mr-2" />
                                                                      {feature}
                                                               </li>
                                                        ))}
                                                 </ul>
                                                 <Button
                                                        variant={billingData.plan === plan.id ? 'outline' : 'default'}
                                                        className="w-full mt-4"
                                                        onClick={() => handlePlanChange(plan.id)}
                                                        disabled={billingData.plan === plan.id || isLoading.planChange}
                                                 >
                                                        {billingData.plan === plan.id ? (
                                                               'Current Plan'
                                                        ) : isLoading.planChange ? (
                                                               <Loader2 className="h-4 w-4 animate-spin" />
                                                        ) : plan.id === 'enterprise' ? (
                                                               'Upgrade'
                                                        ) : (
                                                               'Downgrade'
                                                        )}
                                                 </Button>
                                          </div>
                                   ))}
                            </div>

                            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                                   <p className="text-sm text-gray-500 dark:text-gray-400">
                                          Next billing date: {new Date(billingData.nextBillingDate).toLocaleDateString()}
                                   </p>
                            </div>
                     </div>

                     {/* Payment Methods */}
                     <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
                                   <h2 className="text-xl font-semibold flex items-center">
                                          <CreditCard className="h-5 w-5 mr-2" />
                                          Payment Methods
                                   </h2>
                                   <Button
                                          variant="outline"
                                          onClick={() => setShowAddCard(!showAddCard)}
                                          disabled={isLoading.paymentMethods}
                                   >
                                          <Plus className="h-4 w-4 mr-2" />
                                          {showAddCard ? 'Cancel' : 'Add Payment Method'}
                                   </Button>
                            </div>

                            {showAddCard && (
                                   <form onSubmit={handleAddCard} className="mb-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                                 <div>
                                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                               Card Number
                                                        </label>
                                                        <input
                                                               type="text"
                                                               placeholder="1234 5678 9012 3456"
                                                               value={newCard.number}
                                                               onChange={(e) => setNewCard({ ...newCard, number: e.target.value })}
                                                               className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent"
                                                               required
                                                        />
                                                 </div>
                                                 <div>
                                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                               Cardholder Name
                                                        </label>
                                                        <input
                                                               type="text"
                                                               placeholder="John Doe"
                                                               value={newCard.name}
                                                               onChange={(e) => setNewCard({ ...newCard, name: e.target.value })}
                                                               className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent"
                                                               required
                                                        />
                                                 </div>
                                                 <div>
                                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                               Expiry Date
                                                        </label>
                                                        <input
                                                               type="text"
                                                               placeholder="MM/YY"
                                                               value={newCard.expiry}
                                                               onChange={(e) => setNewCard({ ...newCard, expiry: e.target.value })}
                                                               className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent"
                                                               required
                                                        />
                                                 </div>
                                                 <div>
                                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                               CVC
                                                        </label>
                                                        <input
                                                               type="text"
                                                               placeholder="123"
                                                               value={newCard.cvc}
                                                               onChange={(e) => setNewCard({ ...newCard, cvc: e.target.value })}
                                                               className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent"
                                                               required
                                                        />
                                                 </div>
                                          </div>
                                          <div className="flex justify-end gap-3">
                                                 <Button
                                                        type="button"
                                                        variant="outline"
                                                        onClick={() => setShowAddCard(false)}
                                                 >
                                                        Cancel
                                                 </Button>
                                                 <Button type="submit" disabled={isLoading.paymentMethods}>
                                                        {isLoading.paymentMethods ? (
                                                               <Loader2 className="h-4 w-4 animate-spin" />
                                                        ) : (
                                                               'Add Card'
                                                        )}
                                                 </Button>
                                          </div>
                                   </form>
                            )}

                            <div className="space-y-4">
                                   {billingData.paymentMethods.map((method) => (
                                          <div
                                                 key={method.id}
                                                 className="flex flex-col md:flex-row md:items-center md:justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg gap-4"
                                          >
                                                 <div className="flex items-center space-x-4">
                                                        <div className={`p-2 rounded-md ${method.brand === 'visa'
                                                                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
                                                                      : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
                                                               }`}>
                                                               {method.brand === 'visa' ? 'VISA' : 'MC'}
                                                        </div>
                                                        <div>
                                                               <p className="font-medium">
                                                                      **** **** **** {method.last4}
                                                               </p>
                                                               <p className="text-sm text-gray-500 dark:text-gray-400">
                                                                      Expires {method.exp}
                                                               </p>
                                                        </div>
                                                 </div>
                                                 <div className="flex items-center space-x-3">
                                                        {method.primary ? (
                                                               <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded-full">
                                                                      Primary
                                                               </span>
                                                        ) : (
                                                               <Button
                                                                      variant="ghost"
                                                                      size="sm"
                                                                      onClick={() => handleSetPrimary(method.id)}
                                                                      disabled={isLoading.paymentMethods}
                                                               >
                                                                      {isLoading.paymentMethods ? (
                                                                             <Loader2 className="h-4 w-4 animate-spin" />
                                                                      ) : (
                                                                             'Make Primary'
                                                                      )}
                                                               </Button>
                                                        )}
                                                 </div>
                                          </div>
                                   ))}
                            </div>
                     </div>

                     {/* Usage Statistics */}
                     <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                            <h2 className="text-xl font-semibold flex items-center mb-6">
                                   <History className="h-5 w-5 mr-2" />
                                   Usage
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                   <div>
                                          <div className="flex justify-between items-center mb-2">
                                                 <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                        Summaries this month
                                                 </h3>
                                                 <span className="text-xs text-gray-500 dark:text-gray-400">
                                                        {billingData.usage.summariesUsed} / {billingData.usage.summariesLimit}
                                                 </span>
                                          </div>
                                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                                                 <div
                                                        className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                                                        style={{
                                                               width: `${Math.min(
                                                                      (billingData.usage.summariesUsed / billingData.usage.summariesLimit) * 100,
                                                                      100
                                                               )}%`
                                                        }}
                                                 ></div>
                                          </div>
                                          {billingData.usage.summariesUsed >= billingData.usage.summariesLimit && (
                                                 <p className="text-xs text-red-500 dark:text-red-400 mt-1">
                                                        You've reached your monthly limit
                                                 </p>
                                          )}
                                   </div>

                                   <div>
                                          <div className="flex justify-between items-center mb-2">
                                                 <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                        Storage used
                                                 </h3>
                                                 <span className="text-xs text-gray-500 dark:text-gray-400">
                                                        {billingData.usage.storageUsed} GB / {billingData.usage.storageLimit}
                                                 </span>
                                          </div>
                                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                                                 <div
                                                        className="bg-purple-600 h-2.5 rounded-full transition-all duration-500"
                                                        style={{
                                                               width: `${Math.min(
                                                                      (parseFloat(billingData.usage.storageUsed) /
                                                                             parseFloat(billingData.usage.storageLimit)) * 100,
                                                                      100
                                                               )}%`
                                                        }}
                                                 ></div>
                                          </div>
                                          {parseFloat(billingData.usage.storageUsed) >=
                                                 parseFloat(billingData.usage.storageLimit) && (
                                                        <p className="text-xs text-red-500 dark:text-red-400 mt-1">
                                                               You've reached your storage limit
                                                        </p>
                                                 )}
                                   </div>
                            </div>
                     </div>

                     {/* Billing History */}
                     <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                            <h2 className="text-xl font-semibold flex items-center mb-6">
                                   <Receipt className="h-5 w-5 mr-2" />
                                   Billing History
                            </h2>

                            <div className="overflow-x-auto">
                                   <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                          <thead className="bg-gray-50 dark:bg-gray-700">
                                                 <tr>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                               Invoice
                                                        </th>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                               Date
                                                        </th>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                               Amount
                                                        </th>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                               Status
                                                        </th>
                                                        <th scope="col" className="relative px-6 py-3">
                                                               <span className="sr-only">Download</span>
                                                        </th>
                                                 </tr>
                                          </thead>
                                          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                                 {billingData.invoices.map((invoice) => (
                                                        <tr key={invoice.id}>
                                                               <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                                                      {invoice.id}
                                                               </td>
                                                               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                                      {new Date(invoice.date).toLocaleDateString()}
                                                               </td>
                                                               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                                      ${invoice.amount.toFixed(2)}
                                                               </td>
                                                               <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                                      {invoice.status === 'paid' ? (
                                                                             <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-xs">
                                                                                    Paid
                                                                             </span>
                                                                      ) : (
                                                                             <span className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded-full text-xs">
                                                                                    Failed
                                                                             </span>
                                                                      )}
                                                               </td>
                                                               <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                                      <Button
                                                                             variant="link"
                                                                             size="sm"
                                                                             onClick={() => handleDownloadInvoice(invoice.id)}
                                                                             disabled={isLoading.invoices}
                                                                      >
                                                                             {isLoading.invoices ? (
                                                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                                             ) : (
                                                                                    <>
                                                                                           <Download className="h-4 w-4 mr-1" />
                                                                                           Download
                                                                                    </>
                                                                             )}
                                                                      </Button>
                                                               </td>
                                                        </tr>
                                                 ))}
                                          </tbody>
                                   </table>
                            </div>
                     </div>
              </div>
       )
}
