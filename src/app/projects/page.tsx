// D:\rohit-portfolio\src\app\projects\page.tsx
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetchProjects();
    const adminStatus = localStorage.getItem("isAdmin");
    setIsAdmin(adminStatus === "true");
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      if (data.success) {
        setProjects(data.projects);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (slug: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
      try {
        const res = await fetch(`/api/projects/${slug}`, {
          method: "DELETE",
        });
        const data = await res.json();
        if (data.success) {
          alert("Project deleted successfully!");
          fetchProjects();
        } else {
          alert("Error deleting project");
        }
      } catch (error) {
        alert("Error deleting project");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section - Mobile Responsive */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Recent Projects
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-2">
            Explore my latest development work and technical achievements
          </p>
          
          {/* Admin Panel - Mobile Responsive */}
          {isAdmin && (
            <div className="mt-6 p-3 sm:p-4 bg-yellow-100 rounded-lg border border-yellow-300 max-w-md mx-auto">
              <p className="text-yellow-800 font-medium mb-2 text-sm sm:text-base">🔐 Admin Panel</p>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center justify-center">
                <Link
                  href="/projects/add"
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-2 rounded-lg font-medium text-sm transition-colors"
                >
                  ➕ Add New Project
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

        {/* Projects Grid - Mobile Responsive */}
        {projects.length === 0 ? (
          <div className="text-center py-12 sm:py-16">
            <div className="text-4xl sm:text-6xl mb-4">📁</div>
            <p className="text-gray-600 text-base sm:text-lg">No projects available yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {projects.map((project: any) => (
              <div key={project.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow relative">
                {/* Admin Controls - Mobile Optimized */}
                {isAdmin && (
                  <div className="absolute top-2 right-2 z-10 bg-white rounded-lg shadow-md p-1 flex gap-1">
                    <Link
                      href={`/projects/${project.slug}/edit`}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white p-1.5 sm:p-2 rounded text-xs"
                      title="Edit Project"
                    >
                      ✏️
                    </Link>
                    <button
                      onClick={() => handleDelete(project.slug, project.title)}
                      className="bg-red-500 hover:bg-red-600 text-white p-1.5 sm:p-2 rounded text-xs"
                      title="Delete Project"
                    >
                      🗑️
                    </button>
                  </div>
                )}

                {/* Project Image - Responsive */}
                {project.imageUrls && project.imageUrls.length > 0 && (
                  <div className="relative">
                    <img
                      src={project.imageUrls[0]}
                      alt={project.title}
                      className="w-full h-36 sm:h-44 lg:h-48 object-cover"
                    />
                    {project.imageUrls.length > 1 && (
                      <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-full">
                        +{project.imageUrls.length - 1} more
                      </div>
                    )}
                  </div>
                )}
                
                {(!project.imageUrls || project.imageUrls.length === 0) && (
                  <div className="w-full h-36 sm:h-44 lg:h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                    <span className="text-2xl sm:text-3xl lg:text-4xl">💻</span>
                  </div>
                )}
                
                {/* Project Content - Mobile Responsive */}
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm sm:text-base line-clamp-3">
                    {project.description}
                  </p>
                  
                  {/* Tech Stack - Responsive */}
                  <div className="flex flex-wrap gap-1 sm:gap-2 mb-4">
                    {project.techStack?.slice(0, 4).map((tech: string, index: number) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack?.length > 4 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        +{project.techStack.length - 4} more
                      </span>
                    )}
                  </div>
                  
                  <Link
                    href={`/projects/${project.slug}`}
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm sm:text-base"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
