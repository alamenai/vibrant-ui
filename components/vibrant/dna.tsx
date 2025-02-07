"use client";
import { motion } from "framer-motion";

const DNA = () => {
  const numberOfPoints = 80; // Increased points for smoother rotation

  const createHelixPoints = (offset = 0) => {
    return Array.from({ length: numberOfPoints }).map((_, i) => ({
      x: Math.sin((i / numberOfPoints) * Math.PI * 8 + offset) * 50, // Multiplied by 8 for 4 complete rotations (2π * 4)
      y: (i / numberOfPoints) * 800,
    }));
  };

  const strand1Points = createHelixPoints(0);
  const strand2Points = createHelixPoints(Math.PI);

  return (
    <div className="flex items-center justify-center bg-black">
      <div className="relative h-screen w-96 overflow-hidden">
        {/* Connecting Lines */}
        {strand1Points.map((point1, i) => {
          const point2 = strand2Points[i];
          const startX = point1.x + 180;
          const endX = point2.x + 180;
          const width = Math.abs(endX - startX);
          const left = Math.min(startX, endX);
          
          return (
            <motion.div
              key={`line-${i}`}
              className="absolute bg-gradient-to-r from-blue-300/30 to-red-300/30"
              style={{
                left: `${left}px`,
                top: `${point1.y + 40}px`,
                width: `${width}px`,
                height: '2px',
              }}
              animate={{
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.1,
              }}
            />
          );
        })}

        {/* First Strand */}
        {strand1Points.map((point, i) => (
          <motion.div
            key={`strand1-${i}`}
            className="absolute w-8 h-8 rounded-full z-10"
            style={{
              left: `${point.x + 180}px`,
              top: `${point.y + 40}px`,
              background:
                "linear-gradient(45deg, rgba(59, 130, 246, 0.8), rgba(147, 197, 253, 0.4))",
              boxShadow: `
                  0 0 15px rgba(59, 130, 246, 0.6),
                  0 0 30px rgba(59, 130, 246, 0.3)
                `,
              filter: "blur(1px)",
            }}
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.1,
            }}
          />
        ))}

        {/* Second Strand */}
        {strand2Points.map((point, i) => (
          <motion.div
            key={`strand2-${i}`}
            className="absolute w-8 h-8 rounded-full z-10"
            style={{
              left: `${point.x + 180}px`,
              top: `${point.y + 40}px`,
              background:
                "linear-gradient(45deg, rgba(239, 68, 68, 0.8), rgba(252, 165, 165, 0.4))",
              boxShadow: `
                  0 0 15px rgba(239, 68, 68, 0.6),
                  0 0 30px rgba(239, 68, 68, 0.3)
                `,
              filter: "blur(1px)",
            }}
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.1,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default DNA;