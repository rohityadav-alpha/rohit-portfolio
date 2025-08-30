"use client";
import { useState } from "react";

export default function AdminLogin() {
  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState("");

  const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "rohit2025";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem("isAdmin", "true");
      setShowLogin(false);
      setPassword("");
      window.location.reload();
    } else {
      alert("Incorrect password!");
      setPassword("");
    }
  };

  if (!showLogin) {
    return (
      <button
        onClick={() => setShowLogin(true)}
        className="fixed bottom-4 right-4 bg-gray-400 hover:bg-gray-600 text-white p-2 sm:p-3 rounded-full shadow-lg transition-colors z-50 text-sm sm:text-base"
        title="Admin Login"
        suppressHydrationWarning={true}
      >
        Admin
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white p-3 sm:p-4 rounded-lg shadow-xl border z-50 w-64 sm:w-auto">
      <form onSubmit={handleSubmit} className="space-y-2 sm:space-y-3">
        <h4 className="text-sm font-medium text-gray-900">Admin Login</h4>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          className="w-full px-2 sm:px-3 py-1.5 sm:py-2 border rounded text-sm"
          autoFocus
          suppressHydrationWarning={true}
        />
        <div className="flex space-x-2">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-2 sm:px-3 py-1 rounded text-xs sm:text-sm flex-1"
            suppressHydrationWarning={true}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => {
              setShowLogin(false);
              setPassword("");
            }}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm flex-1"
            suppressHydrationWarning={true}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
