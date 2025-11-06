"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Comment {
  id: string;
  postId: string;
  postType: string;
  userName: string;
  userEmail: string;
  comment: string;
  createdAt: string;
  approved: boolean;
}

type FilterType = 'all' | 'pending' | 'approved';
type PostTypeFilter = 'all' | 'blog' | 'project';

export default function AdminCommentsPage() {
  const router = useRouter();
  const [allComments, setAllComments] = useState<Comment[]>([]);
  const [filteredComments, setFilteredComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [filter, setFilter] = useState<FilterType>('all');
  const [postTypeFilter, setPostTypeFilter] = useState<PostTypeFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const adminStatus = localStorage.getItem("isAdmin");
    if (adminStatus !== "true") {
      router.push('/');
      return;
    }
    setIsAdmin(true);
    fetchComments('all');
  }, []);

  useEffect(() => {
    applyFilters();
  }, [allComments, filter, postTypeFilter, searchQuery]);

  const fetchComments = async (filterType: FilterType) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/comments/admin?filter=${filterType}`);
      const data = await res.json();
      if (data.success) {
        setAllComments(data.comments);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...allComments];

    if (filter === 'pending') {
      filtered = filtered.filter(c => !c.approved);
    } else if (filter === 'approved') {
      filtered = filtered.filter(c => c.approved);
    }

    if (postTypeFilter !== 'all') {
      filtered = filtered.filter(c => c.postType === postTypeFilter);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(c => 
        c.userName.toLowerCase().includes(query) ||
        c.userEmail.toLowerCase().includes(query)
      );
    }

    setFilteredComments(filtered);
  };

  const handleFilterChange = (newFilter: FilterType) => {
    setFilter(newFilter);
    fetchComments(newFilter);
  };

  const handleApprove = async (id: string) => {
    try {
      const res = await fetch(`/api/comments/approve/${id}`, {
        method: 'POST'
      });
      const data = await res.json();
      
      if (data.success) {
        alert('Comment approved successfully!');
        fetchComments(filter);
      } else {
        alert('Failed to approve comment');
      }
    } catch (error) {
      alert('Error approving comment');
    }
  };

  const handleDelete = async (id: string, commentText: string) => {
    if (!confirm(`Are you sure you want to delete this comment?\n\n"${commentText.substring(0, 100)}..."`)) {
      return;
    }

    try {
      const res = await fetch(`/api/comments/delete/${id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      
      if (data.success) {
        alert('Comment deleted successfully!');
        fetchComments(filter);
      } else {
        alert('Failed to delete comment');
      }
    } catch (error) {
      alert('Error deleting comment');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const clearFilters = () => {
    setSearchQuery('');
    setPostTypeFilter('all');
  };

  const pendingCount = allComments.filter(c => !c.approved).length;
  const approvedCount = allComments.filter(c => c.approved).length;

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Comment Management
            </h1>
            <p className="text-gray-600">
              Review, approve, and manage all comments
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/"
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Back to Home
            </Link>
            <button
              onClick={() => {
                localStorage.removeItem("isAdmin");
                router.push('/');
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex flex-col gap-4 mb-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex gap-2">
                <button
                  onClick={() => handleFilterChange('all')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    filter === 'all'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All ({allComments.length})
                </button>
                <button
                  onClick={() => handleFilterChange('pending')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    filter === 'pending'
                      ? 'bg-orange-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Pending ({pendingCount})
                </button>
                <button
                  onClick={() => handleFilterChange('approved')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    filter === 'approved'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Approved ({approvedCount})
                </button>
              </div>
              
              <button
                onClick={() => fetchComments(filter)}
                className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
              >
                Refresh
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search by Name or Email
                </label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search comments..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filter by Post Type
                </label>
                <select
                  value={postTypeFilter}
                  onChange={(e) => setPostTypeFilter(e.target.value as PostTypeFilter)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Types</option>
                  <option value="blog">Blog Only</option>
                  <option value="project">Project Only</option>
                </select>
              </div>
            </div>

            {(searchQuery || postTypeFilter !== 'all') && (
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  Showing {filteredComments.length} of {allComments.length} comments
                  {searchQuery && ` matching "${searchQuery}"`}
                  {postTypeFilter !== 'all' && ` in ${postTypeFilter}`}
                </p>
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading comments...</p>
            </div>
          ) : filteredComments.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-600">
                {searchQuery || postTypeFilter !== 'all'
                  ? 'No comments found matching your filters'
                  : filter === 'pending'
                  ? 'No pending comments'
                  : filter === 'approved'
                  ? 'No approved comments'
                  : 'No comments yet'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredComments.map((comment) => (
                <div
                  key={comment.id}
                  className={`border rounded-lg p-6 hover:shadow-md transition-shadow ${
                    comment.approved 
                      ? 'border-green-200 bg-green-50' 
                      : 'border-orange-200 bg-orange-50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <span className="font-semibold text-gray-900">
                          {comment.userName}
                        </span>
                        <span className="text-sm text-gray-500">
                          {comment.userEmail}
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          comment.postType === 'blog' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-purple-100 text-purple-800'
                        }`}>
                          {comment.postType}
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          comment.approved 
                            ? 'bg-green-600 text-white' 
                            : 'bg-orange-600 text-white'
                        }`}>
                          {comment.approved ? 'Approved' : 'Pending'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mb-3">
                        Posted on {formatDate(comment.createdAt)}
                      </p>
                      <p className="text-gray-700 whitespace-pre-wrap mb-3">
                        {comment.comment}
                      </p>
                      <Link
                        href={`/${comment.postType === 'blog' ? 'blogs' : 'projects'}/${comment.postId}`}
                        target="_blank"
                        className="text-sm text-blue-600 hover:underline"
                      >
                        View Post: {comment.postId}
                      </Link>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 border-t">
                    {!comment.approved && (
                      <button
                        onClick={() => handleApprove(comment.id)}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                      >
                        Approve
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(comment.id, comment.comment)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
