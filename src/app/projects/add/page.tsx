// D:\rohit-portfolio\src\app\projects\add\page.tsx
"use client";
import { useState, useEffect } from 'react';
import ProjectUpload from '../../../components/ProjectUpload';

export default function AddProjectPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState('');
  const [showPasswordForm, setShowPasswordForm] = useState(true);

  const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "rohit2025";

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      setShowPasswordForm(false);
      localStorage.setItem('isAdmin', 'true');
    } else {
      alert('Incorrect password!');
    }
  };

  useEffect(() => {
    const adminStatus = localStorage.getItem('isAdmin');
    if (adminStatus === 'true') {
      setIsAdmin(true);
      setShowPasswordForm(false);
    }
  }, []);

  if (showPasswordForm && !isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg w-full max-w-sm sm:max-w-md">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">
            Admin Access Required
          </h2>
          <form onSubmit={handlePasswordSubmit}>
            <div className="mb-4 sm:mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                placeholder="Admin password"
                required
                suppressHydrationWarning={true}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition-colors text-sm sm:text-base"
              suppressHydrationWarning={true}
            >
              Access Admin Panel
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Mobile Responsive */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center sm:text-left">
            Admin Panel
          </h1>
          <button
            onClick={() => {
              localStorage.removeItem('isAdmin');
              setIsAdmin(false);
              setShowPasswordForm(true);
            }}
            className="text-red-600 hover:text-red-800 font-medium text-sm sm:text-base px-4 py-2 rounded-lg hover:bg-red-50 transition-colors"
          >
            🚪 Logout
          </button>
        </div>
        
        {/* Project Upload Component */}
        <ProjectUpload />
      </div>
    </div>
  );
}
