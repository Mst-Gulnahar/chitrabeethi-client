"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Sparkles, 
  Palette, 
  Compass, 
  Award, 
  ArrowUpRight, 
  Heart, 
  Brush, 
  ShieldCheck, 
  Users 
} from "lucide-react";

const VALUES = [
  {
    title: "Curated Excellence",
    desc: "Every painting, sculpture, and photograph undergo authentic verification to ensure museum-grade archival quality.",
    icon: Brush,
    accent: "bg-[#F5E6E8] text-[#A84A5B] border-[#A84A5B]"
  },
  {
    title: "Artist Empowerment",
    desc: "We bridge traditional fine artists with modern collectors, fostering a fair and direct ecosystem for creative growth.",
    icon: Users,
    accent: "bg-[#EFF2E7] text-[#556B2F] border-[#556B2F]"
  },
  {
    title: "Cultural Heritage",
    desc: "Honoring Bangladeshi visual arts while connecting global audiences to contemporary expression and folklore.",
    icon: Compass,
    accent: "bg-[#F4EFE6] text-[#B07D62] border-[#B07D62]"
  }
];

const STATS = [
  { value: "500+", label: "Verified Artworks" },
  { value: "120+", label: "Master Artists" },
  { value: "100%", label: "Authenticity Guaranteed" },
];

export default function AboutPage() {
  return (
    <main className="bg-[#FDFBF7] min-h-screen pt-32 md:pt-36 pb-20 overflow-x-hidden font-sans text-[#3D2B1F]">
      
      {/* --- HERO SECTION --- */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 text-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-[#E2B4BD]/20 border border-[#E2B4BD] text-[#3D2B1F] px-4 py-1.5 rounded-full text-[10px] md:text-xs uppercase tracking-widest font-black mb-6 shadow-sm"
        >
          <Sparkles size={13} className="text-[#A84A5B] animate-pulse" />
          <span>The Story Behind The Canvas</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-8xl font-black text-[#3D2B1F] uppercase tracking-tighter italic leading-tight"
        >
          About <span className="text-[#E2B4BD]">চিত্রবীথি</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xs sm:text-sm md:text-base text-[#5C4033] mt-6 max-w-2xl mx-auto font-bold uppercase tracking-wider leading-relaxed"
        >
          A sanctuary where imagination spills onto canvas. Uniting master craftspeople, contemporary visionaries, and art collectors in one refined gallery vault.
        </motion.p>
      </section>

      {/* --- MISSION / STORY GRID --- */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 mt-16 md:mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* ARTWORK DISPLAY FRAME */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-[40px] bg-[#F4EFE6] p-4 border-4 border-[#3D2B1F] shadow-[10px_10px_0px_#3D2B1F]">
              <div className="relative aspect-[4/5] rounded-[30px] overflow-hidden border-2 border-[#3D2B1F] bg-white">
                <img 
                  src="/hero.png" 
                  alt="Chitrabeethi Gallery Heritage" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-5 -right-5 bg-[#E2B4BD] border-2 border-[#3D2B1F] p-4 rounded-2xl shadow-[4px_4px_0px_#3D2B1F] flex items-center gap-3">
                <Award size={24} className="text-[#3D2B1F]" />
                <div>
                  <p className="text-[9px] font-black uppercase text-[#3D2B1F]/70">Estd.</p>
                  <p className="text-sm font-black text-[#3D2B1F]">2026 Fine Art Hub</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* MISSION TEXT BLOCK */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center gap-1.5 bg-[#8A9A5B]/10 border border-[#8A9A5B]/30 text-[#8A9A5B] px-3 py-1 rounded-full text-[9px] uppercase tracking-widest font-black">
              <Palette size={12} /> Our Vision
            </div>

            <h2 className="text-3xl md:text-5xl font-black text-[#3D2B1F] uppercase tracking-tighter leading-tight italic">
              Preserving <span className="text-[#8A9A5B]">Heritage</span>, Inspiring the <span className="text-[#E2B4BD]">Future</span>
            </h2>

            <p className="text-xs md:text-sm font-medium text-[#5C4033] leading-relaxed">
              Founded with a passion for visual storytelling, <strong>চিত্রবীথি (Chitrabeethi)</strong> serves as a bridge between rich artistic traditions and modern digital discovery. We believe that fine art is not merely decoration—it is a piece of human consciousness immortalized on canvas, paper, and stone.
            </p>

            <p className="text-xs md:text-sm font-medium text-[#5C4033] leading-relaxed">
              From delicate watercolors depicting idyllic rural life to bold modern acrylics and sculptures, our curated vault provides artists a platform to shine and collectors a trustworthy sanctuary to acquire certified masterpieces.
            </p>

            {/* QUICK STATS */}
            <div className="grid grid-cols-3 gap-3 md:gap-4 pt-4">
              {STATS.map((stat, i) => (
                <div key={i} className="bg-[#F4EFE6] border-2 border-[#3D2B1F] rounded-2xl p-4 text-center shadow-[3px_3px_0px_#3D2B1F]">
                  <div className="text-xl md:text-3xl font-black text-[#3D2B1F] italic">{stat.value}</div>
                  <div className="text-[8px] md:text-[10px] font-black text-[#5C4033] uppercase tracking-wider mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </section>

      {/* --- CORE PILLARS --- */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 mt-24">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-5xl font-black text-[#3D2B1F] uppercase tracking-tighter italic">
            Guiding <span className="text-[#E2B4BD]">Pillars</span>
          </h2>
          <p className="text-xs font-bold text-[#5C4033]/70 uppercase tracking-widest mt-2">
            The principles that define the Chitrabeethi experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {VALUES.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-[#FDFBF7] border-4 border-[#3D2B1F] rounded-[32px] p-8 shadow-[6px_6px_0px_#3D2B1F] flex flex-col justify-between hover:bg-[#F4EFE6] transition-all"
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl border-2 flex items-center justify-center mb-6 shadow-sm ${item.accent}`}>
                    <IconComp size={22} />
                  </div>
                  <h3 className="text-xl font-black text-[#3D2B1F] uppercase tracking-tight mb-3">
                    {item.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#5C4033]/80 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t-2 border-dashed border-[#3D2B1F]/10 flex items-center gap-1 text-[9px] font-black uppercase text-[#8A9A5B] tracking-widest">
                  <ShieldCheck size={12} /> Standard Verified
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* --- CALL TO ACTION --- */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 mt-24">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-[#3D2B1F] text-[#FAECF0] border-4 border-[#3D2B1F] rounded-[40px] p-8 md:p-14 shadow-[10px_10px_0px_#E2B4BD] flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tight italic">
              Ready to explore the <span className="text-[#E2B4BD]">Collection?</span>
            </h3>
            <p className="text-xs md:text-sm font-semibold text-[#FAECF0]/70 uppercase tracking-wider max-w-lg">
              Discover unique works from Bangladeshi visual creators or join us as an artist today.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/browse"
              className="bg-[#E2B4BD] text-[#3D2B1F] border-2 border-[#3D2B1F] px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest hover:bg-[#8A9A5B] hover:text-[#3D2B1F] transition-all shadow-[3px_3px_0px_#3D2B1F] flex items-center gap-2"
            >
              <span>Explore Gallery</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </motion.div>
      </section>

    </main>
  );
}