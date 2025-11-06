// src/components/Modal.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface ModalProps {
  children: React.ReactNode;
}

export default function Modal({ children }: ModalProps) {
  const router = useRouter();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        router.back();
      }
    }
    
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [router]);

  function onOverlayClick(e: React.MouseEvent) {
    if (e.target === e.currentTarget) {
      router.back();
    }
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
      onClick={onOverlayClick}
    >
      <div className="relative max-w-screen-lg max-h-screen flex items-center justify-center">
        <button
          onClick={() => router.back()}
          className="absolute -top-12 right-0 bg-white bg-opacity-20 hover:bg-opacity-40 text-white rounded-full p-2 transition-all duration-200"
          aria-label="Close modal"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
}
