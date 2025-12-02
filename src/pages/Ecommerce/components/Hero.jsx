
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">

      {/* Hero Content */}
      <div className="container mx-auto px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight"
            >
              Launch Your Online Store with{' '}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Confidence
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg text-gray-600 leading-relaxed"
            >
              We design and develop secure, user-friendly, and scalable e-commerce 
              websites that help your business grow faster.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="pt-4"
            >
              <Link to="/contact">
                <button className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300">
                  Get a Free Quote
                </button>
              </Link>
              <p className="text-sm text-gray-500 mt-4">
                Free Consultation. No Credit Card Required.
              </p>
            </motion.div>

            {/* Feature Pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap gap-3 pt-6"
            >
              <span className="bg-white px-4 py-2 rounded-full text-sm text-gray-700 shadow-sm border border-gray-200">
                ✓ Secure Payment Integration
              </span>
              <span className="bg-white px-4 py-2 rounded-full text-sm text-gray-700 shadow-sm border border-gray-200">
                ✓ Mobile Responsive
              </span>
              <span className="bg-white px-4 py-2 rounded-full text-sm text-gray-700 shadow-sm border border-gray-200">
                ✓ SEO Optimized
              </span>
            </motion.div>
          </motion.div>

          {/* Right Side - Video */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white p-2">
  <div className="rounded-xl overflow-hidden" style={{ height: '60vh' }}>
    <video
      className="w-full h-full object-cover"
      src="/Videos/56735950.mp4"
      autoPlay
      muted
      loop
      playsInline
    />
  </div>
</div>

            
            
            {/* Decorative Elements */}
            <motion.div
              animate={{ 
                y: [0, -20, 0],
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-50 blur-xl"
            ></motion.div>
            
            <motion.div
              animate={{ 
                y: [0, 20, 0],
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-full opacity-50 blur-xl"
            ></motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}