"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, MapPin, Phone, Sparkles, CheckCircle2, MessageSquare } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API request delay
    await new Promise((resolve) => setTimeout(resolve, 1200));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });

    // Reset success state after a few seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <main className="bg-[#FDFBF7] min-h-screen pt-24 md:pt-36 pb-20 font-sans text-[#3D2B1F] overflow-x-hidden">
      
      {/* Decorative Floating Accents */}
      <div className="absolute top-12 left-[-40px] w-64 h-64 bg-[#E2B4BD] opacity-20 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute top-1/3 right-[-60px] w-80 h-80 bg-[#8A9A5B] opacity-15 rounded-full blur-3xl pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        
        {/* --- HEADER SECTION --- */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-[#3D2B1F]/5 border border-[#3D2B1F]/10 text-[#3D2B1F] px-4 py-1.5 rounded-full text-[9px] uppercase tracking-widest font-black mb-4"
          >
            <Sparkles size={12} className="text-[#8A9A5B] animate-pulse" /> Direct Vault Enquiries
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-black text-[#3D2B1F] uppercase tracking-tighter italic leading-tight"
          >
            Connect With <span className="text-[#E2B4BD]">ChitraBeethi</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xs md:text-sm font-semibold text-[#5C4033]/80 uppercase tracking-wider mt-4 leading-relaxed"
          >
            Whether you are inquiring about a fine art acquisition, artist residency, or custom gallery commission, our curators are standing by.
          </motion.p>
        </div>

        {/* --- CONTENT GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT: Contact Info & Aesthetic Cards */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Direct Cards */}
            <div className="bg-[#F4EFE6] border-2 border-[#3D2B1F]/10 p-6 md:p-8 rounded-[32px] space-y-6">
              <h2 className="text-xl font-black uppercase tracking-tight text-[#3D2B1F] flex items-center gap-2">
                <MessageSquare size={18} className="text-[#8A9A5B]" /> Gallery Concierge
              </h2>
              
              <div className="space-y-5 text-sm font-medium">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#3D2B1F] text-[#FAECF0] rounded-2xl flex-shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-[#3D2B1F]/50">Inquiries & Vault Support</p>
                    <p className="text-[#3D2B1F] font-bold mt-0.5">curator@chitrabeethi.art</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#3D2B1F] text-[#FAECF0] rounded-2xl flex-shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-[#3D2B1F]/50">Gallery Desk</p>
                    <p className="text-[#3D2B1F] font-bold mt-0.5">+880 (17) 0000-0000</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#3D2B1F] text-[#FAECF0] rounded-2xl flex-shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-[#3D2B1F]/50">Physical Sanctuary</p>
                    <p className="text-[#3D2B1F] font-bold mt-0.5">ChitraBeethi Fine Art Hub, Dhaka, Bangladesh</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hours Box */}
            <div className="bg-[#EFF2E7] border-2 border-[#3D2B1F]/10 p-6 md:p-8 rounded-[32px]">
              <h3 className="text-sm font-black uppercase tracking-wider text-[#556B2F]">Curatorial Operating Hours</h3>
              <div className="mt-3 text-xs space-y-1.5 font-semibold text-[#3D2B1F]/80">
                <div className="flex justify-between">
                  <span>Saturday – Thursday:</span>
                  <span>10:00 AM – 8:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Friday:</span>
                  <span>Curatorial Hiatus (Closed)</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-7 bg-[#F9F6F0] border-2 border-[#3D2B1F] p-8 md:p-12 rounded-[40px] shadow-xl relative overflow-hidden"
          >
            {isSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-16 text-center space-y-4"
              >
                <CheckCircle2 size={48} className="mx-auto text-[#8A9A5B]" />
                <h3 className="text-2xl font-black text-[#3D2B1F] uppercase tracking-tight italic">Message Transmitted</h3>
                <p className="text-xs font-semibold text-[#5C4033] max-w-md mx-auto uppercase tracking-wider leading-relaxed">
                  Thank you for reaching out to ChitraBeethi. A representative from our team will evaluate your inquiry shortly.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#3D2B1F]">Your Full Name *</label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Zainul Abedin"
                      className="w-full bg-[#FDFBF7] border-2 border-[#3D2B1F]/20 focus:border-[#3D2B1F] rounded-2xl px-4 py-3.5 text-xs text-[#3D2B1F] placeholder-[#3D2B1F]/30 font-medium focus:outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#3D2B1F]">Email Address *</label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. collector@chitrabeethi.com"
                      className="w-full bg-[#FDFBF7] border-2 border-[#3D2B1F]/20 focus:border-[#3D2B1F] rounded-2xl px-4 py-3.5 text-xs text-[#3D2B1F] placeholder-[#3D2B1F]/30 font-medium focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[#3D2B1F]">Subject *</label>
                  <input 
                    type="text" 
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Artwork Acquisition Inquiry / Artist Submission"
                    className="w-full bg-[#FDFBF7] border-2 border-[#3D2B1F]/20 focus:border-[#3D2B1F] rounded-2xl px-4 py-3.5 text-xs text-[#3D2B1F] placeholder-[#3D2B1F]/30 font-medium focus:outline-none transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[#3D2B1F]">Message Detail *</label>
                  <textarea 
                    name="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Provide detailed information regarding your inquiry..."
                    className="w-full bg-[#FDFBF7] border-2 border-[#3D2B1F]/20 focus:border-[#3D2B1F] rounded-2xl p-4 text-xs text-[#3D2B1F] placeholder-[#3D2B1F]/30 font-medium focus:outline-none transition-all resize-none"
                  />
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#3D2B1F] text-[#E2B4BD] py-4 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] hover:bg-[#8A9A5B] hover:text-[#3D2B1F] active:scale-95 transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Transmitting...</span>
                  ) : (
                    <>
                      <Send size={14} /> Send Message To Curator
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

        </div>

      </div>
    </main>
  );
}