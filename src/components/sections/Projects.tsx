"use client";
import { useState, useEffect } from 'react';


export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      if (data.success) {
        // Show only first 6 projects for featured section
        setProjects(data.projects.slice(0, 6));
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Featured Projects
            </h2>
            <div className="w-16 sm:w-24 h-1 bg-blue-600 mx-auto mb-4 sm:mb-6"></div>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Showcasing my recent development work and technical achievements
            </p>
          </div>
          
          {/* Loading State */}
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading projects...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Featured Projects
          </h2>
          <div className="w-16 sm:w-24 h-1 bg-blue-600 mx-auto mb-4 sm:mb-6"></div>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Showcasing my recent development work and technical achievements
          </p>
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
              <div key={project.id} className="bg-white rounded-sm shadow-lg overflow-hidden hover:shadow-xl transition-shadow relative">

                {/* Project Image - Responsive */}
                {project.imageUrls && project.imageUrls.length > 0 && (
                  <div className="relative">
                    <img
                      src={project.imageUrls[0]}
                      alt={project.title}
                      className="w-full h-48 sm:h-44 lg:h-48 object-cover"
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
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-sm"
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

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-gray-800 hover:bg-gray-900 text-white text-center py-2 px-3 rounded-sm font-medium transition-colors duration-300 text-sm"
                      >
                        GitHub
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-2 px-3 rounded-sm font-medium transition-colors duration-300 text-sm"
                      >
                        Live Demo
                      </a>
                    )}
                  </div>
                  
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
