"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type FallingRectangleProps = {
  delay: number;
};

type Rect = {
  id: number;
  delay: number;
};

export const WaveBackground = () => {
  const [rectangles, setRectangles] = useState<Rect[]>([]);

  useEffect(() => {
    const rects = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      delay: Math.random() * 2,
    }));
    setRectangles(rects);
  }, []);

  return (
    <motion.div
      className="relative h-screen w-full overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500"
      animate={{
        background: [
          "linear-gradient(to right, rgb(168, 85, 247), rgb(236, 72, 153))",
          "linear-gradient(to right, rgb(59, 130, 246), rgb(236, 72, 153))",
          "linear-gradient(to right, rgb(168, 85, 247), rgb(236, 72, 153))",
        ],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "circInOut",
      }}
    >
      {rectangles.map((rect) => (
        <FallingRectangle key={rect.id} delay={rect.delay} />
      ))}
    </motion.div>
  );
};

const FallingRectangle = ({ delay }: FallingRectangleProps) => {
  const width = Math.floor(Math.random() * 16) + 4; // Random width between 4-20px
  const height = Math.floor(Math.random() * 48) + 16; // Random height between 16-64px

  return (
    <motion.div
      className="absolute opacity-50 bg-white"
      style={{
        left: `${Math.random() * 100}%`,
        width: `${width}px`,
        height: `${height}px`,
      }}
      initial={{ y: -20 }}
      animate={{ y: "100vh" }}
      transition={{
        duration: 2 + Math.random() * 2,
        repeat: Infinity,
        delay,
        ease: "linear",
      }}
    />
  );
};
