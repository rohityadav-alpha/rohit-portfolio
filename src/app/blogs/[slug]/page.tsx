// D:\rohit-portfolio\src\app\blogs\[slug]\page.tsx
"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";

export default function BlogDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetchBlog();
    const adminStatus = localStorage.getItem("isAdmin");
    setIsAdmin(adminStatus === "true");
  }, [params.slug]);

  const fetchBlog = async () => {
    try {
      const res = await fetch(`/api/blogs/${params.slug}`);
      const data = await res.json();
      if (data.success) {
        setBlog(data.blog);
      }
    } catch (error) {
      console.error("Error fetching blog:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (confirm(`Are you sure you want to delete "${blog.title}"? This action cannot be undone.`)) {
      try {
        const res = await fetch(`/api/blogs/${blog.slug}`, {
          method: "DELETE",
        });
        const data = await res.json();
        if (data.success) {
          alert("Blog deleted successfully!");
          router.push("/blogs");
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
          <p className="text-gray-600">Loading blog...</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <div className="text-4xl sm:text-6xl mb-4">❌</div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Blog Not Found</h1>
          <Link href="/blogs" className="text-blue-600 hover:text-blue-800 font-medium">
            ← Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main>
      <Header />
   
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <article className="bg-white rounded-sm shadow-lg overflow-hidden">
          {/* Admin Controls */}
            {isAdmin && (
              <div className="mb-6 sm:mb-8 p-4 bg-red-50 border border-red-200 rounded-lg">
                <h4 className="text-lg font-semibold text-red-900 mb-3">🔐 Admin Panel</h4>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href={`/blogs/${blog.slug}/edit`}
                    className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg font-medium text-center transition-colors"
                  >
                    Edit Blog
                  </Link>
                  <button
                    onClick={handleDelete}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Delete Blog
                  </button>
                  <button
                    onClick={() => {
                      localStorage.removeItem("isAdmin");
                      setIsAdmin(false);
                    }}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Logout Admin
                  </button>
                </div>
              </div>
            )}
          {/* Featured Image */}
          {blog.imageUrl && (
            <div className="relative">
              <img
                src={blog.imageUrl}
                alt={blog.title}
                className="w-full h-48 sm:h-64 lg:h-80 object-cover rounded-sm"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <span className="text-white font-medium text-sm">Click to view full size</span>
              </div>
            </div>
          )}

          <div className="p-6 sm:p-8 lg:p-12">
            {/* Blog Header */}
            <header className="mb-6 sm:mb-8">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-sm text-sm font-medium">
                  {blog.category}
                </span>
            
              </div>
              
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {blog.title}
              </h1>
              
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <span>By {blog.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>Published on {new Date(blog.createdAt).toLocaleDateString()}</span>
                </div>
                {blog.updatedAt !== blog.createdAt && (
                  <div className="flex items-center gap-2">
                    <span>Updated on {new Date(blog.updatedAt).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
            </header>

            {/* Blog Content */}
            <div className="prose prose-lg max-w-none mb-8">
              <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                {blog.content}
              </div>
            </div>

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag: string, index: number) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-sm text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>

        {/* Navigation */}
        <div className="mt-8 text-center">
          <Link
            href="/blogs"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to All Blogs
          </Link>
        </div>
      </div>
    </div>
    </main>
  );
}
