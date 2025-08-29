"use client";

export default function About() {
  return (
    <section id="about" className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              About Me
            </h2>
            <div className="w-16 sm:w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>

          {/* Main Content - Mobile Responsive Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center">
            {/* Text Content */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              <div className="prose prose-lg max-w-none">
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                  Hi, I'm <span className="font-semibold text-blue-600">Rohit Yadav</span> - a full-stack developer and third-year 
                  <span className="font-medium"> Bachelor of Science (Information Technology)</span> student at 
                  <span className="font-medium"> Mumbai University</span> who believes in building comprehensive solutions 
                  through collaborative development rather than working in isolation.
                </p>
                
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                  Currently mastering <span className="font-medium text-blue-600">AI-integrated web applications</span>, 
                  I recently spent August 2025 intensively developing a complete AI interview practice platform using 
                  <span className="font-medium"> React, Next.js, PostgreSQL,</span> and various APIs.
                </p>
                
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                  What drives me is turning complex technical challenges into elegant solutions, especially during those 
                  productive late-night coding sessions. As a <span className="font-medium">Hindi-English bilingual developer</span>, 
                  I bring both technical expertise and strong collaborative spirit to every project.
                </p>
              </div>

              {/* Key Highlights - Mobile Responsive */}
              <div className="mt-6 sm:mt-8">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
                  What I Bring
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></div>
                    <span className="text-sm sm:text-base text-gray-700">React, Next.js, PostgreSQL expertise</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></div>
                    <span className="text-sm sm:text-base text-gray-700">Modern AI-powered applications</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></div>
                    <span className="text-sm sm:text-base text-gray-700">Collaborative & comprehensive solutions</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></div>
                    <span className="text-sm sm:text-base text-gray-700">Full-stack development approach</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
