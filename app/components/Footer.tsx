"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, Sparkles, Heart, Palette, Mail, User, LayoutDashboard, Compass } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const MotionLink = motion.create(Link);

export default function Footer() {
  const { user } = useAuth();
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [hoveredSocial, setHoveredSocial] = useState<number | null>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 4000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  // Helper to determine dynamic dashboard route based on user role
  const getDashboardPath = () => {
    if (!user) return "/login";
    if (user.role === "admin") return "/dashboard/admin";
    if (user.role === "artist") return "/dashboard/artist";
    return "/dashboard/user";
  };

  const socialLinks = [
    { name: "Twitter", emoji: "🎨", href: "https://twitter.com" },
    { name: "Instagram", emoji: "🖼️", href: "https://instagram.com" },
    { name: "Discord", emoji: "🖌️", href: "https://discord.com" },
    { name: "Pinterest", emoji: "✨", href: "https://pinterest.com" },
  ];

  const titleLetters = "Chitra".split("");
  const titleAccentLetters = "Beethi".split("");

  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const letterVariants = {
    initial: { y: 0 },
    animate: {
      y: [0, -5, 0],
      transition: {
        duration: 1.8,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  } as const;

  // Wave morphing paths for animated liquid top edge
  const wavePath1 = "M0,64 C280,120 420,10 700,64 C980,118 1120,20 1200,64 L1200,120 L0,120 Z";
  const wavePath2 = "M0,40 C320,10 480,110 720,50 C960,-10 1150,90 1200,40 L1200,120 L0,120 Z";

  return (
    <footer className="relative w-full bg-[#3D2B1F] text-[#FDFBF7] pb-8 pt-12 select-none mt-20 overflow-visible font-sans selection:bg-[#8A9A5B] selection:text-[#FDFBF7]">
      
      {/* 🧼 THE ANIMATED MILKSHAKE WAVE RIDGE */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] h-[70px] -translate-y-[68px] pointer-events-none">
        <svg 
          className="relative block w-full h-full text-[#3D2B1F]" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
        >
          <motion.path 
            fill="currentColor"
            animate={{ d: [wavePath1, wavePath2, wavePath1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </div>

      {/* ☁️ Soft Decorative Accents */}
      <motion.div 
        animate={{ y: [0, -6, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-12 left-[10%] w-8 h-8 rounded-full bg-[#8A9A5B]/20 blur-[1px] hidden sm:block pointer-events-none"
      />
      <motion.div 
        animate={{ y: [0, -10, 0], scale: [1, 0.95, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -top-16 right-[12%] w-12 h-12 rounded-full bg-[#FDFBF7]/10 blur-[2px] hidden sm:block pointer-events-none"
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* MAIN BODY LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-10 border-b border-[#FDFBF7]/15 items-center">
          
          {/* Brand Info & Animated Bouncy Title */}
          <div className="lg:col-span-4 flex flex-col items-start gap-2.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8A9A5B]/20 border border-[#8A9A5B]/30 text-[10px] font-bold tracking-wider text-[#8A9A5B]">
              <Sparkles className="w-3 h-3 text-[#8A9A5B]" /> Curated Art Sanctuary
            </div>
            
            <motion.h3 
              className="text-3xl font-serif font-bold tracking-wide text-[#FDFBF7] flex flex-wrap cursor-default select-none"
              variants={containerVariants}
              initial="initial"
              animate="animate"
            >
              <span className="flex mr-1.5">
                {titleLetters.map((letter, index) => (
                  <motion.span key={index} variants={letterVariants} className="inline-block">
                    {letter}
                  </motion.span>
                ))}
              </span>
              <span className="flex text-[#8A9A5B]">
                {titleAccentLetters.map((letter, index) => (
                  <motion.span key={index} variants={letterVariants} className="inline-block">
                    {letter}
                  </motion.span>
                ))}
              </span>
            </motion.h3>

            <p className="text-xs font-light leading-relaxed text-[#FDFBF7]/75 max-w-sm">
              Connecting passionate collectors with independent artists. Discover original artworks, gallery creations, and cozy creative spirits.
            </p>
          </div>

          {/* Navigation Capsules */}
          <div className="lg:col-span-4 flex flex-col gap-3 items-start lg:items-center">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#FDFBF7]/50 flex items-center gap-1">
              <Compass className="w-3 h-3 text-[#8A9A5B]" /> Explore Gallery
            </span>
            <div className="flex flex-wrap gap-2 max-w-xs justify-start lg:justify-center">
              
              {/* 1. Browse Artworks */}
              <MotionLink
                href="/browse"
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="text-xs font-medium text-[#3D2B1F] bg-[#FDFBF7] hover:bg-[#8A9A5B] hover:text-[#FDFBF7] px-3.5 py-1.5 rounded-full shadow-sm transition-colors cursor-pointer inline-flex items-center gap-1"
              >
                <Palette className="w-3.5 h-3.5" />
                Browse Artworks
              </MotionLink>

              {/* 2. Contact */}
              <MotionLink
                href="/contact"
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="text-xs font-medium text-[#3D2B1F] bg-[#FDFBF7] hover:bg-[#8A9A5B] hover:text-[#FDFBF7] px-3.5 py-1.5 rounded-full shadow-sm transition-colors cursor-pointer inline-flex items-center gap-1"
              >
                <Mail className="w-3.5 h-3.5" />
                Contact
              </MotionLink>

              {/* 3. Dynamic Auth Link */}
              {user ? (
                <MotionLink
                  href="/profile"
                  whileHover={{ scale: 1.08, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="text-xs font-medium text-[#3D2B1F] bg-[#FDFBF7] hover:bg-[#8A9A5B] hover:text-[#FDFBF7] px-3.5 py-1.5 rounded-full shadow-sm transition-colors cursor-pointer inline-flex items-center gap-1"
                >
                  <User className="w-3.5 h-3.5" />
                  {user.name || "My Account"}
                </MotionLink>
              ) : (
                <>
                  <MotionLink
                    href="/login"
                    whileHover={{ scale: 1.08, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="text-xs font-medium text-[#3D2B1F] bg-[#FDFBF7] hover:bg-[#8A9A5B] hover:text-[#FDFBF7] px-3.5 py-1.5 rounded-full shadow-sm transition-colors cursor-pointer inline-flex items-center gap-1"
                  >
                    Sign In
                  </MotionLink>
                  <MotionLink
                    href="/register"
                    whileHover={{ scale: 1.08, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="text-xs font-medium text-[#3D2B1F] bg-[#FDFBF7] hover:bg-[#8A9A5B] hover:text-[#FDFBF7] px-3.5 py-1.5 rounded-full shadow-sm transition-colors cursor-pointer inline-flex items-center gap-1"
                  >
                    Register
                  </MotionLink>
                </>
              )}

              {/* 4. Dynamic Dashboard Link */}
              {user && (
                <MotionLink
                  href={getDashboardPath()}
                  whileHover={{ scale: 1.08, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="text-xs font-medium text-[#FDFBF7] bg-[#8A9A5B] hover:bg-[#8A9A5B]/80 px-3.5 py-1.5 rounded-full shadow-sm transition-colors cursor-pointer inline-flex items-center gap-1"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  {user.role ? `${user.role.toUpperCase()}` : "Dashboard"}
                </MotionLink>
              )}

            </div>
          </div>

          {/* Quick Newsletter & Social Bar */}
          <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center gap-3">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#FDFBF7]/50 lg:text-right w-full">
              Art Collector Newsletter
            </span>
            
            <form onSubmit={handleSubscribe} className="w-full max-w-sm">
              <div className="relative flex items-center">
                <input
                  type="email"
                  required
                  placeholder="Enter your email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#FDFBF7]/10 border border-[#FDFBF7]/20 rounded-full px-4 py-2 pr-28 text-xs text-[#FDFBF7] placeholder-[#FDFBF7]/50 focus:outline-none focus:border-[#8A9A5B] transition-all font-light"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 px-3.5 bg-[#8A9A5B] text-[#FDFBF7] rounded-full text-xs font-bold hover:bg-[#8A9A5B]/90 transition-all flex items-center gap-1"
                >
                  {isSubscribed ? "Joined ✨" : "Subscribe"}
                </button>
              </div>
            </form>

            {/* Bubbly Social Buttons */}
            <div className="flex flex-row items-center gap-2.5 mt-1">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setHoveredSocial(index)}
                  onMouseLeave={() => setHoveredSocial(null)}
                  whileHover={{ 
                    scale: 1.15,
                    borderRadius: "40% 60% 60% 40% / 40% 40% 60% 60%"
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 18 }}
                  className="w-9 h-9 rounded-full bg-[#FDFBF7]/10 hover:bg-[#8A9A5B] text-[#FDFBF7] flex items-center justify-center relative shadow-sm border border-[#FDFBF7]/10 text-xs font-semibold cursor-pointer transition-colors"
                  title={social.name}
                >
                  <span>{social.name.charAt(0)}</span>

                  <AnimatePresence>
                    {hoveredSocial === index && (
                      <motion.span
                        initial={{ opacity: 0, y: 5, scale: 0.3 }}
                        animate={{ opacity: 1, y: -28, scale: 1.2 }}
                        exit={{ opacity: 0, y: -35, scale: 0.5 }}
                        transition={{ duration: 0.2 }}
                        className="absolute text-sm pointer-events-none filter drop-shadow-sm z-20"
                      >
                        {social.emoji}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.a>
              ))}
            </div>

          </div>

        </div>

        {/* BOTTOM UTILITY ROW */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-[10px] font-light text-[#FDFBF7]/70 flex items-center flex-wrap justify-center gap-1 text-center sm:text-left">
            <span>&copy; {currentYear} ChitraBeethi Gallery.</span>
            <span className="flex items-center gap-1">
              Bubbly & crafted with <Heart className="w-2.5 h-2.5 fill-[#8A9A5B] text-[#8A9A5B]" /> for art lovers.
            </span>
          </div>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center gap-1.5 px-4 py-1.5 bg-[#FDFBF7] hover:bg-[#8A9A5B] text-[#3D2B1F] hover:text-[#FDFBF7] font-bold text-[10px] uppercase rounded-full shadow-sm transition-colors"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3 h-3 stroke-[3] group-hover:-translate-y-0.5 transition-transform" />
          </motion.button>
        </div>

      </div>
    </footer>
  );
}