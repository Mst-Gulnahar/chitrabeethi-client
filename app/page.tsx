"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Eye, 
  Plus, 
  Loader2, 
  Inbox, 
  Sparkles, 
  Trophy, 
  ArrowUpRight, 
  Grid, 
  Sparkle,
  Palette,
  ShieldCheck,
  MessageCircle,
  Compass,
  Heart,
  ChevronDown
} from "lucide-react";
import ArtStickerStudio from "./components/ArtStickerStudio";

interface ArtworkData {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  img: string;
  tag: string;
  status: "available" | "sold" | "unpublished";
}

interface ArtistData {
  _id: string;
  name: string;
  email: string;
  profilePicture?: string;
}

const CARD_BG_COLORS = [
  "bg-[#F4EFE6]", 
  "bg-[#F5E6E8]", 
  "bg-[#EFF2E7]", 
  "bg-[#F9F6F0]", 
];

const BUBBLE_CATEGORIES = [
  { name: "All Art", bg: "bg-[#FDFBF7]", text: "text-[#3D2B1F]", border: "border-[#3D2B1F]", hoverBg: "hover:bg-[#3D2B1F] hover:text-[#FDFBF7]" },
  { name: "Painting", bg: "bg-[#F5E6E8]", text: "text-[#A84A5B]", border: "border-[#A84A5B]", hoverBg: "hover:bg-[#A84A5B] hover:text-[#FAECF0]" },
  { name: "Acrylic Art", bg: "bg-[#F4EFE6]", text: "text-[#B07D62]", border: "border-[#B07D62]", hoverBg: "hover:bg-[#B07D62] hover:text-[#FDFBF7]" },
  { name: "Sculpture", bg: "bg-[#EFF2E7]", text: "text-[#556B2F]", border: "border-[#556B2F]", hoverBg: "hover:bg-[#556B2F] hover:text-[#EFF2E7]" },
  { name: "Photography", bg: "bg-[#EAE6DF]", text: "text-[#4A5568]", border: "border-[#4A5568]", hoverBg: "hover:bg-[#4A5568] hover:text-[#EAE6DF]" }
];

export function ExtraGallerySections() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "Are all artworks on the platform certified originals?",
      a: "Yes! Every piece in our gallery comes directly from verified artist studios. Every listing includes a digital certificate of authenticity backed by our vault index.",
      icon: Palette
    },
    {
      q: "How are fragile physical pieces delivered?",
      a: "Artists package physical canvases using museum-grade shockproof layering, corner protectors, and moisture barriers to guarantee safe arrival.",
      icon: ShieldCheck
    },
    {
      q: "Can I interact with the artists before acquiring a piece?",
      a: "Absolutely! You can leave direct comments on canvas discussion threads, explore artist profiles, or follow their studio updates in real time.",
      icon: MessageCircle
    }
  ];

  const steps = [
    {
      step: "01",
      title: "Explore the Vault",
      desc: "Discover handpicked original paintings, textured mixed media, and limited physical crafts from independent creators.",
      icon: Compass,
      color: "bg-[#8A9A5B]"
    },
    {
      step: "02",
      title: "Secure Your Piece",
      desc: "Acquire certified original listings through our direct, encrypted transaction engine with zero hassle.",
      icon: ShieldCheck,
      color: "bg-[#E2B4BD]"
    },
    {
      step: "03",
      title: "Join the Dialogue",
      desc: "Verified collectors unlock thread commenting, leaving feedback notes and connecting with fellow enthusiasts.",
      icon: Heart,
      color: "bg-[#8A9A5B]"
    }
  ];

  return (
    <div className="w-full space-y-24 sm:space-y-36 my-20 sm:my-32 overflow-hidden">
      
      {/* ================= SECTION 1: INTERACTIVE FAQ ================= */}
      <section className="max-w-4xl mx-auto w-full px-4 relative">
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-72 h-72 bg-[#8A9A5B]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center mb-10 sm:mb-12 relative z-10">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.25em] text-[#8A9A5B] bg-[#8A9A5B]/10 px-3.5 py-1.5 rounded-full border border-[#8A9A5B]/20 shadow-sm"
          >
            <Sparkles size={11} /> Curiosity Vault
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-[#3D2B1F] mt-3 font-sans"
          >
            Frequently Asked Questions
          </motion.h2>
        </div>

        <div className="space-y-3 sm:space-y-4 relative z-10">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            const IconComponent = faq.icon;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`rounded-[1.8rem] sm:rounded-[2.2rem] border transition-all duration-300 overflow-hidden ${
                  isOpen 
                    ? "bg-[#FDFBF7] border-[#8A9A5B] shadow-lg shadow-[#8A9A5B]/10" 
                    : "bg-[#3D2B1F]/5 border-[#3D2B1F]/5 hover:bg-[#3D2B1F]/[0.07]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 outline-none group"
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`p-2.5 rounded-2xl transition-colors shrink-0 ${
                      isOpen ? "bg-[#8A9A5B] text-[#FDFBF7]" : "bg-[#3D2B1F]/10 text-[#3D2B1F]"
                    }`}>
                      <IconComponent size={16} />
                    </div>
                    <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#3D2B1F] group-hover:text-[#8A9A5B] transition-colors">
                      {faq.q}
                    </h3>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className={`p-1.5 rounded-full shrink-0 ${
                      isOpen ? "bg-[#8A9A5B]/10 text-[#8A9A5B]" : "text-[#3D2B1F]/40"
                    }`}
                  >
                    <ChevronDown size={18} />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-3 text-xs sm:text-sm font-medium opacity-80 leading-relaxed text-[#3D2B1F] pl-14 sm:pl-16 border-t border-[#3D2B1F]/5">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ================= SECTION 2: ANIMATED MOTIVE MANIFESTO ================= */}
      <section className="max-w-5xl mx-auto w-full px-4 text-center relative">
        <motion.div 
          whileHover={{ scale: 1.01, y: -4 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="relative p-8 sm:p-16 rounded-[2.5rem] sm:rounded-[3.5rem] bg-[#3D2B1F] text-[#FDFBF7] shadow-2xl overflow-hidden border border-[#FDFBF7]/10"
        >
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.15, 0.25, 0.15],
              x: [0, 20, 0]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 right-0 w-80 h-80 bg-[#8A9A5B] rounded-full blur-[80px] pointer-events-none" 
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.15, 0.3, 0.15],
              y: [0, -20, 0]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-0 left-0 w-80 h-80 bg-[#E2B4BD] rounded-full blur-[80px] pointer-events-none" 
          />

          <span className="absolute top-4 left-6 text-7xl sm:text-9xl font-serif text-[#FDFBF7]/5 pointer-events-none select-none">
            “
          </span>

          <div className="relative z-10 flex flex-col items-center">
            <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.25em] text-[#E2B4BD] bg-[#E2B4BD]/10 px-4 py-1.5 rounded-full border border-[#E2B4BD]/20 shadow-inner">
              Our Motive & Manifesto
            </span>

            <h2 className="text-2xl sm:text-5xl font-black uppercase tracking-tight text-[#FDFBF7] mt-6 leading-tight max-w-3xl font-sans">
              "Earth without art is just <span className="text-[#E2B4BD] font-serif italic lowercase underline decoration-[#8A9A5B] decoration-2 underline-offset-8">'eh'</span>."
            </h2>

            <p className="text-xs sm:text-sm font-medium text-[#FDFBF7]/80 max-w-xl mx-auto mt-6 leading-relaxed">
              We created this space to bridge the gap between creative storytellers and passionate collectors. Art isn't just decoration—it's standard soul food for the everyday visual voyager.
            </p>

            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="mt-8 inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-[#FDFBF7]/10 backdrop-blur-md border border-[#FDFBF7]/10 shadow-sm cursor-pointer"
            >
              <div className="w-2 h-2 rounded-full bg-[#8A9A5B] animate-ping" />
              <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-[#E2B4BD]">
                Built with heart & canvas
              </span>
              <div className="w-2 h-2 rounded-full bg-[#8A9A5B]" />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ================= SECTION 3: INTERACTIVE HOW IT WORKS ================= */}
      <section className="max-w-5xl mx-auto w-full px-4">
        <div className="text-center mb-10 sm:mb-14">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.25em] text-[#8A9A5B] bg-[#8A9A5B]/10 px-3.5 py-1.5 rounded-full border border-[#8A9A5B]/20"
          >
            Seamless Journey
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-[#3D2B1F] mt-3 font-sans"
          >
            How The Gallery Works
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {steps.map((s, i) => {
            const IconComp = s.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, type: "spring", stiffness: 150 }}
                whileHover={{ y: -8 }}
                className="group p-6 sm:p-8 rounded-[2.2rem] bg-[#3D2B1F]/5 hover:bg-[#FDFBF7] border border-[#3D2B1F]/5 hover:border-[#8A9A5B]/30 transition-all duration-300 shadow-none hover:shadow-xl hover:shadow-[#3D2B1F]/5 flex flex-col items-center text-center relative overflow-hidden"
              >
                <div className={`absolute top-0 left-0 right-0 h-1.5 ${s.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                <div className="relative mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-[#3D2B1F] text-[#FDFBF7] font-black text-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                    <IconComp size={22} className="text-[#E2B4BD]" />
                  </div>
                  <span className={`absolute -bottom-2 -right-2 ${s.color} text-[#3D2B1F] font-black text-[10px] px-2 py-0.5 rounded-full shadow-sm`}>
                    {s.step}
                  </span>
                </div>

                <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#3D2B1F] group-hover:text-[#8A9A5B] transition-colors">
                  {s.title}
                </h3>

                <p className="text-[11px] font-medium opacity-70 group-hover:opacity-90 mt-2.5 leading-relaxed text-[#3D2B1F]">
                  {s.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default function Home() {
  const router = useRouter();
  const [artworks, setArtworks] = useState<ArtworkData[]>([]);
  const [artists, setArtists] = useState<ArtistData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isArtistsLoading, setIsArtistsLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  useEffect(() => {
    const fetchHomeArtworks = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/artworks`);
        const json = await response.json();
        
        if (json.success) {
          const rawList = json.artworks || json.data || [];
          const secureClone = [...rawList];
          
          for (let i = secureClone.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [secureClone[i], secureClone[j]] = [secureClone[j], secureClone[i]];
          }
          
          setArtworks(secureClone.slice(0, 6));
        }
      } catch (error) {
        console.error("Error connecting to Chitrabeethi Vault Base:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchTopArtists = async () => {
      try {
        setIsArtistsLoading(true);
        let response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/artists?limit=5`);
        if (response.status === 404) {
          response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/users?role=artist&limit=5`);
        }
        const json = await response.json();
        if (json.success && (json.data?.length || json.users?.length || json.artists?.length)) {
          setArtists(json.data || json.users || json.artists);
        } else {
          setArtists([
            { _id: "65f1a2b3c4d5e6f7a8b9c001", name: "Zainul Abedin", email: "zainul@arthub.com", profilePicture: "https://api.dicebear.com/7.x/initials/svg?seed=Zainul&background=E2B4BD&color=3D2B1F" },
            { _id: "65f1a2b3c4d5e6f7a8b9c002", name: "Shahabuddin Ahmed", email: "shahabuddin@arthub.com", profilePicture: "https://api.dicebear.com/7.x/initials/svg?seed=Shahabuddin&background=EFF2E7&color=3D2B1F" },
            { _id: "65f1a2b3c4d5e6f7a8b9c003", name: "S M Sultan", email: "smsultan@arthub.com", profilePicture: "https://api.dicebear.com/7.x/initials/svg?seed=Sultan&background=F4EFE6&color=3D2B1F" }
          ]);
        }
      } catch (error) {
        console.error("Artist profile endpoint parameters unmapped, running fallbacks:", error);
        setArtists([
          { _id: "65f1a2b3c4d5e6f7a8b9c001", name: "Zainul Abedin", email: "zainul@arthub.com", profilePicture: "https://api.dicebear.com/7.x/initials/svg?seed=Zainul&background=E2B4BD&color=3D2B1F" },
          { _id: "65f1a2b3c4d5e6f7a8b9c002", name: "Shahabuddin Ahmed", email: "shahabuddin@arthub.com", profilePicture: "https://api.dicebear.com/7.x/initials/svg?seed=Shahabuddin&background=EFF2E7&color=3D2B1F" },
          { _id: "65f1a2b3c4d5e6f7a8b9c003", name: "S M Sultan", email: "smsultan@arthub.com", profilePicture: "https://api.dicebear.com/7.x/initials/svg?seed=Sultan&background=F4EFE6&color=3D2B1F" }
        ]);
      } finally {
        setIsArtistsLoading(false);
      }
    };

    fetchHomeArtworks();
    fetchTopArtists();
  }, []);

  useEffect(() => {
    if (artists.length <= 1 || isHovered) return;
    const rotationTimer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % artists.length);
    }, 3000);
    return () => clearInterval(rotationTimer);
  }, [artists, isHovered]);

  const filteredArtworks = React.useMemo(() => {
    if (selectedCategory === "All") return artworks;
    return artworks.filter(art => art.category?.toLowerCase() === selectedCategory.toLowerCase());
  }, [artworks, selectedCategory]);

  const handleCategoryRedirect = (categoryName: string) => {
    const targetQuery = categoryName === "All Art" ? "All" : categoryName;
    router.push(`/browse?category=${encodeURIComponent(targetQuery)}`);
  };

  const getStackedCardLayout = (offset: number) => {
    if (artists.length === 0) return null;
    const targetIdx = (currentIndex + offset + artists.length) % artists.length;
    return { artist: artists[targetIdx], positionOffset: offset };
  };

  const currentCardsStack = [
    getStackedCardLayout(-1), 
    getStackedCardLayout(0),  
    getStackedCardLayout(1),  
  ].filter(Boolean);

  return (
    <main className="bg-[#FDFBF7] min-h-screen pt-20 md:pt-32 pb-20 overflow-x-hidden font-sans text-[#3D2B1F]">
      
      {/* --- HERO SECTION --- */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 md:px-10 overflow-hidden">
        <div className="absolute top-10 -left-10 md:-left-24 w-40 md:w-64 h-64 select-none pointer-events-none z-0">
          <div className="relative w-full h-full">
            <div className="absolute top-0 left-0 w-32 h-32 md:w-80 md:h-80 bg-[#e2b4bd] opacity-20 rounded-full" />
            <div className="absolute top-6 left-6 w-24 h-24 md:w-60 md:h-60 bg-[#5C4033] opacity-20 rounded-full shadow-lg" />
            <div className="absolute top-48 left-16 md:top-60 md:left-24 w-16 h-16 md:w-44 md:h-44 bg-[#8A9A5B] opacity-10 rounded-full" />
          </div>
        </div>

        <div className="absolute top-[15%] -right-16 md:top-[20%] md:right-0 w-64 md:w-120 h-auto md:h-150 select-none pointer-events-none z-0">
          <div className="relative h-full w-full flex items-center justify-end">
            <div className="absolute w-80 h-64 md:w-120 md:h-96 lg:w-160 lg:h-160 bg-[#5C4033] opacity-10 rounded-full translate-x-1/2" />
            <div className="absolute w-64 h-64 md:w-[320px] md:h-[320px] lg:w-[500px] lg:h-[500px] bg-[#8A9A5B] opacity-20 rounded-full translate-x-[52%]" />
            <div className="absolute w-48 h-48 md:w-[240px] md:h-[240px] lg:w-[320px] lg:h-[320px] bg-[#5C4033] opacity-100 rounded-full shadow-2xl translate-x-[58%] border-2 md:border-4 border-[#E2B4BD]" />

            <motion.img 
              initial={{ opacity: 0, x: 20, rotate: -90 }}
              animate={{ opacity: 1, x: 0, rotate: -90 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              src="/cherry-blossom.png" 
              alt="Lotus Bloom Accent"
              className="absolute right-[-40px] md:right-[-140px] lg:right-[-180px] w-[250px] md:w-[450px] lg:w-[600px] scale-75 md:scale-100 object-contain z-20 drop-shadow-[-20px_0px_30px_rgba(0,0,0,0.15)] opacity-40"
            />
          </div>
        </div>

        <div className="text-center z-10 flex flex-col items-center w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="relative">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-48 md:h-48 bg-[#3D2B1F] rounded-full -z-10 shadow-[0_0_80px_rgba(61,43,31,0.4)] border border-white/5" />
            <h1 className="text-[50px] sm:text-[100px] md:text-[220px] font-bold text-[#e2b4bd] leading-none select-none tracking-tighter drop-shadow-2xl font-sans pt-18 pb-8">
              চিত্রবীথি
            </h1>
            <div className="flex flex-col items-center mt-[-5px] md:mt-[-20px]">
              <p className="text-lg md:text-3xl tracking-[0.8em] md:tracking-[1.2em] font-black text-[#3D2B1F] uppercase border-t-[2px] md:border-t-[4px] border-[#3D2B1F] pt-6 md:pt-4 leading-none">
                ArtHub
              </p>
              <p className="text-[8px] md:text-[11px] tracking-[0.3em] md:tracking-[0.6em] text-[#5C4033] uppercase mt-4 md:mt-6 font-bold opacity-70">
                 CHITRABEETHI • THE FINE ART GALLERY — ESTD 2026
              </p>
            </div>
          </motion.div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 mt-12 z-20 relative w-full max-w-7xl lg:-ml-32">
          <motion.div animate={{ y: [0, -25, 0], rotate: [0, 1, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="flex-shrink-0">
            <div className="relative group">
              <div className="w-[280px] h-[280px] md:w-[480px] md:h-[480px] lg:w-[580px] lg:h-[580px] bg-white/10 backdrop-blur-xl rounded-full border-[6px] md:border-[10px] border-[#3D2B1F]/10 flex items-center justify-center overflow-hidden">
                <img src="/hero.png" alt="Main Gallery Exhibition" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
              </div>
            </div>
          </motion.div>

          <div className="max-w-md lg:text-left text-center px-4">
            <h2 className="text-[#3D2B1F] text-3xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9] italic">
              The Soul of The <br /> 
              <span className="text-[#E2B4BD]">Canvas</span>
            </h2>
            <p className="text-[10px] md:text-sm text-[#5C4033] mt-4 md:mt-6 uppercase tracking-[0.15em] md:tracking-[0.2em] font-bold leading-relaxed">
              Reality is a lie meant for the living. Die a little to the world, and let your wildest imagination spill onto the canvas.
            </p>
            <div className="mt-6 md:mt-8 flex flex-wrap gap-3 md:gap-4 justify-center lg:justify-start">
              <button 
                onClick={() => router.push('/browse')}
                className="bg-[#3D2B1F] text-[#E2B4BD] text-[9px] md:text-[10px] py-3 md:py-4 px-8 md:px-10 rounded-full uppercase tracking-widest font-black hover:bg-[#8A9A5B] hover:text-[#3D2B1F] transition-all duration-300 shadow-xl cursor-pointer"
              >
                Browse Artworks
              </button>
              <button 
                onClick={() => router.push('/about')}
                className="border-2 border-[#3D2B1F] text-[#3D2B1F] text-[9px] md:text-[10px] py-3 md:py-4 px-8 md:px-10 rounded-full uppercase tracking-widest font-black hover:bg-[#3D2B1F] hover:text-[#E2B4BD] transition-all duration-300"
              >
                Our Story
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- STICKY FILTER NAVIGATION BAR --- */}
      <div className="sticky top-0 z-50 w-full py-6 md:py-10 flex flex-col items-center justify-center bg-[#FDFBF7]/95 backdrop-blur-lg border-b border-[#3D2B1F]/10">
        <div className="bg-[#3D2B1F] p-1.5 md:p-2 rounded-full flex gap-1 shadow-lg max-w-full overflow-x-auto scrollbar-none">
          {["All", "Painting", "Acrylic Art", "Sculpture", "Photography"].map((cat) => (
            <button 
              key={cat} 
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 md:px-8 py-2.5 md:py-3 rounded-full text-[9px] md:text-[10px] uppercase tracking-[0.15em] md:tracking-[0.2em] font-black transition-all duration-500 cursor-pointer whitespace-nowrap
              ${selectedCategory === cat 
                ? 'bg-[#E2B4BD] text-[#3D2B1F] scale-105 shadow-xl' 
                : 'bg-transparent text-[#E2B4BD]/60 hover:text-white hover:bg-white/5'}`}
            >
              {cat}
            </button>
          ))}
        </div>
        {selectedCategory !== "All" && (
          <button
            onClick={() => handleCategoryRedirect(selectedCategory)}
            className="text-[9px] font-black tracking-widest text-[#8A9A5B] uppercase mt-3 hover:underline cursor-pointer flex items-center gap-1 animate-pulse"
          >
            Open filter collection in Browse view <ArrowUpRight size={10} />
          </button>
        )}
      </div>

      {/* --- ARTWORK SHOWCASE DYNAMIC GRID --- */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 mt-16">
        <div className="mb-10 text-center md:text-left">
          <h2 className="text-2xl md:text-4xl font-black text-[#3D2B1F] uppercase tracking-tighter italic">
            Featured <span className="text-[#8A9A5B]">Artworks</span>
          </h2>
          <p className="text-[10px] md:text-xs text-[#5C4033]/70 font-bold uppercase tracking-widest mt-1">
            Handpicked premium dynamic exhibition assets live from DB core
          </p>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-3 text-[#3D2B1F]/60">
            <Loader2 className="animate-spin" size={32} />
            <p className="text-xs uppercase font-black tracking-widest">Unlocking the Art Vault...</p>
          </div>
        ) : filteredArtworks.length === 0 ? (
          <div className="bg-[#3D2B1F]/5 border-3 border-dashed border-[#3D2B1F]/20 rounded-[40px] py-24 text-center">
            <Inbox className="mx-auto text-[#3D2B1F]/20 mb-4" size={40} />
            <p className="text-xs font-black uppercase tracking-widest text-[#3D2B1F]/50">No fine artworks found in this collection category</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 mt-8">
              <AnimatePresence mode="popLayout">
                {filteredArtworks.map((art, index) => {
                  const bgColor = CARD_BG_COLORS[index % CARD_BG_COLORS.length];
                  const productUrl = `/product-details/${art._id}`;

                  return (
                    <motion.div
                      key={art._id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className={`rounded-[32px] p-5 flex flex-col justify-between border-2 border-[#3D2B1F]/10 shadow-sm hover:shadow-xl hover:border-[#3D2B1F] transition-all group ${bgColor}`}
                    >
                      <div>
                        <div className="relative aspect-square w-full rounded-2xl overflow-hidden border-2 border-[#3D2B1F] bg-white shadow-inner">
                          <img src={art.img} alt={art.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                          <span className="absolute top-3 left-3 bg-[#3D2B1F] text-[#FAECF0] text-[8px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-md border border-white/10">
                            {art.tag || art.category}
                          </span>
                        </div>
                        <div className="mt-5 space-y-1.5">
                          <h3 className="text-[#3D2B1F] font-black text-lg uppercase tracking-tight line-clamp-1 group-hover:text-[#8A9A5B] transition-colors">
                            {art.name}
                          </h3>
                          <p className="text-[11px] font-medium text-[#5C4033]/80 tracking-wide line-clamp-2 leading-relaxed">
                            {art.description || "Finished with premium museum archive glazing. Includes custom Certificate of Authenticity."}
                          </p>
                        </div>
                      </div>

                      <div className="mt-6 space-y-3">
                        <div className="flex items-center justify-between border-b-2 border-[#3D2B1F]/10 pb-2.5 mb-1">
                          <span className="text-[9px] font-black uppercase tracking-widest text-[#3D2B1F]/50">Investment Value</span>
                          <span className="text-[#3D2B1F] font-black text-xl italic font-sans">৳{art.price.toLocaleString()}</span>
                        </div>

                        {art.status !== "sold" ? (
                          <button 
                            type="button" 
                            onClick={() => router.push(productUrl)}
                            className="w-full bg-[#3D2B1F] text-[#FAECF0] py-3 rounded-2xl flex items-center justify-center gap-2 hover:bg-[#8A9A5B] hover:text-[#3D2B1F] transition-all active:scale-95 shadow-sm font-black uppercase text-[10px] tracking-widest cursor-pointer"
                          >
                            <Plus size={14} strokeWidth={3} />
                            <span>Acquire Artwork</span>
                          </button>
                        ) : (
                          <div className="w-full bg-[#8A3324]/10 text-[#8A3324] border border-[#8A3324]/20 py-3 rounded-2xl flex items-center justify-center gap-2 font-black uppercase text-[10px] tracking-widest select-none cursor-not-allowed">
                            Unavailable / Sold out
                          </div>
                        )}
                        
                        <Link href={productUrl} className="w-full border-2 border-[#3D2B1F]/20 text-[#3D2B1F] py-3 rounded-2xl flex items-center justify-center gap-2 hover:bg-[#3D2B1F] hover:text-white transition-all uppercase text-[9px] font-black tracking-[0.2em]">
                          <Eye size={14} /> Inspect Details
                        </Link>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            <div className="flex justify-center mt-16">
              <Link href="/browse" className="inline-flex items-center justify-center border-2 border-[#3D2B1F] bg-transparent text-[#3D2B1F] text-[10px] md:text-[11px] font-black uppercase tracking-[0.25em] py-4 px-12 rounded-full hover:bg-[#3D2B1F] hover:text-[#E2B4BD] transition-all duration-300 shadow-sm hover:shadow-lg active:scale-95">
                View More Artworks
              </Link>
            </div>
          </>
        )}
      </section>

      {/* --- ARTIST LEADERBOARD SLIDER --- */}
      <section className="w-full py-24 bg-[#FAECF0]/30 border-t border-b border-[#3D2B1F]/5 mt-24">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 bg-[#8A9A5B]/10 border border-[#8A9A5B]/20 text-[#8A9A5B] px-3 py-1 rounded-full text-[9px] uppercase tracking-widest font-black">
                <Sparkles size={11} className="animate-pulse" /> Platform Vanguard
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-[#3D2B1F] uppercase tracking-tighter leading-none italic">
                Top Performing <span className="text-[#E2B4BD]">Artists</span>
              </h2>
              <p className="text-xs font-semibold text-[#5C4033]/70 uppercase tracking-wider">
                The revolutionary creative entities driving platform volume. Hover to pause switching.
              </p>
            </div>
          </div>

          {isArtistsLoading ? (
            <div className="flex flex-col items-center justify-center py-12 gap-2 text-[#3D2B1F]/60">
              <Loader2 className="animate-spin" size={24} />
              <p className="text-[9px] uppercase font-black tracking-widest">Sorting leaderboard tiers...</p>
            </div>
          ) : (
            <div className="relative flex items-center justify-center w-full min-h-[400px] select-none" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
              <div className="relative w-full max-w-[340px] md:max-w-[420px] h-full flex items-center justify-center">
                <AnimatePresence mode="popLayout">
                  {currentCardsStack.map((cardConfig) => {
                    if (!cardConfig) return null;
                    const { artist, positionOffset } = cardConfig;
                    const isCenterCard = positionOffset === 0;
                    const bgIdx = artists.indexOf(artist) % CARD_BG_COLORS.length;
                    const cardBgColor = CARD_BG_COLORS[bgIdx];

                    let zIndex = 10; let rotationDeg = 0; let scaleAmount = 0.85; let opacityValue = 0.4;
                    if (isCenterCard) {
                      zIndex = 30; scaleAmount = 1; opacityValue = 1;
                    } else if (positionOffset === -1) {
                      zIndex = 20; rotationDeg = -6; scaleAmount = 0.9; opacityValue = 0.7;
                    } else if (positionOffset === 1) {
                      zIndex = 20; rotationDeg = 6; scaleAmount = 0.9; opacityValue = 0.7;
                    }

                    return (
                      <motion.div
                        key={artist._id}
                        style={{ zIndex }}
                        initial={{ opacity: 0, scale: 0.8, x: positionOffset * 50 }}
                        animate={{ 
                          opacity: opacityValue, 
                          scale: scaleAmount, 
                          rotate: rotationDeg,
                          x: typeof window !== 'undefined' && window.innerWidth < 768 ? `${positionOffset * 35}%` : `${positionOffset * 55}%`
                        }}
                        exit={{ opacity: 0, scale: 0.7, y: 30 }}
                        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                        className={`absolute w-full rounded-[40px] p-8 border-2 ${isCenterCard ? 'border-[#3D2B1F] shadow-2xl' : 'border-[#3D2B1F]/10 shadow-md'} flex flex-col items-center text-center group transition-shadow ${cardBgColor}`}
                      >
                        <div className="absolute top-5 right-5 flex items-center gap-1 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full border border-[#3D2B1F]/10">
                          <Trophy size={11} className="text-[#D4AF37]" />
                          <span className="text-[8px] font-black uppercase text-[#3D2B1F]/60">Top Artist</span>
                        </div>
                        <div className="w-24 h-24 rounded-full border-2 border-[#3D2B1F] p-1 bg-white overflow-hidden group-hover:scale-105 transition-all duration-500">
                          <img src={artist.profilePicture || `https://api.dicebear.com/7.x/initials/svg?seed=${artist.name}&background=E2B4BD&color=3D2B1F`} alt={artist.name} className="w-full h-full object-cover rounded-full bg-[#3D2B1F]/5" />
                        </div>
                        <div className="mt-5 space-y-1">
                          <h3 className="text-[#3D2B1F] font-black text-lg uppercase tracking-tight group-hover:text-[#8A9A5B] transition-colors line-clamp-1">{artist.name}</h3>
                          <p className="text-[10px] font-semibold text-[#3D2B1F]/40 tracking-tight lowercase line-clamp-1">{artist.email}</p>
                        </div>
                        <button disabled={!isCenterCard} onClick={() => router.push(`/profile/artist/${artist._id}`)} className={`w-full mt-6 bg-[#3D2B1F] text-[#FAECF0] py-3 rounded-xl font-black uppercase text-[9px] tracking-widest transition-all ${isCenterCard ? 'hover:bg-[#8A9A5B] hover:text-[#3D2B1F] cursor-pointer' : 'opacity-40 cursor-default'}`}>
                          View Artist's Collection
                        </button>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* --- COLOR PALETTE CATEGORIES HUB --- */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-24 text-center">
        <div className="mb-12">
          <div className="inline-flex items-center gap-1.5 bg-[#3D2B1F]/5 border border-[#3D2B1F]/10 text-[#3D2B1F] px-3 py-1 rounded-full text-[9px] uppercase tracking-widest font-black mb-3">
            <Grid size={11} /> System Taxonomies
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-[#3D2B1F] uppercase tracking-tighter leading-none italic">
            Explore By <span className="text-[#E2B4BD]">Archetype</span>
          </h2>
          <p className="text-xs font-semibold text-[#5C4033]/70 uppercase tracking-wider mt-2 max-w-md mx-auto">
            Select a specialized catalog filter below to wander through our curated index archives.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 max-w-4xl mx-auto mt-6">
          {BUBBLE_CATEGORIES.map((cat) => (
            <motion.button
              key={cat.name}
              whileHover={{ scale: 1.06, rotate: [-1, 1, -1][cat.name.length % 3] }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCategoryRedirect(cat.name)}
              className={`px-8 py-5 rounded-[24px] border-2 ${cat.border} ${cat.bg} ${cat.text} ${cat.hoverBg} text-xs md:text-sm font-black uppercase tracking-[0.18em] transition-all duration-300 shadow-sm hover:shadow-md flex items-center gap-3 cursor-pointer`}
            >
              <Sparkle size={14} className="opacity-70 group-hover:rotate-45 transition-transform" />
              {cat.name}
              <ArrowUpRight size={14} className="opacity-60" />
            </motion.button>
          ))}
        </div>
      </section>

      <ArtStickerStudio />

      <ExtraGallerySections />
    </main>
  );
}