'use client'

import { useState, useRef, useEffect } from 'react'
import {
  Upload, Youtube, Mic, FileText, Download, Volume2, Edit, Check, X,
  ChevronUp, ChevronDown, Copy, Loader2, AlertCircle, CheckCircle,
  Video, Text, User, LogOut, Plus, Trash2, Bold, Italic, List, ListOrdered,
  Link as LinkIcon, Code, Quote, Underline, Strikethrough
} from 'lucide-react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import ThemeToggle from '@/components/ui/ThemeToggle'
import { Sidebar, MobileSidebar } from '@/components/Sidebar'
import { motion } from 'framer-motion'
import logo from "@/assets/logo.png"
import Image from 'next/image'
import { supabase } from '@/lib/supabaseClient'
import { useAuth } from '@/context/AuthContext'
import { toast } from 'sonner'
import Link from 'next/link'

export default function LectureSummarizer() {
  const BASE_URL_API = "http://localhost:3000/api"
  const router = useRouter()
  const { updateRemainingRequests } = useAuth();
  // User state
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        setUser({
          id: session.user.id,
          email: session.user.email,
          name: profile.full_name || session.user.email.split('@')[0],
          remainingRequests: profile.remaining_requests,
          isPro: profile.is_pro,
          avatar: profile.avatar_url || '/default-avatar.jpg'
        });
      }
    };
    loadUser();
  }, []);

  // Dashboard states
  const [activeMethod, setActiveMethod] = useState('audio')
  const [isDragging, setIsDragging] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [textContent, setTextContent] = useState('')
  const [language, setLanguage] = useState('english')

  // Add to your existing state
  const [speechProgress, setSpeechProgress] = useState(0);

  // Initialize speech synthesis
  useEffect(() => {
    speechSynth.current = window.speechSynthesis;

    // Cleanup on unmount
    return () => {
      if (speechSynth.current?.speaking) {
        speechSynth.current.cancel();
      }
    };
  }, []);


  // Processing states
  const [processingState, setProcessingState] = useState({
    isDownloading: false,
    isConverting: false,
    isTranscribing: false,
    isSummarizing: false,
    isGeneratingPDF: false
  })

  // Result states
  const [result, setResult] = useState({
    transcription: '',
    summary: {
      success: false,
      language: 'en',
      summary: '', // This is where the actual content will be
      pdfBuffer: null
    },
    audioFile: null,
    notes: []
  });

  // UI states
  const [isEditing, setIsEditing] = useState(false)
  const [editedSummary, setEditedSummary] = useState('')
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [showFullSummary, setShowFullSummary] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [newNote, setNewNote] = useState('')
  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
    underline: false,
    strikethrough: false,
    list: false,
    orderedList: false
  })

  const fileInputRef = useRef(null)
  const summaryTextareaRef = useRef(null)
  const speechSynth = useRef(null)
  const speechUtterance = useRef(null)

  // Initialize speech synthesis
  useEffect(() => {
    speechSynth.current = window.speechSynthesis
    return () => {
      if (speechSynth.current?.speaking) {
        speechSynth.current.cancel()
      }
    }
  }, [])

  // Reset messages after timeout
  useEffect(() => {
    const timers = []
    if (successMessage) {
      timers.push(setTimeout(() => setSuccessMessage(''), 5000))
    }
    if (copied) {
      timers.push(setTimeout(() => setCopied(false), 2000))
    }
    return () => timers.forEach(timer => clearTimeout(timer))
  }, [successMessage, copied])

  // Handle sign out
  const handleSignOut = () => {
    router.push('/login')
  }

  // File handling functions
  const handleDragEnter = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  // Validation functions
  const validateYoutubeUrl = (url) => {
    const pattern = /^(https?:\/\/)?(www\.|m\.)?(youtube\.com|youtu\.?be)\/(watch\?v=|embed\/|v\/|shorts\/)?([a-zA-Z0-9_-]{11})(\&\S*)?$/
    return pattern.test(url.trim())
  }

  const validateFileType = (file, allowedTypes) => {
    const fileType = file.type.split('/')[0]
    return allowedTypes.includes(fileType)
  }

  // Formatting functions
  const toggleFormat = (format) => {
    setActiveFormats(prev => ({
      ...prev,
      [format]: !prev[format]
    }))

    if (summaryTextareaRef.current) {
      const textarea = summaryTextareaRef.current
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const selectedText = editedSummary.substring(start, end)

      let newText = editedSummary
      let newCursorPos = end

      switch (format) {
        case 'bold':
          newText = newText.substring(0, start) + `**${selectedText}**` + newText.substring(end)
          newCursorPos = start + (selectedText ? 2 : 0)
          break
        case 'italic':
          newText = newText.substring(0, start) + `_${selectedText}_` + newText.substring(end)
          newCursorPos = start + (selectedText ? 1 : 0)
          break
        case 'underline':
          newText = newText.substring(0, start) + `<u>${selectedText}</u>` + newText.substring(end)
          newCursorPos = start + (selectedText ? 3 : 0)
          break
        case 'strikethrough':
          newText = newText.substring(0, start) + `~~${selectedText}~~` + newText.substring(end)
          newCursorPos = start + (selectedText ? 2 : 0)
          break
        case 'list':
          newText = newText.substring(0, start) + `\n- ${selectedText || 'List item'}\n` + newText.substring(end)
          newCursorPos = start + (selectedText ? 4 : 6)
          break
        case 'orderedList':
          newText = newText.substring(0, start) + `\n1. ${selectedText || 'List item'}\n` + newText.substring(end)
          newCursorPos = start + (selectedText ? 5 : 7)
          break
        default:
          break
      }

      setEditedSummary(newText)

      // Set cursor position after state update
      setTimeout(() => {
        textarea.selectionStart = newCursorPos
        textarea.selectionEnd = newCursorPos
        textarea.focus()
      }, 0)
    }
  }

  // Main processing function
  const handleSubmit = async () => {
    setError('');
    setSuccessMessage('');

    try {
      // Check if user has requests left (for free users)
      if (!user?.isPro && user?.remainingRequests <= 0) {
        throw new Error('You have no remaining requests left');
      }

      let result;

      switch (activeMethod) {
        case 'audio':
          if (!selectedFile) throw new Error('Please select an audio file');
          if (!validateFileType(selectedFile, ['audio'])) {
            throw new Error('Please upload a valid audio file (MP3, WAV, etc.)');
          }
          result = await handleTranscribe(selectedFile);
          break;

        case 'video':
          if (!selectedFile) throw new Error('Please select a video file');
          if (!validateFileType(selectedFile, ['video'])) {
            throw new Error('Please upload a valid video file (MP4, MOV, etc.)');
          }
          result = await handleVideoProcessing(selectedFile);
          break;

        case 'text':
          if (!textContent.trim()) throw new Error('Please enter text to summarize');
          result = await handleSummarize(textContent);
          break;

        case 'youtube':
          if (!youtubeUrl.trim()) throw new Error('Please enter a YouTube URL');
          if (!validateYoutubeUrl(youtubeUrl)) {
            throw new Error('Please enter a valid YouTube URL');
          }
          result = await handleYoutubeProcessing(youtubeUrl);
          break;

        default:
          throw new Error('Invalid processing method');
      }

      return result;
    } catch (err) {
      setError(err.message || 'An error occurred during processing');
      console.error('Processing error:', err);
      throw err;
    }
  };

  // Processing handlers
  const handleYoutubeProcessing = async (url) => {
    setProcessingState(prev => ({ ...prev, isDownloading: true }))
    setSuccessMessage('Downloading YouTube audio...')

    try {
      const response = await axios.post(`${BASE_URL_API}/youtube/download`, {
        videoUrl: url
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.data || !response.data.file) {
        throw new Error('Invalid response from YouTube download endpoint')
      }

      setResult(prev => ({ ...prev, audioFile: response.data.file }))
      setSuccessMessage('Audio downloaded successfully!')

      await handleTranscribe(response.data.file.filename)
      return { success: true }
    } catch (err) {
      throw new Error(`YouTube processing failed: ${err.response?.data?.message || err.message}`)
      return { success: false }
    } finally {
      setProcessingState(prev => ({ ...prev, isDownloading: false }))
    }
  }

  const handleVideoProcessing = async (videoFile) => {
    setProcessingState(prev => ({ ...prev, isConverting: true }));
    setSuccessMessage('Converting video to audio...');

    try {
      const formData = new FormData();
      formData.append('video', videoFile);

      const { data: { session }, error } = await supabase.auth.getSession();
      if (error || !session) {
        throw new Error('Session expired. Please log in again.');
      }

      // 1. First convert the video to audio
      const convertResponse = await axios.post(
        `${BASE_URL_API}/convert`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${session.access_token}`
          },
          responseType: 'blob' // Important for receiving binary data
        }
      );

      // 2. Create a File object from the response
      const audioBlob = new Blob([convertResponse.data], { type: 'audio/mpeg' });
      const audioFile = new File([audioBlob], 'converted-audio.mp3', {
        type: 'audio/mpeg'
      });

      setSuccessMessage('Video converted to audio successfully!');

      // 3. Pass the audio file to your transcription function
      await handleTranscribe(audioFile);

    } catch (err) {
      console.error('Video processing error:', err);
      throw err;
    } finally {
      setProcessingState(prev => ({ ...prev, isConverting: false }));
    }
  };

  const handleTranscribe = async (fileOrFilename) => {
    setProcessingState(prev => ({ ...prev, isTranscribing: true }));
    setSuccessMessage('Transcribing audio...');
    setError('');

    try {
      // 🔥 Retrieve the latest user session
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error || !session) {
        throw new Error('Session expired. Please log in again.');
      }

      let audioFile;
      if (typeof fileOrFilename === 'string') {
        const response = await axios.get(
          `${BASE_URL_API}/downloads/${fileOrFilename}`,
          {
            responseType: 'blob',
            headers: {
              'Authorization': `Bearer ${session.access_token}`
            }
          }
        );
        audioFile = new File([response.data], fileOrFilename);
      } else {
        audioFile = fileOrFilename;
      }

      const formData = new FormData();
      formData.append('audio', audioFile);

      // 🔥 Pass Supabase Access Token for authentication
      const response = await axios.post(
        `${BASE_URL_API}/transcribe`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${session.access_token}`
          }
        }
      );

      setResult(prev => ({ ...prev, transcription: response.data.transcription }));
      setSuccessMessage('Transcription completed successfully!');

      // Call summarization function
      await handleSummarize(response.data.transcription);

    } catch (err) {
      console.error('Transcription error:', err);

      if (err.message.includes('Session expired')) {
        setError(err.message);
        await supabase.auth.signOut();
        router.push('/auth'); // Redirect to login page
        return;
      }

      setError(err.response?.data?.error || 'Failed to transcribe audio');
    } finally {
      setProcessingState(prev => ({ ...prev, isTranscribing: false }));
    }
  };

  const handleSummarize = async (text) => {
    setProcessingState(prev => ({ ...prev, isSummarizing: true }));
    setSuccessMessage('Generating summary...');
    setError('');

    try {
      // Get current session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !session) throw new Error('Session expired. Please login again.');

      // Check remaining requests for free users
      if (!user?.isPro && user?.remainingRequests <= 0) {
        throw new Error('You have exhausted your free requests');
      }

      // Call summarize API
      const response = await axios.post(
        `${BASE_URL_API}/summarize`,
        {
          text,
          language: language === 'arabic' ? 'ar' : 'en',
          user_id: session.user.id
        },
        {
          headers: {
            'Authorization': `Bearer ${session.access_token}`
          }
        }
      );

      // Only decrement if the operation was successful
      if (response.data?.success) {
        // Decrement remaining requests for free users
        if (!user?.isPro) {
          const newCount = await updateRemainingRequests(1);

          // Show upgrade prompt when requests are low
          if (newCount <= 3) {
            toast.warning(
              <div>
                You have only {newCount} free {newCount === 1 ? 'request' : 'requests'} left.
                <Link href="/pricing" className="ml-2 text-primary hover:underline">
                  Upgrade to Pro
                </Link>
              </div>,
              { duration: 10000 }
            );
          }
        }
      }

      // Update UI with results
      setResult(prev => ({
        ...prev,
        summary: response.data.summary || {
          success: true,
          summary: 'No summary content returned'
        }
      }));

      setEditedSummary(response.data.summary?.summary || '');
      setSuccessMessage('Summary generated successfully!');

      // Save summary to database
      await saveSummaryToDatabase(
        text,
        response.data.summary?.summary || '',
        activeMethod
      );

      return { success: true, data: response.data.summary?.summary };
    } catch (err) {
      console.error('Summarization error:', err);

      if (err.message.includes('exhausted')) {
        toast.error(
          <div>
            <p>You've used all your free requests!</p>
            <Link href="/pricing" className="text-primary hover:underline">
              Upgrade to Pro for unlimited access
            </Link>
          </div>,
          { duration: 10000 }
        );
      } else if (err.response?.status === 401) {
        setError('Session expired. Please login again.');
        router.push('/auth');
      } else {
        setError(err.response?.data?.error || 'Failed to generate summary');
      }

      setResult(prev => ({
        ...prev,
        summary: {
          ...prev.summary,
          success: false,
          summary: 'Summary generation failed'
        }
      }));

      return { success: false }
    } finally {
      setProcessingState(prev => ({ ...prev, isSummarizing: false }));
    }
  };

  // Helper function to save summary to database
  const saveSummaryToDatabase = async (inputText, summaryText, summaryType) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        console.warn("No active session - cannot save summary");
        return;
      }

      const { error } = await supabase.from('summaries').insert([{
        user_id: session.user.id,
        input_text: inputText,
        summary_text: summaryText,
        summary_type: summaryType,
        created_at: new Date().toISOString()
      }]);

      if (error) throw error;

      console.log("Summary saved successfully");
    } catch (error) {
      console.error("Failed to save summary:", error);
    }
  };


  const decreaseRemainingRequests = async () => {
    try {
      const { data: authData, error: authError } = await supabase.auth.getUser();

      if (authError) {
        console.error("Authentication error:", authError.message);
        return;
      }

      const user = authData?.user;
      if (!user) {
        console.warn("User not logged in. Cannot decrease requests.");
        return;
      }

      // Fetch current remaining requests from profiles table
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('remaining_requests')
        .eq('id', user.id)
        .single();

      if (profileError) {
        console.error("Error fetching user profile:", profileError.message);
        return;
      }

      let remainingRequests = profileData?.remaining_requests ?? 0;

      if (remainingRequests > 0) {
        // Update remaining requests (decrease by 1)
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ remaining_requests: remainingRequests - 1 })
          .eq('id', user.id);

        if (updateError) {
          console.error("Error updating remaining requests:", updateError.message);
        } else {
          console.log(`Remaining requests decreased by 1. New count: ${remainingRequests - 1}`);
        }
      } else {
        console.warn("User has no remaining requests left.");
      }
    } catch (err) {
      console.error("Unexpected error in decreaseRemainingRequests:", err);
    }
  };

  // Note handling functions
  const addNote = () => {
    if (newNote.trim()) {
      setResult(prev => ({
        ...prev,
        notes: [...prev.notes, {
          id: Date.now(),
          content: newNote,
          createdAt: new Date().toISOString()
        }]
      }))
      setNewNote('')
    }
  }

  const deleteNote = (id) => {
    setResult(prev => ({
      ...prev,
      notes: prev.notes.filter(note => note.id !== id)
    }))
  }

  // UI interaction functions
  const toggleEdit = () => {
    if (isEditing) {
      // When saving edits
      setResult(prev => ({
        ...prev,
        summary: {
          ...prev.summary,
          summary: editedSummary,
          // Preserve existing properties or set defaults
          success: true,
          language: language === 'arabic' ? 'ar' : 'en',
          pdfBuffer: prev.summary?.pdfBuffer || null
        }
      }));
      setSuccessMessage('Summary updated successfully!');
    } else {
      // When entering edit mode
      setEditedSummary(result.summary?.summary || '');
    }
    setIsEditing(!isEditing);
  };

  const downloadPDF = async () => {
    try {
      setProcessingState(prev => ({ ...prev, isGeneratingPDF: true }));
      setSuccessMessage('Generating PDF...');

      const response = await axios.post(`${BASE_URL_API}/pdf/generate`, {
        summary: result.summary?.summary || '',
        language: result.summary?.language || 'en',
        notes: result.notes
      }, {
        responseType: 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `lecture-summary-${new Date().getTime()}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);

      setSuccessMessage('PDF downloaded successfully!');
    } catch (err) {
      setError(err.message || 'Failed to generate PDF');
    } finally {
      setProcessingState(prev => ({ ...prev, isGeneratingPDF: false }));
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result.summary?.summary || '');
    setCopied(true);
    setSuccessMessage('Summary copied to clipboard!');
  };

  const handleTextToSpeech = () => {
    if (!speechSynth.current) return;

    if (isSpeaking) {
      speechSynth.current.cancel();
      setIsSpeaking(false);
      return;
    }

    const text = result.summary?.summary || '';
    const language = result.summary?.language === 'ar' ? 'ar-SA' : 'en-US';

    // Get available voices and select the best one
    const voices = speechSynthesis.getVoices();
    let selectedVoice = voices.find(voice =>
      voice.lang.startsWith(language) && voice.name.toLowerCase().includes("female")
    );

    // Fallback in case no specific female voice is found
    if (!selectedVoice) {
      selectedVoice = voices.find(voice => voice.lang.startsWith(language));
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    utterance.rate = 0.9; // Slightly slower for better comprehension
    utterance.pitch = 1;
    utterance.volume = 1;
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = (event) => {
      console.error("Speech synthesis error:", event);
      setIsSpeaking(false);
    };

    speechUtterance.current = utterance;
    speechSynth.current.speak(utterance);
    setIsSpeaking(true);
    setSuccessMessage('Text-to-speech started');
  };


  const isSubmitDisabled = () => {
    if (isProcessing) return true;

    switch (activeMethod) {
      case 'audio':
      case 'video':
        return !selectedFile;
      case 'text':
        return !textContent.trim();
      case 'youtube':
        return !youtubeUrl.trim() || !validateYoutubeUrl(youtubeUrl);
      default:
        return true;
    }
  }

  const toggleSummaryView = () => {
    setShowFullSummary(!showFullSummary)
  }

  const isProcessing = Object.values(processingState).some(state => state)

  // Method configuration
  const methods = [
    { id: 'audio', icon: Mic, label: 'Audio Lecture', color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300' },
    { id: 'video', icon: Video, label: 'Video Lecture', color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300' },
    { id: 'text', icon: Text, label: 'Text Content', color: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-300' },
    { id: 'youtube', icon: Youtube, label: 'YouTube Video', color: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-300' }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">

      {/* Main content area */}
      <div className="flex flex-col mx-auto">
        {/* User Profile Bar */}

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 pb-20 md:pb-8">
          {/* Header */}
          <div className="text-center mb-10">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className='cursor-pointe md:hidden flex justify-center items-center mt-3 mb-7 bg-white rounded-lg w-3/4 mx-auto'
            >
              <Image
                alt='logo'
                quality={100}
                src={logo}
                className='w-[70px] h-[70px] hover:translate-y-[-2]  transition-all duration-300 rounded-lg'
              />
            </motion.div>
            <h1 className="hidden md:block text-3xl font-bold text-gray-900 dark:text-white mb-2">Lecture Summarizer</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Transform your lectures into concise summaries using AI
            </p>
          </div>

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            {methods.map((method) => (
              <button
                key={method.id}
                onClick={() => setActiveMethod(method.id)}
                disabled={isProcessing}
                className={`p-6 rounded-xl shadow-sm transition-all flex flex-col items-center gap-3 ${activeMethod === method.id
                  ? `${method.color} ring-2 ring-current`
                  : 'bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
              >
                <method.icon className="h-8 w-8" />
                <span className="font-medium">{method.label}</span>
              </button>
            ))}
          </div>

          {/* Main Content Area */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-8 transition-colors duration-300">
            {/* Input Section */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                {activeMethod === 'audio' && 'Upload Audio Lecture'}
                {activeMethod === 'video' && 'Upload Video Lecture'}
                {activeMethod === 'text' && 'Enter Lecture Text'}
                {activeMethod === 'youtube' && 'Enter YouTube URL'}
              </h2>

              {activeMethod === 'text' ? (
                <div className="space-y-4">
                  <textarea
                    value={textContent}
                    onChange={(e) => setTextContent(e.target.value)}
                    placeholder="Paste your lecture text here..."
                    className="w-full h-64 p-4 border outline-none border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    disabled={isProcessing}
                  />
                </div>
              ) : activeMethod === 'youtube' ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="w-full px-4 py-3 rounded-lg border outline-none border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    disabled={isProcessing}
                  />
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    We'll extract the audio and summarize the content
                  </p>
                </div>
              ) : (
                <div
                  className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-all ${isDragging
                    ? 'border-primary bg-primary/10'
                    : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                    }`}
                  onDragEnter={handleDragEnter}
                  onDragOver={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={triggerFileInput}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept={activeMethod === 'audio' ? 'audio/*' : 'video/*'}
                    className="hidden"
                    disabled={isProcessing}
                  />
                  <Upload className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500 mb-4" />
                  <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {selectedFile
                      ? selectedFile.name
                      : `Drag and drop your ${activeMethod === 'audio' ? 'audio' : 'video'} file here, or click to browse`}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {activeMethod === 'audio'
                      ? 'MP3, WAV, AAC up to 50MB'
                      : 'MP4, MOV, AVI up to 100MB'}
                  </p>
                </div>
              )}

              {/* Language Selection */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Summary Language
                </label>
                <div className="flex gap-4">
                  {['english', 'arabic'].map((lang) => (
                    <button
                      key={lang}
                      type="button"
                      className={`flex-1 py-2 px-4 rounded-lg border ${language === lang
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}
                      onClick={() => setLanguage(lang)}
                      disabled={isProcessing}
                    >
                      {lang.charAt(0).toUpperCase() + lang.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-8">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitDisabled()}
                  className={`w-full py-3 px-4 rounded-lg shadow-sm text-white font-medium flex items-center justify-center ${isProcessing ||
                    ((activeMethod === 'audio' || activeMethod === 'video') && !selectedFile) ||
                    (activeMethod === 'youtube' && !validateYoutubeUrl(youtubeUrl)) ||
                    (activeMethod === 'text' && !textContent.trim())
                    ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                    : 'bg-primary hover:bg-primary/90'
                    }`}
                >
                  {processingState.isDownloading ? (
                    <>
                      <Loader2 className="animate-spin mr-2" size={18} />
                      Downloading audio...
                    </>
                  ) : processingState.isConverting ? (
                    <>
                      <Loader2 className="animate-spin mr-2" size={18} />
                      Converting video...
                    </>
                  ) : processingState.isTranscribing ? (
                    <>
                      <Loader2 className="animate-spin mr-2" size={18} />
                      Transcribing...
                    </>
                  ) : processingState.isSummarizing ? (
                    <>
                      <Loader2 className="animate-spin mr-2" size={18} />
                      Summarizing...
                    </>
                  ) : (
                    'Generate Summary'
                  )}
                </button>

                {/* Status messages */}
                {error && (
                  <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg flex items-start text-red-700 dark:text-red-300">
                    <AlertCircle className="flex-shrink-0 mr-2 mt-0.5" size={18} />
                    <span>{error}</span>
                  </div>
                )}

                {successMessage && (
                  <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg flex items-start text-green-700 dark:text-green-300">
                    <CheckCircle className="flex-shrink-0 mr-2 mt-0.5" size={18} />
                    <span>{successMessage}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Results Section */}
            {result.transcription && !result.summary?.summary && (
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-between">
                  <span>Transcription Result</span>
                  <button
                    onClick={() => navigator.clipboard.writeText(result.transcription)}
                    className="text-sm text-primary flex items-center gap-1"
                  >
                    <Copy size={16} />
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </h2>
                <div className="prose dark:prose-invert max-w-none p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg whitespace-pre-wrap">
                  {result.transcription}
                </div>
              </div>
            )}

            {result.summary?.summary && (
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Lecture Summary</h2>
                  <div className="flex gap-2">
                    <button
                      onClick={copyToClipboard}
                      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                      title="Copy to clipboard"
                    >
                      <Copy size={18} />
                    </button>
                    <button
                      onClick={toggleEdit}
                      className={`p-2 rounded-lg ${isEditing
                        ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      title={isEditing ? 'Save Changes' : 'Edit Summary'}
                    >
                      {isEditing ? <Check size={18} /> : <Edit size={18} />}
                    </button>
                    <button
                      onClick={handleTextToSpeech}
                      className={`p-2 rounded-lg ${isSpeaking
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      title="Text to Speech"
                    >
                      <Volume2 size={18} />
                    </button>
                    <button
                      onClick={downloadPDF}
                      disabled={processingState.isGeneratingPDF}
                      className={`p-2 rounded-lg ${processingState.isGeneratingPDF
                        ? 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed'
                        : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                        } text-gray-700 dark:text-gray-300`}
                      title="Download PDF"
                    >
                      {processingState.isGeneratingPDF ? (
                        <Loader2 className="animate-spin" size={18} />
                      ) : (
                        <Download size={18} />
                      )}
                    </button>
                  </div>
                </div>

                {isEditing ? (
                  <div className="space-y-6">
                    {/* Notion-like Editor */}
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                      {/* Editor Toolbar */}
                      <div className="flex items-center space-x-1 p-2 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-700">
                        <button
                          onClick={() => toggleFormat('bold')}
                          className={`p-2 rounded ${activeFormats.bold ? 'bg-gray-200 dark:bg-gray-600' : 'hover:bg-gray-200 dark:hover:bg-gray-600'}`}
                          title="Bold"
                        >
                          <Bold className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => toggleFormat('italic')}
                          className={`p-2 rounded ${activeFormats.italic ? 'bg-gray-200 dark:bg-gray-600' : 'hover:bg-gray-200 dark:hover:bg-gray-600'}`}
                          title="Italic"
                        >
                          <Italic className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => toggleFormat('underline')}
                          className={`p-2 rounded ${activeFormats.underline ? 'bg-gray-200 dark:bg-gray-600' : 'hover:bg-gray-200 dark:hover:bg-gray-600'}`}
                          title="Underline"
                        >
                          <Underline className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => toggleFormat('strikethrough')}
                          className={`p-2 rounded ${activeFormats.strikethrough ? 'bg-gray-200 dark:bg-gray-600' : 'hover:bg-gray-200 dark:hover:bg-gray-600'}`}
                          title="Strikethrough"
                        >
                          <Strikethrough className="h-4 w-4" />
                        </button>
                        <div className="h-6 border-l border-gray-300 dark:border-gray-600 mx-1"></div>
                        <button
                          onClick={() => toggleFormat('list')}
                          className={`p-2 rounded ${activeFormats.list ? 'bg-gray-200 dark:bg-gray-600' : 'hover:bg-gray-200 dark:hover:bg-gray-600'}`}
                          title="Bullet List"
                        >
                          <List className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => toggleFormat('orderedList')}
                          className={`p-2 rounded ${activeFormats.orderedList ? 'bg-gray-200 dark:bg-gray-600' : 'hover:bg-gray-200 dark:hover:bg-gray-600'}`}
                          title="Numbered List"
                        >
                          <ListOrdered className="h-4 w-4" />
                        </button>
                        <div className="h-6 border-l border-gray-300 dark:border-gray-600 mx-1"></div>
                        <button className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600" title="Link">
                          <LinkIcon className="h-4 w-4" />
                        </button>
                        {/* <button className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600" title="Image">
                          <Image className="h-4 w-4" />
                        </button> */}
                        <button className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600" title="Code">
                          <Code className="h-4 w-4" />
                        </button>
                        <button className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600" title="Quote">
                          <Quote className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Editable Summary */}
                      {isEditing ? (
                        <textarea
                          ref={summaryTextareaRef}
                          value={editedSummary}
                          onChange={(e) => setEditedSummary(e.target.value)}
                          className="w-full h-64 p-4 outline-none bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none resize-none"
                        />
                      ) : (
                        <div className="prose dark:prose-invert">
                          {result.summary?.summary || 'No summary available'}
                        </div>
                      )}
                    </div>

                    {/* Notes Section */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Notes</h3>
                      <div className="space-y-3">
                        {result.notes.map(note => (
                          <div key={note.id} className="flex items-start group">
                            <div className="flex-1 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                              <p className="text-gray-700 dark:text-gray-300">{note.content}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {new Date(note.createdAt).toLocaleString()}
                              </p>
                            </div>
                            <button
                              onClick={() => deleteNote(note.id)}
                              className="ml-2 p-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 flex">
                        <input
                          type="text"
                          value={newNote}
                          onChange={(e) => setNewNote(e.target.value)}
                          placeholder="Add a note..."
                          className="flex-1 px-3 py-2 border outline-none border-gray-300 dark:border-gray-600 rounded-l-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-primary"
                          onKeyPress={(e) => e.key === 'Enter' && addNote()}
                        />
                        <button
                          onClick={addNote}
                          className="px-3 py-2 bg-primary text-white rounded-r-lg hover:bg-primary/90"
                        >
                          <Plus className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="relative">
                      <div
                        className={`prose dark:prose-invert max-w-none p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg overflow-hidden ${showFullSummary ? '' : 'max-h-96'
                          }`}
                        style={{
                          maskImage: showFullSummary
                            ? 'none'
                            : 'linear-gradient(to bottom, black 70%, transparent 100%)'
                        }}
                      >
                        {result.summary?.summary.split('\n').map((paragraph, i) => (
                          <p key={i}>{paragraph}</p>
                        ))}
                      </div>

                      {!showFullSummary && (
                        <div className="absolute bottom-0 left-0 right-0 h-20 flex items-end justify-center bg-gradient-to-t from-white to-transparent dark:from-gray-800 dark:to-transparent">
                          <button
                            onClick={toggleSummaryView}
                            className="mb-2 px-4 py-1 bg-white dark:bg-gray-700 rounded-full shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1 border border-gray-200 dark:border-gray-600"
                          >
                            Show More <ChevronDown size={16} />
                          </button>
                        </div>
                      )}

                      {showFullSummary && (
                        <div className="mt-2 flex justify-center">
                          <button
                            onClick={toggleSummaryView}
                            className="px-4 py-1 bg-white dark:bg-gray-700 rounded-full shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1 border border-gray-200 dark:border-gray-600"
                          >
                            Show Less <ChevronUp size={16} />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Notes Section (Read-only) */}
                    {result.notes.length > 0 && (
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Notes</h3>
                        <div className="space-y-3">
                          {result.notes.map(note => (
                            <div key={note.id} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                              <p className="text-gray-700 dark:text-gray-300">{note.content}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {new Date(note.createdAt).toLocaleString()}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}