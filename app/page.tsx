"use client";

import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform, useMotionTemplate, useAnimationFrame, useMotionValue } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ScrollChoreography } from "@/components/ScrollChoreography";
import { SkillsBento } from "@/components/SkillsBento";
import { MeshParticles } from "@/components/MeshParticles";

export default function Home() {
  const [activeProject, setActiveProject] = useState(0);
  const [isHeroHovered, setIsHeroHovered] = useState(false);

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const blurVal = useTransform(heroScrollProgress, [0, 1], [0, 20]);
  const heroBlur = useMotionTemplate`blur(${blurVal}px)`;
  const heroOpacity = useTransform(heroScrollProgress, [0, 0.8], [1, 0]);

  const nameScale = useTransform(heroScrollProgress, [0, 1], [1, 1.8]);
  const nameOpacity = useTransform(heroScrollProgress, [0, 0.8], [1, 0]);

  const rotateX1 = useMotionValue(0);
  const rotateY1 = useMotionValue(0);
  const rotateY2 = useMotionValue(0);
  const rotateZ2 = useMotionValue(0);
  const rotateX3 = useMotionValue(0);
  const rotateZ3 = useMotionValue(0);

  useAnimationFrame((time) => {
    rotateX1.set(time * 0.01);
    rotateY1.set(time * 0.015);
    rotateY2.set(time * -0.008);
    rotateZ2.set(time * 0.005);
    rotateX3.set(time * 0.007);
    rotateZ3.set(time * -0.01);
  });

  const projects = [
    {
      id: 1,
      num: "01",
      title: "Storytelling App",
      category: "MOBILE DESIGN",
      url: "reality.design/storytelling-app",
      description: "A modern creative mobile platform that helps children craft custom adventures. Designed with rich card systems, organic rounded shapes, and vibrant illustration components.",
      image: "/images/project_storytelling.png",
      scale: 1.6,
      position: "center 42%",
    },
    {
      id: 2,
      num: "02",
      title: "Checkout Experience",
      category: "UI / PRODUCT",
      url: "reality.design/checkout-flow",
      description: "A sleek, gold-accented transactional interface designed for modern mobile checkout flows. Features custom floating credit card views, inline calculations, and high-fidelity 3D elements.",
      image: "/images/project_checkout.png",
      scale: 1.65,
      position: "center 48%",
    },
    {
      id: 3,
      num: "03",
      title: "Device Concept",
      category: "INDUSTRIAL DESIGN",
      url: "reality.design/device-nexus",
      description: "An exploration into future hardware minimalism. A futuristic smartphone device mockup showcasing a borderless display, rear vertical camera alignment, and sleek ceramic white casing.",
      image: "/images/project_device.png",
      scale: 1.5,
      position: "center 46%",
    },
    {
      id: 4,
      num: "04",
      title: "Dark UI System",
      category: "DESIGN SYSTEMS",
      url: "reality.design/aether-system",
      description: "A comprehensive UI system for data-heavy applications. Built with neon violet highlights, responsive chart widgets, and high-contrast dashboard states optimized for performance.",
      image: "/images/project_dark_ui.png",
      scale: 1.5,
      position: "center 44%",
    },
  ];

  const privacyToggles = [
    { label: "Ad Trackers", on: false },
    { label: "Cookies", on: false },
    { label: "Zero Bloat", on: true },
    { label: "Data Collection", on: false },
    { label: "Page Speed", on: true },
  ];

  // Refs for tracking scroll position of each project mockup card on the right
  const rightCardsRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-35% 0px -45% 0px", // Trigger when mockup cards are in the middle of viewport
      threshold: 0.2,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.getAttribute("data-index"));
          if (!isNaN(index)) {
            setActiveProject(index);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    rightCardsRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToProject = (index: number) => {
    setActiveProject(index);
    rightCardsRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-black text-white font-sans selection:bg-zinc-800">
        {/* Floating Pill Header */}
        <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/10 backdrop-blur-xl text-zinc-200 px-4 py-2 rounded-full flex items-center gap-5 shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-white/10"
          >
            {/* Logo icon */}
            <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center border border-white/20">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5C8.13 5 5 8.13 5 12V19H19V12C19 8.13 15.87 5 12 5Z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <nav className="flex items-center gap-5 text-[13px] font-medium text-zinc-300 tracking-wide">
              <a href="#" className="hover:text-white transition-colors drop-shadow-sm">What's New</a>
              <a href="#" className="hover:text-white transition-colors drop-shadow-sm">Security</a>
              <a href="#" className="hover:text-white transition-colors drop-shadow-sm">Introducing Reports</a>
            </nav>
          </motion.div>
        </div>

        {/* Hero Section */}
        <section
          ref={heroRef}
          className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center pt-32 pb-24 px-6 text-center"
          onMouseEnter={() => setIsHeroHovered(true)}
          onMouseLeave={() => setIsHeroHovered(false)}
        >
          {/* Stitch-like Background */}
          <div className="absolute inset-0 z-0 overflow-hidden select-none bg-black">
            {/* Three.js Mesh Particles */}
            <MeshParticles hovered={isHeroHovered} />
          </div>

          <motion.div style={{ filter: heroBlur, opacity: heroOpacity }} className="z-10 flex flex-col items-center justify-center w-full h-full max-w-5xl mx-auto will-change-[filter,opacity]">

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              style={{ scale: nameScale, opacity: nameOpacity }}
              className="font-[family-name:var(--font-orbitron)] text-7xl sm:text-[10rem] font-black tracking-[0.1em] text-white mb-6 origin-center uppercase"
            >
              Nitin <span className="text-zinc-650/50"></span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-2xl font-[family-name:var(--font-geist-mono)] text-[10px] sm:text-xs tracking-[0.3em] text-zinc-400 uppercase mb-16 leading-relaxed"
            >
              I craft digital experiences at the intersection of design and code — building products that are both beautiful and functional.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-12"
            >
              <a
                href="#work"
                className="px-6 py-3 border border-zinc-700 hover:border-zinc-400 text-zinc-400 hover:text-white font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.2em] transition-colors flex items-center justify-center gap-3 bg-black/20 backdrop-blur-sm"
              >
                View my work <span className="text-zinc-500">↓</span>
              </a>
              <a
                href="#about"
                className="px-6 py-3 border border-zinc-700 hover:border-zinc-400 text-zinc-400 hover:text-white font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.2em] transition-colors flex items-center justify-center gap-3 bg-black/20 backdrop-blur-sm"
              >
                About me
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="mt-6 text-cyan-500 animate-bounce"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </motion.div>
          </motion.div>
        </section>

        {/* Selected Work Section (Sticky Scroll Layout styled like Dia) */}
        <section id="work" className="py-24 bg-[#fafafa] text-black border-t border-zinc-200">
          <div className="max-w-7xl mx-auto px-6 sm:px-12">
            {/* Header */}
            <div className="text-center mb-20">
              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-black mb-4">
                Reality reads between the tabs
              </h2>
            </div>

            {/* Sticky Side-by-Side Content */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative">
              {/* Left Side Sticky Features */}
              <div className="lg:col-span-4 sticky top-32 flex flex-col gap-12 py-12 pb-[20vh]">
                {projects.map((project, idx) => {
                  const isActive = activeProject === idx;
                  return (
                    <div
                      key={project.id}
                      onClick={() => scrollToProject(idx)}
                      className="cursor-pointer group flex flex-col items-start transition-all duration-500"
                    >
                      {/* Active line indicator and feature content */}
                      <div className="flex gap-4">
                        {/* Vertical Indicator Bar */}
                        <div className="relative w-[2px] bg-zinc-200 self-stretch rounded-full overflow-hidden">
                          <motion.div
                            className="absolute top-0 left-0 right-0 bottom-0 bg-black origin-top"
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: isActive ? 1 : 0 }}
                            transition={{ duration: 0.3 }}
                          />
                        </div>

                        <div className="pl-2">
                          {/* Number */}
                          <span className={`text-xs font-semibold tracking-wider transition-colors duration-300 ${isActive ? "text-zinc-900" : "text-zinc-350"
                            }`}>
                            {project.num}
                          </span>

                          {/* Title */}
                          <h3 className={`font-serif text-xl sm:text-2xl font-bold tracking-tight mt-2 mb-4 transition-colors duration-300 ${isActive ? "text-black" : "text-zinc-400 group-hover:text-zinc-650"
                            }`}>
                            {project.title}
                          </h3>

                          {/* Description - only shown when active */}
                          <motion.div
                            initial={false}
                            animate={{
                              height: isActive ? "auto" : 0,
                              opacity: isActive ? 0.75 : 0,
                              marginTop: isActive ? 12 : 0
                            }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <p className="text-sm text-zinc-700 leading-relaxed max-w-sm">
                              {project.description}
                            </p>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right Side Scrollable Preview Windows */}
              <div className="lg:col-span-8 flex flex-col gap-28 py-12 pb-[20vh]">
                {projects.map((project, idx) => (
                  <div
                    key={project.id}
                    ref={(el) => { rightCardsRefs.current[idx] = el; }}
                    data-index={idx}
                    className="w-full bg-white rounded-2xl overflow-hidden shadow-[0_30px_80px_-15px_rgba(0,0,0,0.35)] border border-zinc-200/80 flex flex-col aspect-[16/11]"
                  >
                    {/* Browser Frame Top Bar */}
                    <div className="bg-[#f1f1f3] px-4 py-3 flex items-center gap-3 border-b border-zinc-200/50">
                      {/* Traffic lights */}
                      <div className="flex gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                      </div>
                      {/* Browser Address Bar */}
                      <div className="flex-1 bg-white rounded-lg py-1 px-3 text-[10px] text-zinc-400 flex items-center justify-center font-mono select-none">
                        <span>{project.url}</span>
                      </div>
                    </div>

                    {/* Browser Viewport displaying image */}
                    <div className="relative flex-1 bg-zinc-50 overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        style={{
                          transform: `scale(${project.scale || 1})`,
                          objectPosition: project.position || "center",
                        }}
                        className="object-cover"
                        priority
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Skills Bento Section */}
        <SkillsBento />

        {/* Privacy/Performance Section */}
        <section className="py-12 bg-[#fbfbfb] text-black border-t border-zinc-200 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 sm:px-12">
            {/* Dashed Border Container */}
            <div className="border border-dashed border-zinc-300 rounded-[2.5rem] px-8 py-10 sm:py-14 relative max-w-5xl mx-auto bg-transparent flex flex-col items-center text-center">

              {/* Top Lock Icon Badge */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#fbfbfb] px-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-zinc-500">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>

              {/* Title */}
              <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-black mb-10">
                Privacy first
              </h2>

              {/* Toggles Scrolling Row */}
              <div className="w-full overflow-hidden relative mb-10 py-1 select-none">
                {/* Fade Overlays */}
                <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                <motion.div
                  className="flex gap-4 w-max"
                  animate={{ x: [0, "-50%"] }}
                  transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: 20,
                  }}
                >
                  {/* Render the pills twice for seamless loop */}
                  {[...privacyToggles, ...privacyToggles].map((toggle, idx) => (
                    <div
                      key={idx}
                      className="bg-[#f4f4f5] px-3.5 py-1.5 rounded-full flex items-center gap-2.5 border border-zinc-200/40 text-xs sm:text-sm whitespace-nowrap"
                    >
                      <span className={`w-2 h-2 rounded-full ${toggle.on ? "bg-emerald-500" : "bg-amber-500"}`} />
                      <span className="text-zinc-650 font-medium">{toggle.label}</span>
                      <span className={`bg-white px-2 py-0.5 rounded-md text-[10px] font-bold shadow-sm border border-zinc-100 ${toggle.on ? "text-zinc-800" : "text-zinc-400"}`}>
                        {toggle.on ? "On" : "Off"}
                      </span>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Subtitle */}
              <h3 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-black mb-8">
                with you in control
              </h3>

              {/* Paragraph Description */}
              <p className="text-zinc-650 text-sm sm:text-base leading-relaxed max-w-2xl mb-10 font-light font-sans">
                I believe in a web that respects your privacy. This site collects zero analytics, sets no tracking cookies, and processes no personal data. Everything is designed to be lightweight and fast, delivering a premium experience without compromising your details.
              </p>

              {/* Button Link */}
              <a
                href="#about"
                className="px-6 py-3.5 bg-[#f3f4f6] hover:bg-zinc-200 text-zinc-800 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 flex items-center gap-1.5"
              >
                <span>Learn more about my stack</span>
                <span className="text-sm">→</span>
              </a>

              {/* Bottom Dome shape Badge */}
              <div className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 bg-[#fbfbfb] px-3">
                <svg width="24" height="12" viewBox="0 0 24 12" fill="none" className="text-zinc-300">
                  <path d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        <ScrollChoreography />
      </div>
    </SmoothScroll>
  );
}
