import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader, Download } from 'lucide-react';
import FileUpload from './FileUpload';
import { uploadFile, deleteFile } from '../services/fileService';
import { processAIRequest } from '../services/aiService';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface UploadedFile {
  name: string;
  url: string;
}

const AIVisionForge: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() && uploadedFiles.length === 0) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await processAIRequest(input, uploadedFiles.map(file => file.url));
      const assistantMessage: Message = { role: 'assistant', content: response };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error processing AI request:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'An error occurred while processing your request. Please try again.' }]);
    } finally {
      setIsLoading(false);
      setUploadedFiles([]);
    }
  };

  const handleExport = () => {
    const exportData = messages.map(msg => `${msg.role.toUpperCase()}: ${msg.content}`).join('\n\n');
    const blob = new Blob([exportData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ai-vision-forge-conversation.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = async (file: File) => {
    try {
      const url = await uploadFile(file, (progress) => {
        setUploadProgress(prev => ({ ...prev, [file.name]: progress }));
      });
      setUploadedFiles(prev => [...prev, { name: file.name, url }]);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert(error instanceof Error ? error.message : 'An error occurred while uploading the file');
    } finally {
      setUploadProgress(prev => {
        const newProgress = { ...prev };
        delete newProgress[file.name];
        return newProgress;
      });
    }
  };

  const removeFile = async (index: number) => {
    const file = uploadedFiles[index];
    try {
      await deleteFile(file.url);
      setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    } catch (error) {
      console.error('Error deleting file:', error);
      alert('An error occurred while deleting the file');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">AI Vision Forge</h2>
      <div className="mb-4 h-96 overflow-y-auto border border-gray-300 rounded p-4">
        {messages.map((msg, index) => (
          <div key={index} className={`mb-2 ${msg.role === 'assistant' ? 'text-indigo-600' : 'text-gray-800'}`}>
            <strong>{msg.role === 'assistant' ? 'AI Co-Pilot: ' : 'You: '}</strong>
            {msg.content}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <FileUpload onFileUpload={handleFileUpload} />
      {Object.entries(uploadProgress).map(([fileName, progress]) => (
        <div key={fileName} className="mb-2">
          <p>{fileName}: {progress.toFixed(0)}%</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      ))}
      {uploadedFiles.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-900">Uploaded files:</h4>
          <ul className="mt-2 divide-y divide-gray-200">
            {uploadedFiles.map((file, index) => (
              <li key={index} className="py-2 flex items-center justify-between">
                <span className="text-sm text-gray-500">{file.name}</span>
                <button
                  onClick={() => removeFile(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Describe your AI project idea or ask for guidance..."
          className="flex-grow border border-gray-300 rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-indigo-600 text-white px-4 py-2 rounded-r hover:bg-indigo-700 transition-colors flex items-center"
        >
          {isLoading ? <Loader className="animate-spin" size={20} /> : <Send size={20} />}
        </button>
      </form>
      <button
        onClick={handleExport}
        className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition-colors flex items-center"
      >
        <Download size={20} className="mr-2" />
        Export Conversation
      </button>
    </div>
  );
};

export default AIVisionForge;