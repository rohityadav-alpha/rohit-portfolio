"use client";

import { motion } from "framer-motion";

export default function Skills() {
  const skills = [
    { name: "React.js", level: 90, category: "Frontend" },
    { name: "Next.js", level: 85, category: "Frontend" },
    { name: "JavaScript", level: 80, category: "Frontend" },
    { name: "TypeScript", level: 75, category: "Frontend" },
    { name: "Tailwind CSS", level: 85, category: "Frontend" },
    { name: "HTML/CSS", level: 90, category: "Frontend" },
    { name: "PostgreSQL", level: 90, category: "Backend" },
    { name: "Node.js", level: 70, category: "Backend" },
    { name: "Prisma ORM", level: 80, category: "Backend" },
    { name: "API Development", level: 80, category: "Backend" },
    { name: "Git/GitHub", level: 85, category: "Tools" },
    { name: "VS Code", level: 95, category: "Tools" },
    { name: "Vercel", level: 80, category: "Tools" },
    { name: "pgAdmin", level: 75, category: "Tools" },
    { name: "AI Integration", level: 75, category: "Specialized" },
    { name: "Database Design", level: 85, category: "Specialized" },
    { name: "Machine Learning", level: 70, category: "Specialized" },
    { name: "Authentication", level: 80, category: "Specialized" }
  ];

  const categories = [
    { name: "Frontend", color: "blue" },
    { name: "Backend", color: "green" },
    { name: "Tools", color: "purple" },
    { name: "Specialized", color: "orange" }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-blue-500",
      green: "bg-green-500",
      purple: "bg-purple-500",
      orange: "bg-orange-500"
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section id="skills" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Technical Skills
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-sm mb-4"></div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Technologies and tools I work with to build modern web applications
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
          {categories.map((category, categoryIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className="bg-white rounded-sm shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className={`w-3 h-3 rounded-sm ${getColorClasses(category.color)}`}></span>
                {category.name}
              </h3>

              <div className="space-y-5">
                {skills
                  .filter((skill) => skill.category === category.name)
                  .map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-700 font-medium text-sm">
                          {skill.name}
                        </span>
                        <span className="text-gray-600 font-semibold text-sm">
                          {skill.level}%
                        </span>
                      </div>

                      <div className="w-full h-2 bg-gray-200 rounded-sm overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          className={`h-full ${getColorClasses(category.color)} rounded-sm`}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-sm p-6 border border-gray-200">
            <p className="text-gray-700 text-base leading-relaxed mb-2">
              <span className="font-semibold text-gray-900">Continuously learning and adapting to new technologies.</span>
            </p>
            <p className="text-gray-600 text-sm">
              Currently exploring advanced AI integration and modern development workflows.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
