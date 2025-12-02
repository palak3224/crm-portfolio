import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';

// Portfolio projects data
const portfolioProjects = [
  {
    id: 1,
    title: 'Fashion Hub E-Commerce',
    category: 'Fashion & Lifestyle',
    description: 'A modern online store featuring AI-powered recommendations, seamless checkout, and real-time inventory management.',
    image: '/fashionhub.png',
    stats: { sales: '250K+', products: '5,000+', rating: '4.9' },
    tags: ['E-Commerce', 'AI Integration', 'Mobile App']
  },
  {
    id: 2,
    title: 'GreenLeaf Organics',
    category: 'Health & Wellness',
    description: 'Sustainable organic products marketplace with subscription management and customer loyalty programs.',
    image: 'https://cdn.dribbble.com/userupload/40120302/file/original-48b56338a7336cc47d914d985da1eba1.jpg?resize=752x&vertical=center',
    stats: { sales: '180K+', products: '3,200+', rating: '4.8' },
    tags: ['Subscription', 'CRM', 'Analytics']
  },
  {
    id: 3,
    title: 'TechGear Pro Store',
    category: 'Electronics & Gadgets',
    description: 'High-performance electronics store with advanced filtering, comparison tools, and warranty management.',
    image: 'https://duttainnovations.com/wp-content/uploads/2023/05/3e9fec434eecbe00b3823f47a6d81426.png',
    stats: { sales: '420K+', products: '8,500+', rating: '4.9' },
    tags: ['Multi-vendor', 'Payment Gateway', 'Live Chat']
  },
  {
    id: 4,
    title: 'HomeDecor Paradise',
    category: 'Home & Living',
    description: 'Premium home decor marketplace with 3D product visualization and interior design consultation booking.',
    image: 'https://cdn.dribbble.com/userupload/17600087/file/original-449c27bd3276b870bef7d87f151125ba.jpg?resize=752x&vertical=center',
    stats: { sales: '310K+', products: '6,400+', rating: '4.7' },
    tags: ['3D Visualization', 'Booking System', 'Reviews']
  }
];

const PortfolioSection = () => {
  const [activeProject, setActiveProject] = useState(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-20 px-8 overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          ref={sectionRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block mb-6"
          >
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
              🎨 Our Success Stories
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Projects That{' '}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Speak Results
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We&apos;ve helped businesses transform their online presence and achieve remarkable growth. 
            Explore our most successful e-commerce projects.
          </p>
        </motion.div>

        {/* Split Screen Layout - Image Left, Content Right */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid md:grid-cols-2 gap-12 items-center mb-16"
        >
          {/* Left Side - Large Project Image */}
          <motion.div
            key={activeProject}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={portfolioProjects[activeProject].image}
                alt={portfolioProjects[activeProject].title}
                className={`w-full h-[500px] ${activeProject === 0 ? 'object-cover bg-white' : 'object-cover'}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 via-purple-600/10 to-transparent" />
            </div>

            {/* Stats Overlay */}
            <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {portfolioProjects[activeProject].stats.sales}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">Total Sales</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {portfolioProjects[activeProject].stats.products}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">Products</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">
                    {portfolioProjects[activeProject].stats.rating}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">Rating</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Project Details */}
          <motion.div
            key={`content-${activeProject}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="inline-block bg-white px-4 py-2 rounded-full text-sm font-semibold text-gray-700 shadow-sm border border-gray-200">
              {portfolioProjects[activeProject].category}
            </div>

            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              {portfolioProjects[activeProject].title}
            </h3>

            <p className="text-lg text-gray-600 leading-relaxed">
              {portfolioProjects[activeProject].description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {portfolioProjects[activeProject].tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-white px-4 py-2 rounded-full text-sm text-gray-700 shadow-sm border border-gray-200"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* <div className="pt-4">
              <button className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300">
                View Case Study
              </button>
            </div> */}
          </motion.div>
        </motion.div>

        {/* Project Navigation - Thumbnail List */}
        <div className="flex justify-center items-center gap-6 flex-wrap">
          {portfolioProjects.map((project, index) => (
            <motion.button
              key={project.id}
              onClick={() => setActiveProject(index)}
              className={`relative group ${
                activeProject === index ? 'ring-4 ring-purple-600' : ''
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-blue-600/40 to-transparent ${
                  activeProject === index ? 'opacity-30' : 'opacity-60 group-hover:opacity-40'
                } transition-opacity duration-300`} />
                
                {activeProject === index && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute inset-0 border-4 border-white rounded-2xl"
                  />
                )}
              </div>
              
              <div className="absolute bottom-2 left-2 right-2">
                <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg">
                  <p className="text-xs font-semibold text-gray-900 truncate">
                    {project.title}
                  </p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 mb-6 text-lg">
            Want to be our next success story?
          </p>
          <Link to="/contact">
            <button className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-10 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300">
              Start Your Project Today
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default PortfolioSection;