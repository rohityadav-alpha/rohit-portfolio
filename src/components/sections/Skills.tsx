"use client";

export default function Skills() {
  const skills = [
    { name: "React.js", level: 90, category: "Frontend" },
    { name: "Next.js", level: 85, category: "Frontend" },
    { name: "JavaScript", level: 80, category: "Frontend" },
    { name: "TypeScript", level: 75, category: "Frontend" },
    { name: "PostgreSQL", level: 90, category: "Backend" },
    { name: "Node.js", level: 70, category: "Backend" },
    { name: "API Development", level: 80, category: "Backend" },
    { name: "Git/GitHub", level: 85, category: "Tools" },
    { name: "VS Code", level: 95, category: "Tools" },
    { name: "Vercel", level: 80, category: "Tools" },
    { name: "AI Integration", level: 75, category: "Specialized" },
    { name: "Database Design", level: 85, category: "Specialized" }
  ];

  const categories = ["Frontend", "Backend", "Tools", "Specialized"];

  return (
    <section id="skills" className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Technical Skills
          </h2>
          <div className="w-16 sm:w-24 h-1 bg-blue-600 mx-auto mb-4 sm:mb-6"></div>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Technologies and tools I work with to build modern web applications
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {categories.map((category) => (
            <div key={category} className="bg-gray-50 rounded-xl p-4 sm:p-6 lg:p-8">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">
                {category}
              </h3>
              
              <div className="space-y-3 sm:space-y-4">
                {skills
                  .filter((skill) => skill.category === category)
                  .map((skill, index) => (
                    <div key={index} className="group">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm sm:text-base font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                          {skill.name}
                        </span>
                        <span className="text-sm sm:text-base font-semibold text-blue-600">
                          {skill.level}%
                        </span>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="w-full bg-gray-200 rounded-sm h-2 sm:h-3">
                        <div
                          className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 sm:h-3 rounded-sm transition-all duration-1000 ease-out"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="text-center mt-8 sm:mt-12 max-w-3xl mx-auto">
          <div className="bg-blue-100 border-l-4 border-blue-600 p-4 sm:p-6 rounded-sm">
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              <span className="font-semibold text-blue-800">Continuously learning and adapting to new technologies.</span>
              <br className="hidden sm:block" />
              Currently exploring advanced AI integration and modern development workflows.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
