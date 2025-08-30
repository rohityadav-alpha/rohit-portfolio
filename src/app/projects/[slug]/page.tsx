"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
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

  const openImageModal = (imageUrl: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedImage(imageUrl);
    setShowModal(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setShowModal(false);
    setSelectedImage("");
    document.body.style.overflow = 'unset';
  };

  // ESC key handler
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && showModal) {
        closeModal();
      }
    };

    if (showModal) {
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [showModal]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading project...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <div className="text-4xl sm:text-6xl mb-4">❌</div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Project Not Found</h1>
          <Link 
            href="/projects" 
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <AdminLogin />
      <div className="min-h-screen bg-gray-50 py-8 sm:py-12 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="bg-white rounded-sm shadow-lg overflow-hidden">
            <div className="p-4 sm:p-6 lg:p-8">
              {/* Admin Controls */}
              {isAdmin && (
                <div className="mb-6 sm:mb-8 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg">
                  <h4 className="text-base sm:text-lg font-semibold text-red-900 mb-3">🔐 Admin Panel</h4>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                    <Link
                      href={`/projects/${project.slug}/edit`}
                      className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 sm:px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2 text-sm transition-colors"
                    >
                      Edit Project
                    </Link>
                    <button
                      onClick={handleDelete}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 sm:px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2 text-sm transition-colors"
                    >
                      Delete Project
                    </button>
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

              {/* Project Header */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 flex-1">
                  {project.title}
                </h1>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-sm text-sm font-medium w-fit">
                  {project.category}
                </span>
              </div>

              <p className="text-gray-700 mb-6 sm:mb-8 leading-relaxed text-base sm:text-lg">
                {project.description}
              </p>

              {/* Image Gallery */}
              {project.imageUrls && project.imageUrls.length > 0 && (
                <div className="mb-6 sm:mb-8">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
                    Project Screenshots
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    {project.imageUrls.map((imageUrl: string, index: number) => (
                      <div key={index} className="relative group cursor-pointer">
                        <img
                          src={imageUrl}
                          alt={`${project.title} screenshot ${index + 1}`}
                          className="w-full h-40 sm:h-44 lg:h-48 object-cover rounded-sm hover:opacity-90 transition-opacity"
                          onClick={(e) => openImageModal(imageUrl, e)}
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-lg flex items-center justify-center">
                          <span className="text-white opacity-0 group-hover:opacity-100 font-medium text-sm text-center px-2">
                            Click to view full size
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Technologies */}
              <div className="mb-6 sm:mb-8">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack?.map((tech: string, index: number) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-gray-100 text-gray-800 rounded-sm text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-800 hover:bg-gray-900 text-white px-4 sm:px-6 py-3 rounded-sm font-medium text-center transition-colors"
                  >
                    View on GitHub
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-3 rounded-sm font-medium text-center transition-colors"
                  >
                    Live Demo
                  </a>
                )}
              </div>

              {/* Meta Info */}
              <div className="text-sm text-gray-500">
                Added on {new Date(project.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>

          {/* Back Button */}
          <div className="mt-6 sm:mt-8 text-center">
            <Link
              href="/projects"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Back to All Projects
            </Link>
          </div>
        </div>
      </div>
      

      {/* SIMPLE GUARANTEED WORKING MODAL */}
      {showModal && selectedImage && (
        <div 
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black bg-opacity-95 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeModal(e);
            }
          }}
        >
          <div className="relative max-w-[95vw] max-h-[95vh] flex items-center justify-center">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute -top-10 right-0 bg-white bg-opacity-20 hover:bg-opacity-40 text-white rounded-full p-2 transition-all duration-200 z-10"
              aria-label="Close image"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Image */}
            <img
              src={selectedImage}
              alt="Full size screenshot"
              className="max-w-full max-h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            
            {/* Instructions */}
            <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 text-white text-sm opacity-75">
              Press ESC or click outside to close
            </div>
          </div>
        </div>
      )}
    </>
  );
}
