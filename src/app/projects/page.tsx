"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import LikeButton from "@/components/LikeButton";
import CommentSection from "@/components/CommentSection";
import AdminLogin from '@/components/AdminLogin';

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
    if (
      confirm(
        `Are you sure you want to delete "${title}"? This action cannot be undone.`
      )
    ) {
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
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading projects...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <AdminLogin />
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Recent Projects
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Explore my latest development work and technical achievements
            </p>
          </div>

          {isAdmin && (
            <div className="mb-8 p-4 sm:p-6 bg-blue-50 rounded-lg border border-blue-200 max-w-4xl mx-auto">
              <p className="text-blue-800 font-medium mb-3 text-center">
                Admin Panel
              </p>
              <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
                <Link
                  href="/projects/add"
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium text-sm transition-colors text-center"
                >
                  Add New Project
                </Link>
                <Link
                  href="/admin/comments"
                  className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium text-sm transition-colors text-center"
                >
                  Moderate Comments
                </Link>
                <Link
                  href="/admin/contacts"
                  className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium text-sm transition-colors text-center"
                >
                  View Contact Messages
                </Link>
                <button
                  onClick={() => {
                    localStorage.removeItem("isAdmin");
                    setIsAdmin(false);
                  }}
                  className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium text-sm transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          )}

          {projects.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-xl shadow-sm max-w-2xl mx-auto">
              <div className="text-6xl mb-6">📂</div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                No projects available yet
              </h3>
              <p className="text-gray-600 mb-6">
                Check back later for new projects
              </p>
              {isAdmin && (
                <Link
                  href="/projects/add"
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Add Your First Project
                </Link>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {projects.map((project: any) => (
                <article
                  key={project.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group flex flex-col"
                >
                  {project.imageUrls && project.imageUrls.length > 0 ? (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={project.imageUrls[0]}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {isAdmin && (
                        <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Link
                            href={`/projects/${project.slug}/edit`}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-xs font-medium shadow-lg"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() =>
                              handleDelete(project.slug, project.title)
                            }
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs font-medium shadow-lg"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                      <span className="text-gray-400 text-sm">No Image</span>
                    </div>
                  )}

                  <div className="p-6 flex-1 flex flex-col">
                    <div className="mb-3">
                      <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                        {project.category}
                      </span>
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {project.title}
                    </h3>

                    <p className="text-gray-600 mb-4 line-clamp-3 flex-1">
                      {project.description}
                    </p>

                    {project.techStack && project.techStack.length > 0 && (
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-2">
                          {project.techStack
                            .slice(0, 3)
                            .map((tech: string, index: number) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded font-medium"
                              >
                                {tech}
                              </span>
                            ))}
                          {project.techStack.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded font-medium">
                              +{project.techStack.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="text-blue-600 hover:text-blue-700 font-medium text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all"
                      >
                        View Details
                        <span>→</span>
                      </Link>

                      <LikeButton postId={project.slug} postType="project" />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
