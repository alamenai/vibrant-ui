"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";

export const CubeText = () => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setRotate((prev) => ({
        x: prev.x - 90,
        y: prev.y,
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const faces = [
    { text: "Sharp Design", transform: "rotateY(0) translateZ(48px)" },
    { text: "Modern UI", transform: "rotateX(90deg) translateZ(48px)" },
    {
      text: "For Design Engineers",
      transform: "rotateX(-90deg) translateZ(48px)",
    },
    { text: "Smooth Animation", transform: "rotateX(180deg) translateZ(48px)" },
  ];

  // Calculate the width based on the longest text
  const containerStyle = useMemo(() => {
    const longestText = faces.reduce(
      (max, face) => (face.text.length > max.length ? face.text : max),
      "",
    );
    return {
      width: `${longestText.length * 2}rem`, // Approximate width based on text length
      minWidth: "320px", // Minimum width to ensure readable text
    };
  }, [faces]);

  return (
    <motion.div
      className="cube h-[96px] relative"
      animate={{
        rotateX: rotate.x,
        rotateY: rotate.y,
      }}
      transition={{
        duration: 2,
        ease: "easeOut",
      }}
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      {faces.map((face, index) => (
        <div
          key={index}
          className="absolute h-full text-nowrap flex items-center flex-grow justify-center bg-black/50 backdrop-blur-sm bg-opacity-95 border border-neutral-950"
          style={{
            ...containerStyle,
            transform: face.transform,
            transformStyle: "preserve-3d",
          }}
        >
          <span className="text-4xl bg-gradient-to-r from-purple-600 to-yellow-500 bg-clip-text text-transparent">
            {face.text}
          </span>
        </div>
      ))}
    </motion.div>
  );
};

// Add required CSS styles
const style = document.createElement("style");
style.textContent = `
  .perspective {
    perspective: 1000px;
  }
  .cube {
    transform-style: preserve-3d;
  }
`;
document.head.appendChild(style);
