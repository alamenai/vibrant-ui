"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

type DropletShape = "droplet" | "stream" | "splash";

interface Droplet {
  id: number;
  x: number;
  initialY: number;
  shape: DropletShape;
  size: number;
  delay: number;
}

interface DropletStyles {
  width: string;
  height: string;
  borderRadius: string;
}

export const WaterfallText = () => {
  const [droplets, setDroplets] = useState<Droplet[]>([]);
  const text = "Waterfall";

  // Function to create a new droplet with varied shapes
  const createDroplet = (): Droplet => {
    const randomX = Math.random() * 100;
    const shapes: DropletShape[] = [
      "droplet", // Traditional droplet
      "stream", // Longer water stream
      "splash", // Wider droplet
    ];

    return {
      id: Math.random(),
      x: randomX,
      initialY: 0,
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      size: Math.random() * 6 + 2, // Larger size range
      delay: Math.random() * 0.5, // Random start delay
    };
  };

  // Effect to create multiple droplets
  useEffect(() => {
    const interval = setInterval(() => {
      setDroplets((prev) => {
        const filtered = prev.filter((d) => d.initialY < 300);
        // Create multiple droplets at once
        const newDroplets = Array.from({ length: 3 }, () => createDroplet());
        return [...filtered, ...newDroplets];
      });
    }, 200); // Increased frequency

    return () => clearInterval(interval);
  }, []);

  // Get droplet styles based on shape
  const getDropletStyles = (
    shape: DropletShape,
    size: number,
  ): DropletStyles => {
    switch (shape) {
      case "stream":
        return {
          width: `${size}px`,
          height: `${size * 4}px`,
          borderRadius: "40% 40% 40% 40%",
        };
      case "splash":
        return {
          width: `${size * 2}px`,
          height: `${size}px`,
          borderRadius: "50% 50% 50% 50%",
        };
      default: // droplet
        return {
          width: `${size}px`,
          height: `${size * 1.5}px`,
          borderRadius: "40% 40% 60% 60%",
        };
    }
  };

  return (
    <div className="relative w-full h-96 flex justify-center items-start pt-8 overflow-hidden bg-gradient-to-b from-blue-50 to-blue-100">
      {/* Main text */}
      <h1 className="text-5xl font-bold text-blue-600 relative">
        {text}

        {/* Water droplets */}
        {droplets.map((droplet) => (
          <motion.div
            key={droplet.id}
            className="absolute bg-gradient-to-b from-blue-300 to-blue-400"
            style={{
              ...getDropletStyles(droplet.shape, droplet.size),
              left: `${droplet.x}%`,
              top: 0,
              filter: "blur(0.5px)",
              boxShadow: "0 0 2px rgba(0,0,0,0.1)",
            }}
            initial={{ y: droplet.initialY, opacity: 0.7 }}
            animate={{
              y: 300,
              opacity: [0.7, 0.5, 0.2],
              rotate: droplet.shape === "splash" ? [-15, 15] : 0,
              scale: droplet.shape === "stream" ? [1, 0.8] : [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              delay: droplet.delay,
              ease: "easeIn",
              rotate: {
                duration: 1,
                repeat: Infinity,
                repeatType: "reverse",
              },
              scale: {
                duration: 0.5,
                repeat: Infinity,
                repeatType: "reverse",
              },
            }}
          />
        ))}

        {/* Additional background streams */}
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={`stream-${i}`}
              className="absolute w-px bg-gradient-to-b from-blue-400 to-transparent"
              style={{
                left: `${(i + 1) * 12}%`,
                height: "100px",
              }}
              animate={{
                y: [0, 200],
                opacity: [0.4, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "linear",
              }}
            />
          ))}
        </div>
      </h1>
    </div>
  );
};
