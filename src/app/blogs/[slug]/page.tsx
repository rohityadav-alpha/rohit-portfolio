"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import LikeButton from '@/components/LikeButton';
import CommentSection from '@/components/CommentSection';
import AdminLogin from '@/components/AdminLogin';
import Header from "@/components/Header";

export default function BlogDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);

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
    if (confirm(`Are you sure you want to delete "${blog.title}"?`)) {
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

  const openImageModal = () => {
    setShowImageModal(true);
    document.body.style.overflow = 'hidden';
  };

  const closeImageModal = () => {
    setShowImageModal(false);
    document.body.style.overflow = 'unset';
  };

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && showImageModal) {
        closeImageModal();
      }
    };

    if (showImageModal) {
      document.addEventListener('keydown', handleEscKey);
      return () => {
        document.removeEventListener('keydown', handleEscKey);
      };
    }
  }, [showImageModal]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading blog...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Blog Not Found</h1>
        <Link href="/blogs" className="text-blue-600 hover:underline">
          Back to Blogs
        </Link>
      </div>
    );
  }

  return (
    <>
      <Header />
      <AdminLogin />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {isAdmin && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-blue-800 font-medium mb-3">Admin Panel</p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href={`/blogs/${blog.slug}/edit`}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors"
                >
                  Edit Blog
                </Link>
                <button
                  onClick={handleDelete}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors"
                >
                  Delete Blog
                </button>
                <Link
                  href="/admin/comments"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors"
                >
                  Moderate Comments
                </Link>
                <Link
                  href="/admin/contacts"
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors"
                >
                  View Contact Messages
                </Link>
                <button
                  onClick={() => {
                    localStorage.removeItem("isAdmin");
                    setIsAdmin(false);
                  }}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors"
                >
                  Logout Admin
                </button>
              </div>
            </div>
          )}

          {blog.imageUrl && (
            <div className="mb-8 rounded-xl overflow-hidden shadow-lg cursor-pointer" onClick={openImageModal}>
              <img
                src={blog.imageUrl}
                alt={blog.title}
                className="w-full h-auto hover:opacity-95 transition-opacity"
              />
              <p className="text-sm text-gray-500 text-center mt-2 hover:text-gray-700">Click to view full size</p>
            </div>
          )}

          <article className="bg-white rounded-xl shadow-sm p-6 sm:p-8">
            <div className="mb-6">
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full mb-4">
                {blog.category}
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                {blog.title}
              </h1>
              <div className="flex items-center justify-between text-sm text-gray-600 flex-wrap gap-2">
                <span className="font-medium">By {blog.author}</span>
                <time>{new Date(blog.createdAt).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</time>
              </div>
            </div>

            {blog.excerpt && (
              <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
                <p className="text-gray-700 italic">{blog.excerpt}</p>
              </div>
            )}

            <div className="prose max-w-none mb-8">
              <div className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                {blog.content}
              </div>
            </div>

            {blog.tags && blog.tags.length > 0 && (
              <div className="mb-6 pb-6 border-b">
                <h3 className="text-lg font-semibold mb-3 text-gray-900">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag: string, index: number) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t">
              <Link
                href="/blogs"
                className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1"
              >
                ← Back to All Blogs
              </Link>
              
              <LikeButton 
                postId={blog.slug} 
                postType="blog"
              />
            </div>
          </article>

          <CommentSection 
            postId={blog.slug} 
            postType="blog"
          />
        </div>
      </div>

      {showImageModal && blog.imageUrl && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeImageModal();
            }
          }}
        >
          <button
            onClick={closeImageModal}
            className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 transition-colors z-10 w-12 h-12 flex items-center justify-center"
          >
            ✕
          </button>
          <img
            src={blog.imageUrl}
            alt={blog.title}
            className="max-w-full max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <p className="absolute bottom-4 text-white text-sm bg-black bg-opacity-50 px-4 py-2 rounded-lg">
            Press ESC or click outside to close
          </p>
        </div>
      )}
    </>
  );
}
