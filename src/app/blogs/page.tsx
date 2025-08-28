"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetchBlogs();
    const adminStatus = localStorage.getItem("isAdmin");
    setIsAdmin(adminStatus === "true");
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await fetch("/api/blogs");
      const data = await res.json();
      if (data.success) {
        setBlogs(data.blogs);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (slug: string, title: string) => {
    if (
      confirm(
        `Are you sure you want to delete "${title}"? This action cannot be undone.`
      )
    ) {
      try {
        const res = await fetch(`/api/blogs/${slug}`, {
          method: "DELETE",
        });
        const data = await res.json();
        if (data.success) {
          alert("Blog deleted successfully!");
          fetchBlogs();
        } else {
          alert("Error deleting blog");
        }
      } catch (error) {
        alert("Error deleting blog");
      }
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
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Blog Posts
          </h1>
          <div className="w-16 sm:w-24 h-1 bg-blue-600 mx-auto mb-4 sm:mb-6"></div>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-2">
            Thoughts, tutorials, and insights about web development and
            technology
          </p>

          {/* Admin Panel */}
          {isAdmin && (
            <div className="mt-6 p-3 sm:p-4 bg-yellow-100 rounded-lg border border-yellow-300 max-w-md mx-auto">
              <p className="text-yellow-800 font-medium mb-2 text-sm sm:text-base">
                🔐 Admin Panel
              </p>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center justify-center">
                <Link
                  href="/blogs/add"
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-2 rounded-lg font-medium text-sm transition-colors"
                >
                  ➕ Add New Blog
                </Link>
                <button
                  onClick={() => {
                    localStorage.removeItem("isAdmin");
                    setIsAdmin(false);
                  }}
                  className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-3 sm:px-4 py-2 rounded-lg font-medium text-sm transition-colors"
                >
                  🚪 Admin Logout
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Blogs Grid */}
        {blogs.length === 0 ? (
          <div className="text-center py-12 sm:py-16">
            <div className="text-4xl sm:text-6xl mb-4">📝</div>
            <p className="text-gray-600 text-base sm:text-lg">
              No blog posts available yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {blogs.map((blog: any) => (
              <article
                key={blog.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow relative"
              >
                {/* Admin Controls */}
                {isAdmin && (
                  <div className="absolute top-2 right-2 z-10 bg-white rounded-lg shadow-md p-1 flex gap-1">
                    <Link
                      href={`/blogs/${blog.slug}/edit`}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white p-1.5 sm:p-2 rounded text-xs"
                      title="Edit Blog"
                    >
                      ✏️
                    </Link>
                    <button
                      onClick={() => handleDelete(blog.slug, blog.title)}
                      className="bg-red-500 hover:bg-red-600 text-white p-1.5 sm:p-2 rounded text-xs"
                      title="Delete Blog"
                    >
                      🗑️
                    </button>
                  </div>
                )}

                {/* Featured Image */}
                {blog.imageUrl ? (
                  <div className="relative">
                    <img
                      src={blog.imageUrl}
                      alt={blog.title}
                      className="w-full h-36 sm:h-44 lg:h-48 object-cover"
                    />
                    {!blog.published && (
                      <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                        Draft
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="w-full h-36 sm:h-44 lg:h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                    <span className="text-2xl sm:text-3xl lg:text-4xl">📝</span>
                  </div>
                )}

                {/* Blog Content */}
                <div className="p-4 sm:p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {blog.category}
                    </span>
                    {!blog.published && (
                      <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">
                        Draft
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                    {blog.title}
                  </h3>

                  <p className="text-gray-600 mb-4 text-sm sm:text-base line-clamp-3">
                    {blog.excerpt || blog.content.substring(0, 150) + "..."}
                  </p>

                  {/* Tags */}
                  {blog.tags && blog.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 sm:gap-2 mb-4">
                      {blog.tags
                        .slice(0, 3)
                        .map((tag: string, index: number) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      {blog.tags.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          +{blog.tags.length - 3} more
                        </span>
                      )}
                    </div>
                  )}

                  {/* Meta Info */}
                  <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                    <span>By {blog.author}</span>
                    <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                  </div>

                  <Link
                    href={`/blogs/${blog.slug}`}
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm sm:text-base"
                  >
                    Read More →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
