"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";

function MouseTiltCard({ children, className }: { children: React.ReactNode, className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`relative w-full h-[500px] md:h-[600px] rounded-[2.5rem] p-8 md:p-12 overflow-hidden shadow-2xl ${className}`}
    >
      {/* Glare effect */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-50 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 mix-blend-overlay"
        style={{
          x: useTransform(mouseXSpring, [-0.5, 0.5], ["-100%", "100%"]),
          y: useTransform(mouseYSpring, [-0.5, 0.5], ["-100%", "100%"]),
        }}
      />
      {children}
    </motion.div>
  );
}

// Mini UIs
function TerminalUI() {
  return (
    <div className="absolute -right-4 -bottom-4 md:-right-10 md:-bottom-10 w-[90%] md:w-[55%] h-[55%] md:h-[80%] bg-[#1c1c1e] rounded-xl border border-zinc-700/50 shadow-2xl flex flex-col overflow-hidden" style={{ transform: "translateZ(50px)" }}>
      <div className="h-8 bg-[#2d2d2f] flex items-center px-4 gap-2 border-b border-zinc-700/50 flex-shrink-0">
        <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
        <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
      </div>
      <div className="p-4 md:p-6 font-mono text-[10px] md:text-sm text-green-400 opacity-90 leading-relaxed overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
        >
          <span className="text-pink-400">const</span> <span className="text-blue-300">buildFuture</span> = <span className="text-pink-400">async</span> () {`=>`} {`{`}<br />
          &nbsp;&nbsp;<span className="text-zinc-500">// Architecting scalable systems</span><br />
          &nbsp;&nbsp;<span className="text-pink-400">await</span> System.<span className="text-yellow-200">deploy</span>({`{`}<br />
          &nbsp;&nbsp;&nbsp;&nbsp;stack: [<span className="text-orange-300">'React'</span>, <span className="text-orange-300">'Next.js'</span>],<br />
          &nbsp;&nbsp;&nbsp;&nbsp;performance: <span className="text-purple-300">100</span><br />
          &nbsp;&nbsp;{`}`});<br />
          {`}`};
        </motion.div>
      </div>
    </div>
  );
}

function GlassUI() {
  return (
    <div className="absolute -right-4 -bottom-4 md:-right-10 md:-bottom-10 w-[90%] md:w-[65%] h-[55%] md:h-[75%] flex items-end justify-end p-4 md:p-8" style={{ transform: "translateZ(80px)" }}>
      <div className="relative w-full h-full">
        {/* Backdrop elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse" />
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-white rounded-full mix-blend-overlay filter blur-2xl opacity-70 animate-pulse delay-1000" />

        {/* Glass panel */}
        <div className="absolute inset-0 m-4 bg-white/30 backdrop-blur-2xl border border-white/60 rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] flex flex-col p-6">
          <div className="w-1/3 h-4 bg-white/60 rounded-full mb-6" />
          <div className="w-full h-24 bg-white/40 rounded-xl mb-4 border border-white/50" />
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-pink-400 shadow-inner" />
            <div className="w-12 h-12 rounded-full bg-blue-400 shadow-inner" />
            <div className="w-12 h-12 rounded-full bg-yellow-400 shadow-inner" />
          </div>
        </div>
      </div>
    </div>
  );
}

function PhysicsUI() {
  return (
    <div className="absolute -right-4 -bottom-4 md:-right-10 md:-bottom-10 w-[90%] md:w-[55%] h-[55%] md:h-[80%] bg-zinc-900 rounded-tl-3xl border-t border-l border-zinc-700 p-4 md:p-8 flex items-center justify-center shadow-2xl" style={{ transform: "translateZ(60px)" }}>
      <div className="relative w-full h-full border-2 border-dashed border-zinc-600 rounded-2xl flex items-center justify-center overflow-hidden">
        <motion.div
          className="w-20 h-20 bg-[#FE9BAE] rounded-2xl cursor-grab active:cursor-grabbing shadow-lg"
          drag
          dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9, rotate: 15 }}
        />
        <p className="absolute bottom-4 text-zinc-500 font-mono text-xs text-center w-full pointer-events-none">Drag the cube</p>
      </div>
    </div>
  );
}

export function SkillsBento() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress across this highly-tall sticky container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Card 1 stays in back, scales down smoothly over the whole scroll
  const scale1 = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -60]);

  // Card 2 slides in from the bottom during the first 50% of scroll, then scales down
  const scale2 = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0.92]);
  const y2 = useTransform(scrollYProgress, [0, 0.5, 1], [1000, 0, -30]);

  // Card 3 slides in from the bottom during the second 50% of scroll
  const y3 = useTransform(scrollYProgress, [0.5, 1], [1000, 0]);

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-[#fbfbfb]">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden pt-20">

        {/* Title */}
        <div className="absolute top-12 left-0 w-full text-center z-50 pointer-events-none">
          <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-black">
            Capabilities
          </h2>
        </div>

        <div
          className="relative w-full max-w-5xl px-6 h-[500px] md:h-[600px] flex items-center justify-center"
          style={{ perspective: 2000 }}
        >

          {/* Card 1: Frontend */}
          <motion.div
            className="absolute w-full top-0 origin-top"
            style={{ scale: scale1, y: y1 }}
          >
            <MouseTiltCard className="bg-[#18181b] text-white border border-zinc-800">
              <div className="relative z-20 w-full md:w-[45%] pointer-events-none" style={{ transform: "translateZ(30px)" }}>
                <span className="px-4 py-1.5 bg-white/10 rounded-full text-xs font-bold tracking-wider uppercase backdrop-blur-md border border-white/10 mb-4 md:mb-6 inline-block">
                  Engineering
                </span>
                <h3 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4 tracking-tight">
                  Frontend <br /><span className="text-[#FE9BAE]">Architecture</span>
                </h3>
                <p className="text-sm md:text-lg leading-relaxed opacity-85 text-zinc-300">
                  Building resilient, scalable web applications using React, Next.js, and TypeScript. Turning complex logic into seamless experiences.
                </p>
              </div>
              <div className="pointer-events-auto">
                <TerminalUI />
              </div>
            </MouseTiltCard>
          </motion.div>

          {/* Card 2: UI/UX */}
          <motion.div
            className="absolute w-full top-8 origin-top"
            style={{ scale: scale2, y: y2 }}
          >
            <MouseTiltCard className="bg-[#FE9BAE] text-zinc-900 border border-[#fcaec0] shadow-[0_-20px_50px_-15px_rgba(0,0,0,0.15)]">
              <div className="relative z-20 w-full md:w-[45%] pointer-events-none" style={{ transform: "translateZ(40px)" }}>
                <span className="px-4 py-1.5 bg-black/10 rounded-full text-xs font-bold tracking-wider uppercase backdrop-blur-md border border-black/10 mb-4 md:mb-6 inline-block text-black">
                  Design
                </span>
                <h3 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4 tracking-tight">
                  Pixel-Perfect <br /><span className="text-white">UI/UX</span>
                </h3>
                <p className="text-sm md:text-lg leading-relaxed text-black/80 font-medium">
                  Crafting intuitive interfaces focusing on user journeys, precise typography, and gorgeous glassmorphic micro-interactions.
                </p>
              </div>
              <GlassUI />
            </MouseTiltCard>
          </motion.div>

          {/* Card 3: Motion */}
          <motion.div
            className="absolute w-full top-16 origin-top"
            style={{ y: y3 }}
          >
            <MouseTiltCard className="bg-white text-zinc-900 border border-zinc-200 shadow-[0_-20px_50px_-15px_rgba(0,0,0,0.1)]">
              <div className="relative z-20 w-full md:w-[45%] pointer-events-none" style={{ transform: "translateZ(50px)" }}>
                <span className="px-4 py-1.5 bg-zinc-100 rounded-full text-xs font-bold tracking-wider uppercase border border-zinc-200 mb-4 md:mb-6 inline-block">
                  Interactive
                </span>
                <h3 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4 tracking-tight">
                  Motion & <br />Physics
                </h3>
                <p className="text-sm md:text-lg leading-relaxed text-zinc-600">
                  Bringing static interfaces to life. Using Framer Motion, GSAP, and Canvas to create award-winning scroll choreography.
                </p>
              </div>
              <div className="pointer-events-auto">
                <PhysicsUI />
              </div>
            </MouseTiltCard>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
