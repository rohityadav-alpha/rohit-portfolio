"use client";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";

export default function Hero() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto text-center max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 sm:space-y-8"
        >
          <motion.h1 
            className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-bold text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Hi, I'm{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Rohit Yadav
            </span>
          </motion.h1>

          <motion.p 
            className="text-lg sm:text-xl lg:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <span className="font-semibold text-blue-600">Full-Stack Developer</span> &{" "}
            <span className="font-medium">BSc IT Student at Mumbai University</span> who builds
            comprehensive solutions through collaborative development
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4 sm:pt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <button
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-all duration-300 hover:scale-105 shadow-lg"
              suppressHydrationWarning={true}
            >
              View My Work
            </button>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-all duration-300"
              suppressHydrationWarning={true}
            >
              Get In Touch
            </button>
          </motion.div>

          <motion.div 
            className="flex justify-center space-x-4 sm:space-x-6 pt-6 sm:pt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <a 
              href="mailto:rohityadav@example.com" 
              className="p-3 sm:p-4 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
              aria-label="Email"
              suppressHydrationWarning={true}
            >
              <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            </a>
            <a 
              href="https://github.com/rohityadav" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 sm:p-4 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
              aria-label="GitHub"
              suppressHydrationWarning={true}
            >
              <Github className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" />
            </a>
            <a 
              href="https://linkedin.com/in/rohityadav" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 sm:p-4 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
              aria-label="LinkedIn"
              suppressHydrationWarning={true}
            >
              <Linkedin className="w-5 h-5 sm:w-6 sm:h-6 text-blue-700" />
            </a>
          </motion.div>

          <motion.button
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="mt-8 sm:mt-12 mx-auto block p-2 sm:p-3 text-gray-600 hover:text-blue-600 transition-colors duration-300"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            suppressHydrationWarning={true}
          >
            <ArrowDown className="w-6 h-6 sm:w-8 sm:h-8" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
