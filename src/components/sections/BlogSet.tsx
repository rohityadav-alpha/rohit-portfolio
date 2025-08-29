"use client";
import { useState, useEffect } from 'react';

interface Blog {
  id: number;
  title: string;
  slug: string;
  excerpt?: string | null;
  category: string;
  tags: string[];
  createdAt: string;
  author: string;
  imageUrl?: string | null;
  published: boolean;
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetchBlogs();
    const adminStatus = localStorage.getItem("isAdmin");
    setIsAdmin(adminStatus === "true");
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await fetch('/api/blogs');
      const data = await res.json();
      if (data.success) {
        setBlogs(data.blogs);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading blogs...</p>
        </div>
      </div>
    );
  }

  return (
    <main>
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Thoughts, insights, and tutorials about web development and technology
          </p>
        </div>

        {/* Blog Grid */}
        {blogs.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-6">📝</div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No blog posts yet</h3>
            <p className="text-gray-600">Check back later for new content!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {blogs.map((blog) => (
              <article key={blog.id} className="bg-white rounded-sm shadow-lg overflow-hidden hover:shadow-xl transition-shadow relative">
                {/* Featured Image */}
                <div className="relative overflow-hidden">
                  {blog.imageUrl ? (
                    <img
                      src={blog.imageUrl}
                      alt={blog.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                      <span className="text-7xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">{blog.title.charAt(0)}</span>
                    </div>
                  )}
                
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Category */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      {blog.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {blog.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {blog.excerpt || blog.title.substring(0, 120) + '...'}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span className="font-medium">{blog.author}</span>
                    <time>{new Date(blog.createdAt).toLocaleDateString()}</time>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
    </main>
  );
}
