import React, { useState, useRef } from 'react';
import { Upload, X } from 'lucide-react';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
    const newFiles = Array.from(files);
    setUploadedFiles(prevFiles => [...prevFiles, ...newFiles]);
    newFiles.forEach(file => onFileUpload(file));
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  const onButtonClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="mb-4">
      <div
        className={`p-4 border-2 border-dashed rounded-lg ${
          dragActive ? "border-indigo-600" : "border-gray-300"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          onChange={handleChange}
          className="hidden"
        />
        <div className="text-center">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-1">Drag and drop files here, or click to select files</p>
          <button
            type="button"
            onClick={onButtonClick}
            className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Select Files
          </button>
        </div>
      </div>
      {uploadedFiles.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-900">Uploaded files:</h4>
          <ul className="mt-2 divide-y divide-gray-200">
            {uploadedFiles.map((file, index) => (
              <li key={index} className="py-2 flex items-center justify-between">
                <span className="text-sm text-gray-500">{file.name}</span>
                <button
                  onClick={() => removeFile(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X size={16} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileUpload;