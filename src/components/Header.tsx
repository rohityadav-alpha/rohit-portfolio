"use client";

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';


export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isBlogPage = pathname.startsWith('/blogs');
  const isProjectsPage = pathname.startsWith('/projects');
  const isHomePage = pathname === '/';

  return (
    <header className=" w-30 h-16 shadow-lg sticky top-0 z-50 items-center justify-center backdrop-blur-md bg-white/1 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className=" w-5 h-5 text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors rounded-full">
             <div className="mx-auto flex items-center justify-center">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 p-1">
                    <div className="flex h-full w-full rounded-full items-center justify-center bg-white back">
                     <h1 className="text-1xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">R</h1>
                    </div>
                  </div>
                </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {isHomePage ? (
                <>
                  <Link
                    href="#about" 
                    className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                  >
                    About
                  </Link>
                  <Link 
                    href="#skills" 
                    className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                  >
                    Skills
                  </Link>
                  <Link 
                    href="#contact" 
                    className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                  >
                    Contact
                  </Link>
                </>
              ) :(
                null
              )}
              {isBlogPage ? (
                <Link
                  href="/"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  🏠 Home
                </Link>
              ) : (
                <Link
                  href="/blogs"
                  className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Blogs
                </Link>
              )}
              
              {/* Dynamic Button */}
              {isProjectsPage ? (
                <Link
                  href="/"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  🏠 Home
                </Link>
              ) : (
                <Link
                  href="/projects"
                  className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Recent Projects
                </Link>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                // Hamburger icon
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                // Close icon
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg border-t">
           {isHomePage ? (
                <> 
            <Link
              href="#about"
              className="text-gray-600 hover:text-blue-600 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium transition-colors"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              href="#skills"
              className="text-gray-600 hover:text-blue-600 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Skills
            </Link>
            <Link
              href="#contact"
              className="text-gray-600 hover:text-blue-600 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            </>
            ) : (
              null
            )}
            
            {isBlogPage ? (
                <Link
                  href="/"
                   className="bg-blue-600 hover:bg-blue-700 text-white block px-3 py-2 rounded-md text-base font-medium transition-colors"
                >
                  🏠 Home
                </Link>
              ) : (
                <Link
                  href="/blogs"
                   className="text-gray-600 hover:text-blue-600 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium transition-colors"
                >
                  Blogs
                </Link>
              )}
            
            {/* Mobile Dynamic Button */}
            <div className="pt-2">
              {isProjectsPage ? (
                <Link
                  href="/"
                  className="bg-blue-600 hover:bg-blue-700 text-white block px-3 py-2 rounded-md text-base font-medium transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  🏠 Home
                </Link>
              ) : (
                <Link
                  href="/projects"
                  className="text-gray-600 hover:text-blue-600 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  📁 Recent Projects
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
