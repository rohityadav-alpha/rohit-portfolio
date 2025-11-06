"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import LikeButton from '@/components/LikeButton';
import CommentSection from '@/components/CommentSection';
import AdminLogin from '@/components/AdminLogin';

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetchProject();
    const adminStatus = localStorage.getItem("isAdmin");
    setIsAdmin(adminStatus === "true");
  }, [params.slug]);

  const fetchProject = async () => {
    try {
      const res = await fetch(`/api/projects/${params.slug}`);
      const data = await res.json();
      if (data.success) {
        setProject(data.project);
      }
    } catch (error) {
      console.error("Error fetching project:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (confirm(`Are you sure you want to delete "${project.title}"? This action cannot be undone.`)) {
      try {
        const res = await fetch(`/api/projects/${project.slug}`, {
          method: "DELETE",
        });
        const data = await res.json();
        if (data.success) {
          alert("Project deleted successfully!");
          router.push("/projects");
        } else {
          alert("Error deleting project");
        }
      } catch (error) {
        alert("Error deleting project");
      }
    }
  };

  const openImageModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setShowModal(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedImage("");
    document.body.style.overflow = 'unset';
  };

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && showModal) {
        closeModal();
      }
    };

    if (showModal) {
      document.addEventListener('keydown', handleEscKey);
      return () => {
        document.removeEventListener('keydown', handleEscKey);
      };
    }
  }, [showModal]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-gray-600">Loading project...</p>
        </div>
      </>
    );
  }

  if (!project) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
          <Link href="/projects" className="text-blue-600 hover:underline">
            Back to Projects
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <AdminLogin />
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          {isAdmin && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-blue-800 font-medium mb-3">Admin Panel</p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href={`/projects/${project.slug}/edit`}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 sm:px-4 py-2 rounded-lg font-medium text-sm transition-colors"
                >
                  Edit Project
                </Link>
                <button
                  onClick={handleDelete}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 sm:px-4 py-2 rounded-lg font-medium text-sm transition-colors"
                >
                  Delete Project
                </button>
                <Link
                  href="/admin/comments"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-3 sm:px-4 py-2 rounded-lg font-medium text-sm transition-colors"
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
                  className="bg-gray-600 hover:bg-gray-700 text-white px-3 sm:px-4 py-2 rounded-lg font-medium text-sm transition-colors"
                >
                  Logout Admin
                </button>
              </div>
            </div>
          )}

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-6 sm:p-8 lg:p-12">
              <div className="mb-6">
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full mb-4">
                  {project.category}
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                  {project.title}
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {project.imageUrls && project.imageUrls.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Project Screenshots</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {project.imageUrls.map((imageUrl: string, index: number) => (
                      <div
                        key={index}
                        className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow"
                        onClick={() => openImageModal(imageUrl)}
                      >
                        <img
                          src={imageUrl}
                          alt={`${project.title} screenshot ${index + 1}`}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity flex items-center justify-center">
                          <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-sm font-medium">
                            Click to enlarge
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Technologies Used</h2>
                <div className="flex flex-wrap gap-3">
                  {project.techStack?.map((tech: string, index: number) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium shadow-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mb-8">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
                  >
                    View on GitHub
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Live Demo
                  </a>
                )}
              </div>

              <div className="border-t pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-gray-500">
                    Added on {new Date(project.createdAt).toLocaleDateString()}
                  </p>
                  <Link
                    href="/projects"
                    className="inline-block mt-2 text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Back to All Projects
                  </Link>
                </div>
                
                <LikeButton 
                  postId={project.slug} 
                  postType="project"
                />
              </div>
            </div>
          </div>

          <CommentSection 
            postId={project.slug} 
            postType="project"
          />
        </div>
      </main>

      {showModal && selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeModal();
            }
          }}
        >
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 transition-colors z-10 w-12 h-12 flex items-center justify-center"
          >
            ✕
          </button>
          <img
            src={selectedImage}
            alt="Full size preview"
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
