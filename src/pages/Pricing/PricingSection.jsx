import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import { 
  DollarSign, 
  Check, 
  User, 
  BarChart3, 
  Mail, 
  TrendingUp, 
  Link, 
  MessageCircle, 
  Star, 
  Infinity, 
  Bot, 
  Users, 
  Rocket, 
  Brain, 
  Shield, 
  Settings, 
  Tag, 
  UserCheck, 
  Phone 
} from 'lucide-react';
import ComparisonTable from './ComparisonTable';

const AnimatedCounter = ({ value, duration = 0.5 }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const startValue = displayValue;
    const endValue = value;
    const startTime = Date.now();

    const updateCounter = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.round(startValue + (endValue - startValue) * easeOutCubic);
      
      setDisplayValue(currentValue);
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    };

    updateCounter();
  }, [value, duration]);

  return <span>{displayValue}</span>;
};

const PricingCard = ({ 
  planName, 
  monthlyPrice, 
  yearlyPrice, 
  billingCycle, 
  colorScheme, 
  isPopular = false, 
  isCustom = false, 
  features, 
  delay 
}) => {
  const colorClasses = {
    sky: {
      glowSpread: 'from-sky-400/40 via-sky-300/20 to-transparent',
      darkSquare: 'bg-sky-800',
      glowColor: 'rgba(56, 189, 248, 0.6)',
      innerGlow: 'bg-sky-400',
      button: 'bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 shadow-lg hover:shadow-sky-500/25',
      text: 'text-sky-600'
    },
    purple: {
      glowSpread: 'from-purple-400/40 via-purple-300/20 to-transparent',
      darkSquare: 'bg-purple-800',
      glowColor: 'rgba(168, 85, 247, 0.6)',
      innerGlow: 'bg-purple-400',
      button: 'bg-black hover:from-black  hover:to-black shadow-lg hover:shadow-purple-500/25',
      text: 'text-purple-600'
    },
    pink: {
      glowSpread: 'from-pink-400/40 via-pink-300/20 to-transparent',
      darkSquare: 'bg-pink-800',
      glowColor: 'rgba(236, 72, 153, 0.6)',
      innerGlow: 'bg-pink-400',
      button: 'bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 shadow-lg hover:shadow-pink-500/25',
      text: 'text-pink-600'
    }
  };

  const colors = colorClasses[colorScheme];
  const currentPrice = billingCycle === 'monthly' ? monthlyPrice : yearlyPrice;

  return (
    
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="relative group"
    >
      {isPopular ? (
        <div className="relative p-[2px] rounded-2xl bg-gradient-to-r from-sky-400 via-purple-500 to-pink-500 shadow-2xl hover:shadow-3xl transition-all duration-500">
          <div className="relative rounded-2xl bg-white/80 backdrop-blur-lg shadow-inner hover:bg-white/90 transition-all duration-300 overflow-hidden">
            <div className="relative p-8 h-full">
              {/* Glowing blur spread effect from top left */}
              <div className={`absolute -top-8 -left-8 w-40 h-40 bg-gradient-radial ${colors.glowSpread} rounded-full blur-3xl opacity-30`} />
              <div className={`absolute top-0 left-0 w-24 h-24 bg-gradient-radial ${colors.glowSpread} rounded-full blur-xl opacity-20`} />
              
              {/* Popular badge */}
              {isPopular && (
                <div className="absolute -top-0 left-1/2 transform -translate-x-1/2 z-20">
                  <span className="bg-gradient-to-r from-sky-500 via-purple-500 to-pink-500 text-white text-xs px-4 py-1 rounded-full font-medium shadow-lg backdrop-blur-sm">
                    POPULAR
                  </span>
                </div>
              )}

              {/* Top left square with premium glow effect */}
              <div className="relative mb-8 z-10">
                <div className={`w-8 h-8 ${colors.darkSquare} rounded-md relative`} 
                     style={{ 
                       boxShadow: `0 0 20px ${colors.glowColor}, 0 4px 15px rgba(0,0,0,0.2), inset 0 1px 2px rgba(255,255,255,0.2), inset 0 -1px 2px rgba(0,0,0,0.3)` 
                     }} 
                >
                  {/* Inner glow */}
                  <div className={`absolute inset-0.5 ${colors.innerGlow} rounded-sm opacity-60`} />
                </div>
              </div>

              {/* Plan name */}
              <h3 className="text-xl font-bold text-gray-900 mb-3 relative z-10">{planName}</h3>

              {/* Pricing */}
              <div className="mb-8 relative z-10">
                {isCustom ? (
                  <div className="text-4xl font-bold bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
                    Custom
                  </div>
                ) : (
                  <div className="flex items-baseline">
                    <span className="text-2xl font-bold text-gray-900">$</span>
                    <span className="text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent">
                      <AnimatedCounter value={currentPrice} />
                    </span>
                    <span className="text-gray-600 ml-2 font-medium">
                      /{billingCycle === 'monthly' ? 'month' : 'year'}
                    </span>
                  </div>
                )}
              </div>

              {/* CTA Button */}
              <RouterLink to="/contact">
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 mb-8 relative z-10 ${
                    isCustom ? 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 shadow-lg hover:shadow-gray-500/25' : colors.button
                  }`}
                >
                  {isCustom ? 'Contact Us' : 'Start Now'}
                </motion.button>
              </RouterLink>

              {/* Features */}
              <div className="space-y-5 relative z-10">
                <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider">
                  STANDOUT FEATURES
                </h4>
                <div className="space-y-4">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: delay + 0.2 + index * 0.05 }}
                      className="flex items-start gap-3 group"
                    >
                      <span className="mt-1 group-hover:scale-110 transition-transform duration-200 text-gray-600">
                        {feature.icon}
                      </span>
                      <span className="text-gray-700 text-sm leading-relaxed font-medium">{feature.text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative rounded-2xl bg-white/80 backdrop-blur-lg shadow-xl hover:shadow-2xl hover:bg-white/90 transition-all duration-500 overflow-hidden border border-white/20">
          <div className="relative p-8 h-full">
            {/* Glowing blur spread effect from top left */}
            <div className={`absolute -top-8 -left-8 w-40 h-40 bg-gradient-radial ${colors.glowSpread} rounded-full blur-3xl opacity-30`} />
            <div className={`absolute top-0 left-0 w-24 h-24 bg-gradient-radial ${colors.glowSpread} rounded-full blur-xl opacity-20`} />
            
            {/* Top left square with premium glow effect */}
            <div className="relative mb-8 z-10">
              <div className={`w-8 h-8 ${colors.darkSquare} rounded-md relative`} 
                   style={{ 
                     boxShadow: `0 0 20px ${colors.glowColor}, 0 4px 15px rgba(0,0,0,0.2), inset 0 1px 2px rgba(255,255,255,0.2), inset 0 -1px 2px rgba(0,0,0,0.3)` 
                   }} 
              >
                {/* Inner glow */}
                <div className={`absolute inset-0.5 ${colors.innerGlow} rounded-sm opacity-60`} />
              </div>
            </div>

            {/* Plan name */}
            <h3 className="text-xl font-bold text-gray-900 mb-3 relative z-10">{planName}</h3>

            {/* Pricing */}
            <div className="mb-8 relative z-10">
              {isCustom ? (
                <div className="text-4xl font-bold bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
                  Custom
                </div>
              ) : (
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold text-gray-900">$</span>
                  <span className="text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent">
                    <AnimatedCounter value={currentPrice} />
                  </span>
                  <span className="text-gray-600 ml-2 font-medium">
                    /{billingCycle === 'monthly' ? 'month' : 'year'}
                  </span>
                </div>
              )}
            </div>

            {/* CTA Button */}
            <RouterLink to="/contact">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 mb-8 relative z-10 ${
                  isCustom ? 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 shadow-lg hover:shadow-gray-500/25' : colors.button
                }`}
              >
                {isCustom ? 'Contact Us' : 'Start Now'}
              </motion.button>
            </RouterLink>

            {/* Features */}
            <div className="space-y-5 relative z-10">
              <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider">
                STANDOUT FEATURES
              </h4>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: delay + 0.2 + index * 0.05 }}
                    className="flex items-start gap-3 group"
                  >
                    <span className="mt-1 group-hover:scale-110 transition-transform duration-200 text-gray-600">
                      {feature.icon}
                    </span>
                    <span className="text-gray-700 text-sm leading-relaxed font-medium">{feature.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

const PricingSection = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');

  return (
        <>
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-20 px-6 relative overflow-hidden">
      {/* Background subtle patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,_rgba(120,119,198,0.05),_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_rgba(236,72,153,0.05),_transparent_50%)]" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          {/* Label with Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-sky-100 to-purple-100 px-4 py-2 rounded-full mb-6"
          >
            <DollarSign className="w-4 h-4 text-sky-600" />
            <span className="text-sm font-medium text-gray-700 uppercase tracking-wider">
              Pricing
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Plans and Pricing
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto mb-10"
          >
            Choose a plan that fits your investment goals, whether you're just starting
            or scaling your portfolio.
          </motion.p>

          {/* Billing Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="inline-flex items-center bg-gray-100 rounded-lg p-1 mb-12"
          >
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`relative px-6 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                billingCycle === 'monthly'
                  ? 'text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {billingCycle === 'monthly' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-sky-400 to-purple-500 rounded-md"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">Bill Monthly</span>
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`relative px-6 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                billingCycle === 'yearly'
                  ? 'text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {billingCycle === 'yearly' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-sky-400 to-purple-500 rounded-md"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">Bill Annually</span>
            </button>
          </motion.div>
        </motion.div>

        {/* Pricing Cards Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {/* Starter Plan Card */}
          <PricingCard
            planName="Starter Plan"
            monthlyPrice={49}
            yearlyPrice={490}
            billingCycle={billingCycle}
            colorScheme="sky"
            features={[
              { icon: <User className="w-4 h-4" />, text: "Lead management" },
              { icon: <BarChart3 className="w-4 h-4" />, text: "Contact storage (up to 2,000)" },
              { icon: <Mail className="w-4 h-4" />, text: "Email/SMS notifications" },
              { icon: <TrendingUp className="w-4 h-4" />, text: "Basic dashboard & reporting" },
              { icon: <Link className="w-4 h-4" />, text: "1 integration (WhatsApp, Gmail)" },
              { icon: <MessageCircle className="w-4 h-4" />, text: "Standard support" }
            ]}
            delay={0.5}
          />

          {/* Professional Plan Card */}
          <PricingCard
            planName="Professional Plan"
            monthlyPrice={99}
            yearlyPrice={990}
            billingCycle={billingCycle}
            colorScheme="purple"
            isPopular={true}
            features={[
              { icon: <Star className="w-4 h-4" />, text: "Everything in Starter +" },
              { icon: <Infinity className="w-4 h-4" />, text: "Unlimited contacts" },
              { icon: <BarChart3 className="w-4 h-4" />, text: "Pipeline & sales tracking" },
              { icon: <Bot className="w-4 h-4" />, text: "Marketing automation" },
              { icon: <Link className="w-4 h-4" />, text: "Multiple integrations (ERP, e-commerce)" },
              { icon: <Users className="w-4 h-4" />, text: "Team collaboration tools" },
              { icon: <Rocket className="w-4 h-4" />, text: "Priority support" }
            ]}
            delay={0.6}
          />

          {/* Enterprise Plan Card */}
          <PricingCard
            planName="Enterprise Plan"
            isCustom={true}
            billingCycle={billingCycle}
            colorScheme="pink"
            features={[
              { icon: <Star className="w-4 h-4" />, text: "Everything in Professional +" },
              { icon: <Brain className="w-4 h-4" />, text: "Advanced analytics & AI insights" },
              { icon: <Shield className="w-4 h-4" />, text: "Role-based access control" },
              { icon: <Settings className="w-4 h-4" />, text: "API & custom integrations" },
              { icon: <Tag className="w-4 h-4" />, text: "White-label solution" },
              { icon: <UserCheck className="w-4 h-4" />, text: "Dedicated account manager" },
              { icon: <Phone className="w-4 h-4" />, text: "24/7 premium support" }
            ]}
            delay={0.7}
          />
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600">
            Start your journey risk-free • No credit card needed
          </p>
        </motion.div>
      </div>
    </div>


    

    <ComparisonTable />
    </>
  );
};

export default PricingSection;