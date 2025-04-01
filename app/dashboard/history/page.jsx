'use client'

import { useState, useEffect } from 'react'
import { Search, FileText, Download, Trash2, ChevronDown, ChevronUp, Clock, FileAudio, Youtube, FileVideo, FileInput } from 'lucide-react'
import EmptyState from '@/components/EmptyState'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

export default function HistoryPage() {
  const [history, setHistory] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [userId, setUserid] = useState('')

  useEffect(() => {
    const fetchHistory = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUserid(session.user.id)
      const { data, error } = await supabase
        .from('summaries')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false })

      if (!error) {
        setHistory(data.map(item => ({
          id: item.id,
          title: item.input_text,
          date: item.created_at,
          type: item.summary_type,
          summary: item.summary_text,
          expanded: false
        })))
      }
    }

    fetchHistory()
  }, [userId])

  const toggleExpand = (id) => {
    setHistory(history.map(item =>
      item.id === id ? { ...item, expanded: !item.expanded } : item
    ))
  }

  const deleteItem = async (id) => {
    const { error } = await supabase
      .from('summaries')
      .delete()
      .eq('id', id)

    if (!error) {
      setHistory(history.filter(item => item.id !== id))
    }
  }

  const filteredHistory = history.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.summary.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getTypeIcon = (type) => {
    switch (type) {
      case 'audio': return <FileAudio className="h-5 w-5" />;
      case 'video': return <FileVideo className="h-5 w-5" />;
      case 'youtube': return <Youtube className="h-5 w-5" />;
      case 'text': return <FileInput className="h-5 w-5" />;
      default: return <FileText className="h-5 w-5" />;
    }
  }

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Summary History</h1>
          <p className="text-gray-600 dark:text-gray-300">
            View and manage your previously generated summaries
          </p>
        </div>
        <div className="relative w-full md:w-80">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search history..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all duration-300">
        {filteredHistory.length === 0 ? (
          <EmptyState
            title={searchQuery ? "No results found" : "No history yet"}
            description={searchQuery ? "Try a different search term" : "Your summarized lectures will appear here"}
            icon={<FileText className="h-10 w-10 mx-auto text-gray-400" />}
          />
        ) : (
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredHistory.map((item) => (
              <li key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors duration-200">
                <div className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 min-w-0">
                      <div className={`p-3 rounded-lg flex-shrink-0 ${item.type === 'audio' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300' :
                          item.type === 'video' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300' :
                            item.type === 'youtube' ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-300' :
                              item.type === 'text' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-300' :
                                'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300' // Default for other types
                        }`}>
                        {getTypeIcon(item.type)}
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-medium text-gray-900 dark:text-white truncate">{item.title}</h3>
                        <div className="flex items-center space-x-3 mt-1">
                          <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {new Date(item.date).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button onClick={() => toggleExpand(item.id)} className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
                        {item.expanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                      </button>
                      <button onClick={() => deleteItem(item.id)} className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 dark:hover:text-red-400">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  {item.expanded && (
                    <div className="mt-4 pl-16 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                      <h4 className="font-medium mb-2">Summary:</h4>
                      <p className="whitespace-pre-line">{item.summary}</p>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}
