import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle, X, MessageCircle } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null
  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('http://localhost:5000/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' }); // Reset form
        // Close modal after 2 seconds on success
        setTimeout(() => {
          setShowModal(false);
          setSubmitStatus(null);
        }, 2000);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit form');
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenModal = () => {
    setShowModal(true);
    setSubmitStatus(null);
    setFormData({ name: '', email: '', phone: '', message: '' }); // Reset form
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSubmitStatus(null);
  };
  return (
    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
      
      {/* Left Card - Contact Info */}
      <div
        className="p-8 rounded-2xl shadow-xl relative overflow-hidden"
        style={{
          background: `
            linear-gradient(135deg, 
              rgba(135, 206, 235, 0.4) 0%, 
              rgba(70, 130, 180, 0.3) 50%, 
              rgba(30, 144, 255, 0.2) 100%
            )
          `,
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
        }}
      >
        {/* Decorative elements */}
        <div 
          className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, transparent 70%)",
            transform: "translate(50%, -50%)"
          }}
        ></div>
        <div 
          className="absolute bottom-0 left-0 w-24 h-24 rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%)",
            transform: "translate(-50%, 50%)"
          }}
        ></div>

        <h2 className="text-3xl font-bold mb-8 text-black relative z-10">Get in Touch</h2>

        <div className="space-y-6 relative z-10">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-white/20 backdrop-blur-sm border border-black transition-all duration-300 hover:bg-white/30">
            <div className="p-2 rounded-lg bg-black">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-black font-medium">+91 98765 43210</p>
              <p className="text-sm text-gray-600">Call us anytime</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 p-4 rounded-xl bg-white/20 backdrop-blur-sm border border-black transition-all duration-300 hover:bg-white/30">
            <div className="p-2 rounded-lg bg-black">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-black font-medium">support@yourcrm.com</p>
              <p className="text-sm text-gray-600">Email us your queries</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 p-4 rounded-xl bg-white/20 backdrop-blur-sm border border-black transition-all duration-300 hover:bg-white/30">
            <div className="p-2 rounded-lg bg-black">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-black font-medium">Mumbai, India</p>
              <p className="text-sm text-gray-600">Visit our office</p>
            </div>
          </div>

          {/* Contact Form Button */}
          <div className="pt-4">
            <button
              onClick={handleOpenModal}
              className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
            >
              <MessageCircle className="w-5 h-5" />
              Send us a Message
            </button>
          </div>
        </div>
      </div>
      {/* Right Side - Contact Form */}
      <div
        className="p-8 rounded-2xl shadow-xl"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(135, 206, 235, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 70% 60%, rgba(147, 51, 234, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(236, 72, 153, 0.25) 0%, transparent 50%),
            rgba(239, 68, 68, 0.1)
          `,
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <h2 className="text-3xl font-bold mb-6 text-gray-900 text-center">
          Get in Touch
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Success/Error Messages */}
          {submitStatus === 'success' && (
            <div className="p-4 rounded-lg bg-green-100 border border-green-300 text-green-800 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>Message sent successfully! We'll get back to you soon.</span>
            </div>
          )}
          
          {submitStatus === 'error' && (
            <div className="p-4 rounded-lg bg-red-100 border border-red-300 text-red-800">
              <span>Failed to send message. Please try again or contact us directly.</span>
            </div>
          )}

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Your name"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="you@example.com"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="+91 98765 43210"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message *
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows="5"
              placeholder="Your message..."
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80"
              required
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send Message
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
