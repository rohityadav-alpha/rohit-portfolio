'use client';

import Modal from '@/components/Modal';
import { useState, useEffect } from 'react';

interface PageProps {
  params: { imageId: string };
}

export default function ImageModal({ params }: PageProps) {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    // Decode the image URL from the imageId
    if (params.imageId) {
      const decodedUrl = decodeURIComponent(params.imageId);
      setImageUrl(decodedUrl);
    }
  }, [params.imageId]);

  if (!imageUrl) return null;

  return (
    <Modal>
      <img
        src={imageUrl}
        alt="Full size screenshot"
        className="max-w-full max-h-full object-contain rounded-lg"
      />
    </Modal>
  );
}
