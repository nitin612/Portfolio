"use client";

import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform, useMotionTemplate, useAnimationFrame, useMotionValue } from "framer-motion";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [activeProject, setActiveProject] = useState(0);

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
    <div className="min-h-screen bg-black text-white font-sans selection:bg-zinc-800">
      {/* Floating Pill Header */}
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/90 backdrop-blur-md text-black px-4 py-2 rounded-full flex items-center gap-5 shadow-[0_10px_35px_rgba(0,0,0,0.05)] border border-zinc-200/80"
        >
          {/* Logo icon */}
          <div className="w-7 h-7 rounded-full bg-black flex items-center justify-center">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5C8.13 5 5 8.13 5 12V19H19V12C19 8.13 15.87 5 12 5Z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <nav className="flex items-center gap-5 text-[13px] font-semibold text-zinc-650 tracking-tight">
            <a href="#" className="hover:text-black transition-colors">What's New</a>
            <a href="#" className="hover:text-black transition-colors">Security</a>
            <a href="#" className="hover:text-black transition-colors">Introducing Reports</a>
          </nav>
        </motion.div>
      </div>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center pt-32 pb-24 px-6 text-center">
        {/* Background Rotating 3D Elements */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
          {/* Element 1: Large Glowing Ring */}
          <motion.div
            style={{ rotateX: rotateX1, rotateY: rotateY1, transformStyle: "preserve-3d", perspective: 1000 }}
            className="absolute top-[10%] left-[10%] sm:left-[15%] w-64 h-64 sm:w-96 sm:h-96 rounded-full border border-white/[0.03] shadow-[0_0_50px_rgba(120,119,198,0.03)]"
          />
          {/* Element 2: Medium Dashed Ring */}
          <motion.div
            style={{ rotateY: rotateY2, rotateZ: rotateZ2, transformStyle: "preserve-3d", perspective: 1000 }}
            className="absolute bottom-[15%] right-[5%] sm:right-[10%] w-80 h-80 sm:w-[450px] sm:h-[450px] rounded-full border border-dashed border-zinc-800/25"
          />
          {/* Element 3: Futuristic Glassmorphic Orb */}
          <motion.div
            style={{ rotateX: rotateX3, rotateZ: rotateZ3, transformStyle: "preserve-3d", perspective: 1000 }}
            className="absolute top-[35%] right-[15%] sm:right-[20%] w-40 h-40 sm:w-56 sm:h-56 rounded-3xl border border-white/[0.02] bg-white/[0.01] backdrop-blur-[1px] shadow-[inset_0_0_20px_rgba(255,255,255,0.02)]"
          />
        </div>

        <motion.div style={{ filter: heroBlur, opacity: heroOpacity }} className="z-10 flex flex-col items-center justify-center w-full h-full max-w-5xl mx-auto will-change-[filter,opacity]">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[10px] sm:text-xs font-semibold tracking-[0.25em] text-zinc-500 uppercase mb-6"
          >
            DESIGNER & DEVELOPER
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{ scale: nameScale, opacity: nameOpacity }}
            className="font-serif text-7xl sm:text-9xl font-semibold tracking-tight text-white mb-8 origin-center"
          >
            Nitin <span className="text-zinc-650">.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-xl text-base sm:text-lg text-zinc-400 leading-relaxed font-sans mb-12 font-light"
          >
            I craft digital experiences at the intersection of design and code — building products that are both beautiful and functional.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href="#work"
              className="px-8 py-3.5 bg-white hover:bg-zinc-200 text-black rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 shadow-lg shadow-white/5 flex items-center justify-center gap-2"
            >
              <span>View my work</span>
              <span className="text-xs">↓</span>
            </a>
            <a
              href="#about"
              className="px-8 py-3.5 border border-zinc-800 hover:border-zinc-600 text-zinc-400 hover:text-white rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300"
            >
              About me
            </a>
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

      {/* Feature Grid Section (Dia Style) */}
      <section className="py-24 bg-[#fafafa] text-black border-t border-zinc-200">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          {/* Section Heading */}
          <div className="text-center mb-20">
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-black">
              Built for how you actually work
            </h2>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Card 1: Decks (Wider) */}
            <div className="md:col-span-7 bg-[#f5f5f7] rounded-3xl p-8 sm:p-12 flex flex-col justify-between overflow-hidden relative group border border-zinc-200/20 md:min-h-[500px]">
              <div>
                <span className="px-4 py-1.5 bg-white rounded-full text-xs font-semibold text-zinc-700 shadow-sm inline-block mb-6">
                  Decks
                </span>
                <p className="text-zinc-650 text-sm sm:text-base leading-relaxed max-w-md font-sans">
                  Ask Dia for a deck and your scattered context becomes real slides — headers, layout, and flow you can present without a redesign.
                </p>
              </div>
              <div className="relative w-full h-[240px] mt-8 rounded-2xl overflow-hidden shadow-lg border border-zinc-200/50 translate-y-4 group-hover:translate-y-2 transition-transform duration-500">
                <Image
                  src="/images/feature_decks.png"
                  alt="Decks Feature mockup"
                  fill
                  className="object-cover object-top"
                />
              </div>
            </div>

            {/* Card 2: Live Work (Narrower) */}
            <div className="md:col-span-5 bg-[#f5f5f7] rounded-3xl p-8 sm:p-12 flex flex-col justify-between overflow-hidden relative group border border-zinc-200/20 md:min-h-[500px]">
              <div>
                <span className="px-4 py-1.5 bg-white rounded-full text-xs font-semibold text-zinc-700 shadow-sm inline-block mb-6">
                  Live Work
                </span>
                <p className="text-zinc-655 text-sm sm:text-base leading-relaxed max-w-md font-sans">
                  Dia pulls together the places where work is actually happening (like GitHub and Notion) in your tab bar. Click once and land directly in the right PR, spec, or draft.
                </p>
              </div>
              <div className="relative w-full h-[240px] mt-8 rounded-2xl overflow-hidden shadow-lg border border-zinc-200/50 translate-y-4 group-hover:translate-y-2 transition-transform duration-500">
                <Image
                  src="/images/feature_code.png"
                  alt="Live Work Feature mockup"
                  fill
                  className="object-cover object-top"
                />
              </div>
            </div>

            {/* Card 3: Better Meetings (Narrower) */}
            <div className="md:col-span-5 bg-[#f5f5f7] rounded-3xl p-8 sm:p-12 flex flex-col justify-between overflow-hidden relative group border border-zinc-200/20 md:min-h-[500px]">
              <div>
                <span className="px-4 py-1.5 bg-white rounded-full text-xs font-semibold text-zinc-700 shadow-sm inline-block mb-6">
                  Better Meetings
                </span>
                <p className="text-zinc-655 text-sm sm:text-base leading-relaxed max-w-md font-sans">
                  Every call starts with the right meeting page, agenda, notes, and related docs open, with a gentle countdown so you're on time. All you have to do is show up.
                </p>
              </div>
              <div className="relative w-full h-[240px] mt-8 rounded-2xl overflow-hidden shadow-lg border border-zinc-200/50 translate-y-4 group-hover:translate-y-2 transition-transform duration-500">
                <Image
                  src="/images/project_dark_ui.png"
                  alt="Better Meetings Feature mockup"
                  fill
                  className="object-cover object-top"
                />
              </div>
            </div>

            {/* Card 4: Profiles (Wider) */}
            <div className="md:col-span-7 bg-[#f5f5f7] rounded-3xl p-8 sm:p-12 flex flex-col justify-between overflow-hidden relative group border border-zinc-200/20 md:min-h-[500px]">
              <div>
                <span className="px-4 py-1.5 bg-white rounded-full text-xs font-semibold text-zinc-700 shadow-sm inline-block mb-6">
                  Profiles
                </span>
                <p className="text-zinc-655 text-sm sm:text-base leading-relaxed max-w-md font-sans">
                  Create clean lines between work and play, with custom tabs, logins, and color themes. Live in work mode during the day, then switch into personal browsing without accounts or histories bleeding together.
                </p>
              </div>
              <div className="relative w-full h-[240px] mt-8 rounded-2xl overflow-hidden shadow-lg border border-zinc-200/50 translate-y-4 group-hover:translate-y-2 transition-transform duration-500">
                <Image
                  src="/images/project_device.png"
                  alt="Profiles Feature mockup"
                  fill
                  className="object-cover object-top"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

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
    </div>
  );
}
