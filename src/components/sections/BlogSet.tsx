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

  useEffect(() => {
    fetchBlogs();
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
  
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Header */}
    <div className="text-center mb-8 sm:mb-12">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Blog</h1>
      <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
        Thoughts, insights, and tutorials about web development and technology
      </p>
    </div>

    {/* Blog Grid */}
    {blogs.length === 0 ? (
      <div className="text-center py-12 sm:py-16">
        <div className="text-5xl sm:text-6xl mb-4 sm:mb-6">📝</div>
        <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2">No blog posts yet</h3>
        <p className="text-sm sm:text-base text-gray-600">Check back later for new content!</p>
      </div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {blogs.map((blog) => (
          <article key={blog.id} className="bg-white rounded-sm shadow-lg overflow-hidden hover:shadow-xl transition-shadow relative group">
            {/* Featured Image */}
            <div className="relative overflow-hidden">
              {blog.imageUrl ? (
                <img
                  src={blog.imageUrl}
                  alt={blog.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                  <span className="text-5xl sm:text-6xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                    {blog.title.charAt(0)}
                  </span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-4 sm:p-5 md:p-6">
              {/* Category */}
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                  {blog.category}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                {blog.title}
              </h3>

              {/* Excerpt */}
              <p className="text-sm sm:text-base text-gray-600 mb-4 line-clamp-3">
                {blog.excerpt || blog.title.substring(0, 120) + '...'}
              </p>

              {/* Meta Info */}
              <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 mb-4">
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

  );
}
