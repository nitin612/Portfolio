"use client";

import { motion } from "framer-motion";
import { Bebas_Neue } from "next/font/google";

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
});

const PARTICLES = Array.from({ length: 80 }).map((_, i) => ({
  id: i,
  left: `${(i * 17) % 100}%`,
  top: `${(i * 23) % 100}%`,
  size: ((i * 7) % 6) + 3, // 3 to 8px
  duration: ((i * 11) % 20) + 15,
  delay: (i * 3) % 10,
  xOffset: ((i * 13) % 60) - 30,
  yOffset: ((i * 19) % 60) - 30,
}));

export function ScrollChoreography() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#f9f5f6] text-black px-6 sm:px-12 py-12 flex flex-col justify-between font-sans">

      {/* Noise Texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: "150px 150px",
          opacity: 0.04,
          mixBlendMode: "multiply",
        }}
      />

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-[#FE9BAE]"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              boxShadow: "0 0 12px 2px rgba(254, 155, 174, 0.8)",
            }}
            animate={{
              x: [0, `${p.xOffset}vw`, 0],
              y: [0, `${p.yOffset}vh`, 0],
              opacity: [0.3, 1, 0.3],
              scale: [1, 2, 1],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full h-full flex flex-col justify-between flex-1">

        {/* Top Left Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col mt-24 lg:mt-32"
        >
          <h2 className={`${bebas.className} text-[15vw] lg:text-[12vw] leading-[0.85] tracking-tight m-0 uppercase text-black`}>
            YOUR VISION
          </h2>
          <h2 className={`${bebas.className} text-[15vw] lg:text-[12vw] leading-[0.85] tracking-tight m-0 uppercase text-[#FE9BAE]`}>
            REIMAGINED
          </h2>
        </motion.div>

        {/* 3D Hand Placeholder (Optional) */}
        {/* If you have a 3D hand asset, you can position it absolutely here:
          <img src="/hand.png" className="absolute right-[20%] top-[10%] w-[30%] object-contain -z-10" />
        */}

        {/* Middle Right Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-end mt-12 lg:mt-8 text-right"
        >
          <h2 className={`${bebas.className} text-[13vw] lg:text-[10vw] leading-[0.85] tracking-tight m-0 uppercase text-black`}>
            OPEN TO PROJECTS
          </h2>
          <h2 className={`${bebas.className} text-[13vw] lg:text-[10vw] leading-[0.85] tracking-tight m-0 uppercase text-black`}>
            AND FREELANCE
          </h2>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-auto pt-16 flex flex-col md:flex-row items-start md:items-end justify-between gap-8 w-full"
        >
          {/* CTA Button */}
          <a
            href="mailto:hello@reality.design"
            className="group flex items-center p-1 rounded-[2rem] bg-[#FE9BAE] hover:bg-[#fa899f] transition-colors duration-300"
          >
            <div className="bg-[#f9f5f6] rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
            <span className="px-6 py-2 text-black text-sm font-black tracking-wider uppercase">
              Start A Project
            </span>
          </a>

          {/* Links Row */}
          <div className="flex flex-wrap items-center md:justify-end gap-4 sm:gap-8 text-[9px] sm:text-[10px] font-black tracking-[0.1em] uppercase text-black pb-2">
            <a href="#" className="hover:text-zinc-600 transition-colors">Github</a>
            <a href="#" className="hover:text-zinc-600 transition-colors">X</a>
            <a href="#" className="hover:text-zinc-600 transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-zinc-600 transition-colors">Mail</a>
            <a href="#" className="hover:text-zinc-600 transition-colors">Download Resume</a>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
