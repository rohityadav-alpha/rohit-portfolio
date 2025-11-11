"use client";

import { useState } from 'react';
import { redirect, usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isBlogPage = pathname.startsWith('/blogs');
  const isProjectsPage = pathname.startsWith('/projects');
  const isHomePage = pathname === '/';

  const scrollToSection = (sectionId: string) => {
    setIsOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md py-3 sm:py-4">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex-shrink-0">
            <Link href="/" className=" w-5 h-5 text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors rounded-full">
             <div className="mx-auto flex items-center justify-center">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-500 p-1">
                    <div className="flex h-full w-full rounded-full items-center justify-center bg-white back drop-shadow-2xl">
                     <h1 className="text-1xl text-transparent bg-clip-text bg-gradient-to-tr from-blue-600 to-purple-600 text-shadow-xl">R</h1>
                    </div>
                  </div>
                </div>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {isHomePage ? (
              <>
                <button
                  onClick={() => redirect('/blogs')}
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors text-sm lg:text-base"
                >
                  Blogs
                </button>
                <button
                  onClick={() => scrollToSection('about')}
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors text-sm lg:text-base"
                >
                  About
                </button>
                <button
                  onClick={() => redirect('/projects')}
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors text-sm lg:text-base"
                >
                  Projects
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors text-sm lg:text-base"
                >
                  Contact
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/"
                  className={`font-medium transition-colors text-sm lg:text-base ${
                    pathname === '/'
                      ? 'text-blue-600'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  Home
                </Link>
                <Link
                  href="/projects"
                  className={`font-medium transition-colors text-sm lg:text-base ${
                    isProjectsPage
                      ? 'text-blue-600'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  Projects
                </Link>
                <Link
                  href="/blogs"
                  className={`font-medium transition-colors text-sm lg:text-base ${
                    isBlogPage
                      ? 'text-blue-600'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  Blog
                </Link>
                <Link
                  href="/#contact"
                  className="bg-gradient-to-r from-blue-200 to-purple-200 hover:from-blue-300 hover:to-purple-300 text-white px-4 lg:px-6 py-2 rounded-lg font-medium transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 text-sm lg:text-base"
                >
                  Get In Touch
                </Link>
              </>
            )}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />

          <div className="fixed top-14 sm:top-16 right-0 bottom-0 w-64 sm:w-80 bg-white shadow-2xl z-50 md:hidden overflow-y-auto">
            <div className="p-4 sm:p-6 space-y-2">
              {isHomePage ? (
                <>
                  <button
                    onClick={() => redirect('/blogs')}
                    className="w-full text-left px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg font-medium transition-all text-sm sm:text-base"
                  >
                    Blogs
                  </button>
                  <button
                    onClick={() => scrollToSection('about')}
                    className="w-full text-left px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg font-medium transition-all text-sm sm:text-base"
                  >
                    About
                  </button>
                  <button
                    onClick={() => redirect('/projects')}
                    className="w-full text-left px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg font-medium transition-all text-sm sm:text-base"
                  >
                    Projects
                  </button>
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="w-full text-left px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg font-medium transition-all text-sm sm:text-base"
                  >
                    Contact
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/"
                    onClick={() => setIsOpen(false)}
                    className={`w-full block px-4 py-3 rounded-lg font-medium transition-all text-sm sm:text-base ${
                      pathname === '/'
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                    }`}
                  >
                    Home
                  </Link>
                  <Link
                    href="/projects"
                    onClick={() => setIsOpen(false)}
                    className={`w-full block px-4 py-3 rounded-lg font-medium transition-all text-sm sm:text-base ${
                      isProjectsPage
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                    }`}
                  >
                    Projects
                  </Link>
                  <Link
                    href="/blogs"
                    onClick={() => setIsOpen(false)}
                    className={`w-full block px-4 py-3 rounded-lg font-medium transition-all text-sm sm:text-base ${
                      isBlogPage
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                    }`}
                  >
                    Blog
                  </Link>
                  <Link
                    href="/#contact"
                    onClick={() => setIsOpen(false)}
                    className="w-full block text-center bg-gradient-to-r from-blue-200 to-purple-200 hover:from-blue-300 hover:to-purple-300 text-white px-4 py-3 rounded-lg font-medium transition-all shadow-md mt-4 text-sm sm:text-base"
                  >
                    Get In Touch
                  </Link>
                </>
              )}
            </div>

            <div className="border-t p-4 sm:p-6">
              <p className="text-xs sm:text-sm text-gray-600 text-center">
                © 2025 Rohit Yadav. All rights reserved.
              </p>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
