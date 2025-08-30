"use client";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-6 sm:px-6 lg:px-8">

      <div className="container mx-auto text-center max-w-4xl">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 sm:space-y-8"
        >
          <motion.div
            className="w-[160px] h-[160px] rounded-full overflow-hidden mx-auto mb-8 flex items-center justify-center bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 p-1"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
            suppressHydrationWarning={true}
           >
             <Image
              src="/images/profile.jpg"
              alt="Rohit Yadav"
              width={160}
              height={160}
              className="flex object-cover w-full h-full rounded-full justify-center items-center shadow-2xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"
              priority
          />
         </motion.div>
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
            <span className="font-semibold text-blue-600">Full-Stack Developer With AI</span> &{" "}
            <span className="font-medium">A Student at Mumbai University</span> who builds
            comprehensive solutions through collaborative development
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4 sm:pt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 sm:px-8 py-3 sm:py-4 rounded-sm font-semibold text-base sm:text-lg transition-all duration-300"
              suppressHydrationWarning={true}
            >
              Get In Touch
            </button>
          </motion.div>

          <motion.div 
            className="flex justify-center space-x-4 sm:space-x-6 pt-6 sm:pt-8 "
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <a 
              href="mailto:rohityadav474747@gmail.com" 
              className="p-3 sm:p-4 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
              aria-label="Email"
              suppressHydrationWarning={true}
            >
              <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            </a>
            <a 
              href="https://github.com/rohityadav-alpha" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 sm:p-4 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
              aria-label="GitHub"
              suppressHydrationWarning={true}
            >
              <Github className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" />
            </a>
            <a 
              href="https://www.linkedin.com/in/rohit-yadav-a7636b36a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=member_default" 
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
