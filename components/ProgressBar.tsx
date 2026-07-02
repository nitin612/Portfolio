"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export function ProgressBar() {
  const { scrollYProgress } = useScroll();

  // Smooth transition: turns White early (15%), stays White, turns Pink late (85%)
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    ["#000000", "#ffffff", "#ffffff", "#FE9BAE"]
  );

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1.5 z-[9999]"
      style={{ scaleX: scrollYProgress, originX: 0, backgroundColor }}
    />
  );
}
