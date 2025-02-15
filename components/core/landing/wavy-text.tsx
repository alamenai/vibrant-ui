"use client";

import { motion } from "framer-motion";

export type WavyTextProps = {
  text?: string;
  delay?: number;
};

export const WavyText = ({
  text = "Water Effect",
  delay = 0.05,
}: WavyTextProps) => {
  const letters = Array.from(text);

  // Container animation
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: delay, delayChildren: delay * i },
    }),
  };

  // Individual character animations
  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
  };

  // Hover animation for water ripple effect
  const waterWave = {
    rest: {
      y: 0,
      transition: {
        duration: 0.4,
        type: "tween",
        ease: "easeOut",
      },
    },
    hover: (i: number) => ({
      y: [0, -10, 0],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut",
        delay: i * 0.05,
      },
    }),
  };

  return (
    <motion.div
      className="flex overflow-hidden text-7xl font-black text-neutral-800 cursor-pointer p-4"
      variants={container}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          variants={{
            ...child,
            hover: waterWave.hover(index),
          }}
          className="inline-block relative"
          style={{
            textShadow: "2px 2px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          {letter === " " ? "\u00A0" : letter}
          {/* Water ripple effect on hover */}
          <motion.div
            className="absolute inset-0 rounded-full opacity-0 -z-10"
            initial={{ scale: 1, opacity: 0 }}
            whileHover={{
              scale: [1, 1.4, 1],
              opacity: [0, 0.2, 0],
              transition: {
                duration: 1,
                repeat: Infinity,
                repeatType: "loop",
              },
            }}
          />
        </motion.span>
      ))}
    </motion.div>
  );
};

export default WavyText;
