import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingBag, CreditCard, Settings, Check } from 'lucide-react';

export default function PricingSection() {
  const pricingPlans = [
    {
      icon: ShoppingBag,
      title: "Basic Store",
      subtitle: "Up to 20 products",
      price: "4,999",
      originalPrice: null,
      badge: null,
      badgeColor: null,
      savings: null,
      description: "Perfect for starting your online business",
      features: [
        "Up to 20 products",
        "Basic product management",
        "Mobile responsive design",
        "SSL certificate included",
        "Basic SEO optimization",
        "Email support"
      ],
      buttonText: "Get Started",
      cardColor: "from-indigo-900 to-purple-900"
    },
    {
      icon: CreditCard,
      title: "Standard Store",
      subtitle: "Payment gateway + Inventory",
      price: "9,999",
      originalPrice: "12,999",
      badge: "Most Popular",
      badgeColor: "bg-gradient-to-r from-purple-500 to-pink-500",
      savings: "3,000",
      description: "Best for growing businesses",
      features: [
        "Unlimited products",
        "Payment gateway integration",
        "Inventory management system",
        "Advanced SEO tools",
        "Analytics dashboard",
        "Priority email support",
        "Product reviews system",
        "Discount & coupon codes"
      ],
      buttonText: "Start Your Journey",
      cardColor: "from-indigo-800 to-purple-800"
    },
    {
      icon: Settings,
      title: "Advanced Store",
      subtitle: "Custom features & automation",
      price: "19,999",
      originalPrice: "24,999",
      badge: "Best Value",
      badgeColor: "bg-gradient-to-r from-blue-500 to-purple-500",
      savings: "5,000",
      description: "Complete e-commerce solution",
      features: [
        "Everything in Standard",
        "Custom feature development",
        "Marketing automation tools",
        "Email marketing integration",
        "Multi-currency support",
        "Advanced analytics & reports",
        "Priority phone support",
        "CRM integration",
        "Social media integration",
        "Dedicated account manager"
      ],
      buttonText: "Subscribe & Save",
      cardColor: "from-indigo-900 to-purple-900"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-20 px-8">
      <div className="container mx-auto">
        {/* Heading Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="text-gray-700">Choose Your</span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              E-commerce Plan
            </span>
          </h2>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
            Premium e-commerce solutions crafted for your business growth
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto"
        >
          {pricingPlans.map((plan, index) => {
            const IconComponent = plan.icon;
            const isPopular = index === 1;

            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                className="relative"
              >
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className={`${plan.badgeColor} text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg flex items-center space-x-2`}>
                      <span>👑</span>
                      <span>{plan.badge}</span>
                    </div>
                  </div>
                )}

                {/* Card with Gradient Border */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="relative rounded-3xl p-1 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 shadow-2xl h-full"
                >
                  <div className="bg-white rounded-3xl p-8 h-full flex flex-col relative overflow-hidden">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-100 opacity-20 rounded-full -mr-16 -mt-16"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-100 opacity-20 rounded-full -ml-12 -mb-12"></div>

                    {/* Icon */}
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 relative z-10 shadow-lg"
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.title}</h3>
                    <p className="text-gray-600 text-sm mb-6">{plan.subtitle}</p>

                    {/* Price */}
                    <div className="mb-6">
                      <div className="flex items-baseline space-x-2">
                        <span className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">₹{plan.price}</span>
                        {plan.originalPrice && (
                          <span className="text-gray-400 line-through text-xl">₹{plan.originalPrice}</span>
                        )}
                      </div>
                      {plan.savings && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.5, type: "spring" }}
                          className="inline-block mt-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-md"
                        >
                          🔥 Save ₹{plan.savings}
                        </motion.div>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-6">{plan.description}</p>

                    {/* Features */}
                    <div className="space-y-3 mb-8 flex-grow">
                      {plan.features.map((feature, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="flex items-start space-x-3"
                        >
                          <div className="bg-gradient-to-r from-blue-400 to-purple-400 rounded-full p-1 mt-0.5 flex-shrink-0">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Button */}
                    <Link to="/contact">
                      <motion.button
                        whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(168, 85, 247, 0.4)" }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold py-4 rounded-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center space-x-2"
                      >
                        <span>{plan.buttonText}</span>
                        <span>→</span>
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}