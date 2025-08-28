"use client";
import { useState } from 'react';

export default function ProjectUpload() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    techStack: '',
    githubUrl: '',
    liveUrl: '',
    category: 'Web Development'
  });

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(files);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    setMessage('');

    try {
      let imageUrls: string[] = [];

      if (selectedFiles.length > 0) {
        for (const file of selectedFiles) {
          const uploadFormData = new FormData();
          uploadFormData.append('file', file);

          const uploadRes = await fetch('/api/upload', {
            method: 'POST',
            body: uploadFormData,
          });

          const uploadResult = await uploadRes.json();
          if (uploadResult.success) {
            imageUrls.push(uploadResult.url);
          }
        }
      }

      const projectData = {
        ...formData,
        imageUrls,
        techStack: formData.techStack.split(',').map(tech => tech.trim()),
        createdAt: new Date().toISOString()
      };

      const projectRes = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData),
      });

      if (projectRes.ok) {
        setMessage('Project uploaded successfully!');
        setFormData({
          title: '',
          description: '',
          techStack: '',
          githubUrl: '',
          liveUrl: '',
          category: 'Web Development'
        });
        setSelectedFiles([]);
        const fileInput = document.getElementById('file-input') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
      } else {
        setMessage('Error uploading project');
      }
    } catch (error) {
      setMessage('Error uploading project');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-xl shadow-lg max-w-2xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">
        Add New Project
      </h2>

      {message && (
        <div className={`p-3 sm:p-4 rounded-lg mb-4 sm:mb-6 text-sm sm:text-base ${
          message.includes('successfully') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        {/* Project Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Project Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
            placeholder="Enter project title"
            suppressHydrationWarning={true}
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            rows={4}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm sm:text-base"
            placeholder="Describe your project..."
            suppressHydrationWarning={true}
          />
        </div>

        {/* Tech Stack */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tech Stack (comma separated)
          </label>
          <input
            type="text"
            name="techStack"
            value={formData.techStack}
            onChange={handleInputChange}
            required
            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
            placeholder="React, Next.js, PostgreSQL..."
            suppressHydrationWarning={true}
          />
        </div>

        {/* URLs Grid - Mobile Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              GitHub URL
            </label>
            <input
              type="url"
              name="githubUrl"
              value={formData.githubUrl}
              onChange={handleInputChange}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
              placeholder="https://github.com/..."
              suppressHydrationWarning={true}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Live URL
            </label>
            <input
              type="url"
              name="liveUrl"
              value={formData.liveUrl}
              onChange={handleInputChange}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
              placeholder="https://yourproject.com..."
              suppressHydrationWarning={true}
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
            suppressHydrationWarning={true}
          >
            <option value="Web Development">Web Development</option>
            <option value="Mobile App">Mobile App</option>
            <option value="AI/ML">AI/ML</option>
            <option value="Database">Database</option>
            <option value="API">API</option>
          </select>
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Project Screenshots (Multiple allowed)
          </label>
          <input
            id="file-input"
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            multiple
            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
            suppressHydrationWarning={true}
          />
          {selectedFiles.length > 0 && (
            <p className="text-sm text-gray-600 mt-2">
              {selectedFiles.length} file(s) selected
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={uploading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition-colors text-sm sm:text-base"
          suppressHydrationWarning={true}
        >
          {uploading ? 'Uploading...' : 'Upload Project'}
        </button>
      </form>
    </div>
  );
}
