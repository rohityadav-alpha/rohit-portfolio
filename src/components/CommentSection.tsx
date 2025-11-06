"use client";

import { useState, useEffect } from 'react';
import { getClientUserId } from '@/lib/userIdentity';

interface Comment {
  id: string;
  userName: string;
  comment: string;
  createdAt: string;
  replies?: Comment[];
}

interface CommentSectionProps {
  postId: string;
  postType: 'blog' | 'project';
}

export default function CommentSection({ postId, postType }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [replyTo, setReplyTo] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    userName: '',
    userEmail: '',
    comment: ''
  });

  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    try {
      const res = await fetch(`/api/comments/${postId}?postType=${postType}`);
      const data = await res.json();
      if (data.success) {
        setComments(data.comments);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);

    try {
      const userId = getClientUserId();
      const res = await fetch(`/api/comments/${postId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          postType,
          userId,
          parentId: replyTo
        })
      });

      const data = await res.json();

      if (data.success) {
        setMessage({ type: 'success', text: 'Comment submitted! It will appear after admin approval.' });
        setFormData({ userName: '', userEmail: '', comment: '' });
        setShowForm(false);
        setReplyTo(null);
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to submit comment' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to submit comment' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleReply = (commentId: string) => {
    setReplyTo(commentId);
    setShowForm(true);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const CommentItem = ({ comment, isReply = false }: { comment: Comment, isReply?: boolean }) => (
    <div className={`${isReply ? 'ml-8 mt-4' : 'mb-6'} p-4 bg-gray-50 rounded-lg`}>
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="font-semibold text-gray-900">{comment.userName}</p>
          <p className="text-xs text-gray-500">{formatDate(comment.createdAt)}</p>
        </div>
        {!isReply && (
          <button
            onClick={() => handleReply(comment.id)}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            Reply
          </button>
        )}
      </div>
      <p className="text-gray-700 whitespace-pre-wrap">{comment.comment}</p>
      
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-4 space-y-4">
          {comment.replies.map(reply => (
            <CommentItem key={reply.id} comment={reply} isReply={true} />
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="mt-12 border-t pt-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-900">
          Comments ({comments.length})
        </h3>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setReplyTo(null);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {showForm ? 'Cancel' : 'Add Comment'}
        </button>
      </div>

      {message && (
        <div className={`mb-4 p-4 rounded-lg ${
          message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
        }`}>
          {message.text}
        </div>
      )}

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-8 p-6 bg-white border rounded-lg">
          <h4 className="text-lg font-semibold mb-4">
            {replyTo ? 'Reply to Comment' : 'Leave a Comment'}
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                required
                value={formData.userName}
                onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Your name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                required
                value={formData.userEmail}
                onChange={(e) => setFormData({ ...formData, userEmail: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Comment
            </label>
            <textarea
              required
              rows={4}
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Share your thoughts..."
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {submitting ? 'Submitting...' : 'Submit Comment'}
            </button>
            {replyTo && (
              <button
                type="button"
                onClick={() => setReplyTo(null)}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel Reply
              </button>
            )}
          </div>
        </form>
      )}

      {loading ? (
        <div className="text-center py-8">
          <p className="text-gray-600">Loading comments...</p>
        </div>
      ) : comments.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600 mb-4">No comments yet. Be the first to comment!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {comments.map(comment => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>
      )}
    </div>
  );
}
