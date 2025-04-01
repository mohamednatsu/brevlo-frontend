import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api'; // or your backend URL

const api = axios.create({
       baseURL: API_BASE_URL,
       timeout: 100000, // 30 seconds timeout
});

export const BASE_API_LINK = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';

// Add request interceptor for error handling
api.interceptors.response.use(
       response => response.data,
       error => {
              const errorMessage = error.response?.data?.error ||
                     error.response?.data?.message ||
                     error.message ||
                     'An error occurred';
              return Promise.reject(errorMessage);
       }
);

export const summarizeText = (text, language) => {
       return api.post('/summarize', { text, language });
};

export const transcribeAudio = (audioFile) => {
       const formData = new FormData();
       formData.append('audio', audioFile);
       return api.post('/transcribe', formData, {
              headers: {
                     'Content-Type': 'multipart/form-data',
              },
       });
};

export const downloadYouTubeAudio = (videoUrl) => {
       return api.post('/youtube/download', { videoUrl });
};

export const generatePDF = (summary, language) => {
       return api.post('/pdf/generate', { summary, language }, {
              responseType: 'blob', // Important for file downloads
       });
};

export const downloadFile = (filename) => {
       return api.get(`/downloads/${filename}`, {
              responseType: 'blob',
       });
};