import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ProductmanagmentImg from '@/assets/e-comm/product-management.webp'
import UsermanagementImg from '@/assets/e-comm/user-management.webp'
import OrderImg from '@/assets/e-comm/order-tracking.webp'
import CustomerImg from '@/assets/e-comm/customer.png'
import AnalyticsImg from '@/assets/e-comm/analytics.webp'

gsap.registerPlugin(ScrollTrigger);

// CRM Features Data
const featuresData = [
  {
    id: 1,
    title: 'Product Management System',
    description: 'Easily manage your entire product catalog from one dashboard. Add, edit, or remove products, track inventory in real-time, and organize products into categories for a seamless shopping experience.',
    image: ProductmanagmentImg,
    gradient: 'from-blue-400 to-purple-500'
  },
  {
    id: 2,
    title: 'User Management System',
    description: 'Keep complete control over your customers, vendors, and staff. Manage user roles, permissions, and profiles with ease, ensuring secure access and smooth operations across your e-commerce business.',
    image: UsermanagementImg,
    gradient: 'from-purple-400 to-pink-500'
  },
  {
    id: 3,
    title: 'Order & Inventory Tracking',
    description: 'Track every order from purchase to delivery. Get real-time stock updates, low-inventory alerts, and automated restocking suggestions to avoid missed sales and keep customers happy.',
    image: OrderImg,
    gradient: 'from-cyan-400 to-blue-500'
  },
  {
    id: 4,
    title: 'Customer Relationship Tools',
    description: 'Engage with customers using built-in CRM features like lead tracking, personalized communication, automated follow-ups, and support ticket management to boost customer satisfaction and retention.',
    image: CustomerImg,
    gradient: 'from-pink-400 to-rose-500'
  },
  {
    id: 5,
    title: 'Analytics & Reporting Dashboard',
    description: 'Make smarter business decisions with detailed insights. Monitor sales performance, customer behavior, product trends, and revenue reports with a powerful analytics dashboard—all in real time.',
    image: AnalyticsImg,
    gradient: 'from-indigo-400 to-purple-500'
  }
];

const FeatureCard = ({ title, description, image, gradient, index, totalCards }) => {
  const cardRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    const container = containerRef.current;
    if (!card || !container) return;

    const targetScale = 1 - (totalCards - index) * 0.05;

    gsap.set(card, {
      scale: 1,
      transformOrigin: "center top"
    });

    ScrollTrigger.create({
      trigger: container,
      start: "top center",
      end: "bottom center",
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const scale = gsap.utils.interpolate(1, targetScale, progress);

        gsap.set(card, {
          scale: Math.max(scale, targetScale),
          transformOrigin: "center top"
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [index, totalCards]);

  return (
    <div
      ref={containerRef}
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'sticky',
        top: 0
      }}
    >
      <div
        ref={cardRef}
        className={`bg-gradient-to-br ${gradient}`}
        style={{
          position: 'relative',
          width: '90%',
          maxWidth: '1400px',
          height: 'auto',
          minHeight: '550px',
          borderRadius: '24px',
          top: `calc(-5vh + ${index * 25}px)`,
          transformOrigin: 'top',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
          padding: '3px'
        }}
      >
        {/* Inner white card */}
        <div className="bg-white rounded-[21px] h-full w-full p-8 md:p-12 lg:p-16">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center h-full">
            {/* Left Side - Text Content */}
            <div className="space-y-4">
              <div className={`inline-block bg-gradient-to-r ${gradient} text-white px-4 py-1.5 rounded-full text-sm font-semibold`}>
                Feature {index + 1}
              </div>
              
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                {title}
              </h3>
              
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                {description}
              </p>
              
              <div className="pt-4">
                <Link to="/contact">
                  <button className={`bg-gradient-to-r ${gradient} text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300`}>
                    Learn More
                  </button>
                </Link>
              </div>
            </div>

            {/* Right Side - Image */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover"
                  style={{ minHeight: '350px', maxHeight: '500px' }}
                />
              </div>
              
              {/* Decorative gradient blob */}
              <div 
                className={`absolute -z-10 -top-4 -right-4 w-32 h-32 bg-gradient-to-br ${gradient} rounded-full opacity-30 blur-2xl`}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CRMFeaturesSection = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    gsap.fromTo(
      container,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1.2,
        ease: "power2.out"
      }
    );
  }, []);

  return (
    <main ref={containerRef} className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Hero Header Section */}
      <section className="container mx-auto px-8 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto space-y-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block"
          >
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
              ✨ Powerful CRM Features
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight"
          >
            Everything You Need to{' '}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Grow Your Business
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto"
          >
            Our comprehensive CRM system gives you complete control over your e-commerce operations with intuitive tools designed for growth.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="pt-8"
          >
            <div className="flex flex-col items-center gap-3">
              <p className="text-gray-500 font-medium">Scroll to Explore Features</p>
              <motion.div
                animate={{ 
                  y: [0, 10, 0],
                }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <svg 
                  className="w-6 h-6 text-purple-600" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M19 14l-7 7m0 0l-7-7m7 7V3" 
                  />
                </svg>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Stacked Cards Section */}
      <section className="w-full pb-20">
        {featuresData.map((feature, index) => (
          <FeatureCard
            key={feature.id}
            title={feature.title}
            description={feature.description}
            image={feature.image}
            gradient={feature.gradient}
            index={index}
            totalCards={featuresData.length}
          />
        ))}
      </section>

      {/* Bottom spacing */}
      {/* <div style={{ height: '30vh' }} /> */}
    </main>
  );
};

export default CRMFeaturesSection;