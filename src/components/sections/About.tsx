"use client";

import { motion } from "framer-motion";
import { Code2, GraduationCap, Sparkles, Users } from "lucide-react";

export default function About() {
  const features = [
    {
      icon: Code2,
      title: "Full-Stack Development",
      description: "Building comprehensive web applications with modern technologies and best practices"
    },
    {
      icon: Sparkles,
      title: "AI Integration",
      description: "Specializing in AI-powered solutions and machine learning implementations"
    },
    {
      icon: Users,
      title: "Collaborative Approach",
      description: "Strong believer in team development and knowledge sharing"
    },
    {
      icon: GraduationCap,
      title: "Continuous Learning",
      description: "Always exploring new technologies and improving technical skills"
    }
  ];

  return (
    <section 
      id="about" 
      className="py-20 bg-white"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            About Me
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed text-lg">
                Hi, I'm <span className="text-blue-600 font-semibold">Rohit Yadav</span> - a full-stack developer and third-year <span className="font-medium">Bachelor of Science (Information Technology)</span> student at Mumbai University who believes in building comprehensive solutions through collaborative development rather than working in isolation.
              </p>

              <p className="text-gray-700 leading-relaxed text-lg">
                Currently mastering <span className="font-medium text-purple-600">AI-integrated web applications</span>, I recently spent August 2025 intensively developing a complete AI interview practice platform using React, Next.js, PostgreSQL, and various APIs.
              </p>

              <p className="text-gray-700 leading-relaxed text-lg">
                What drives me is turning complex technical challenges into elegant solutions, especially during those productive late-night coding sessions. As a Hindi-English bilingual developer, I bring both technical expertise and strong collaborative spirit to every project.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-4">
              <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-sm text-sm font-medium">
                React & Next.js
              </span>
              <span className="px-4 py-2 bg-purple-100 text-purple-800 rounded-sm text-sm font-medium">
                AI & ML
              </span>
              <span className="px-4 py-2 bg-green-100 text-green-800 rounded-sm text-sm font-medium">
                PostgreSQL
              </span>
              <span className="px-4 py-2 bg-orange-100 text-orange-800 rounded-sm text-sm font-medium">
                Full-Stack
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-sm shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-sm flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
