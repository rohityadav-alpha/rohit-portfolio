"use client";

import { useState, useEffect } from 'react';
import { getClientUserId } from '@/lib/userIdentity';

interface LikeButtonProps {
  postId: string;
  postType: 'blog' | 'project';
  initialLikes?: number;
  initialLiked?: boolean;
}

export default function LikeButton({
  postId,
  postType,
  initialLikes = 0,
  initialLiked = false
}: LikeButtonProps) {
  const [liked, setLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(initialLikes);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const uid = getClientUserId();
    setUserId(uid);
    fetchLikeStatus(uid);
  }, [postId]);

  const fetchLikeStatus = async (uid: string) => {
    try {
      const res = await fetch(
        `/api/likes/count/${postId}?postType=${postType}&userId=${uid}`
      );
      const data = await res.json();
      
      if (data.success) {
        setLikeCount(data.totalLikes);
        setLiked(data.userLiked);
      }
    } catch (error) {
      console.error('Error fetching like status:', error);
    }
  };

  const handleLike = async () => {
    if (loading || !userId) return;

    setLoading(true);

    // Optimistic UI update
    const newLiked = !liked;
    setLiked(newLiked);
    setLikeCount(prev => newLiked ? prev + 1 : prev - 1);

    try {
      const res = await fetch('/api/likes/toggle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId, postType, userId })
      });

      const data = await res.json();

      if (data.success) {
        setLiked(data.liked);
        setLikeCount(data.totalLikes);
      } else {
        // Revert on error
        setLiked(!newLiked);
        setLikeCount(prev => newLiked ? prev - 1 : prev + 1);
      }
    } catch (error) {
      console.error('Error toggling like:', error);
      // Revert on error
      setLiked(!newLiked);
      setLikeCount(prev => newLiked ? prev - 1 : prev + 1);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLike}
      disabled={loading}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
        liked
          ? 'bg-red-500 text-white hover:bg-red-600'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      } disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      <svg
        className={`w-5 h-5 transition-transform ${liked ? 'scale-110' : ''}`}
        fill={liked ? 'currentColor' : 'none'}
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
      <span>{likeCount}</span>
    </button>
  );
}
