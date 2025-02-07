"use client";

import { useEffect, useState } from "react";

type Snowflake = {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  wobble: number;
};

export const SnowfallBackground = () => {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

  // Generate initial snowflakes
  useEffect(() => {
    const generateSnowflakes = () => {
      const flakes = [];
      for (let i = 0; i < 100; i++) {
        flakes.push({
          id: i,
          x: Math.random() * 100, // Random starting position (%)
          y: Math.random() * 100,
          size: Math.random() * 4 + 2, // Random size between 2-6px
          speed: Math.random() * 1 + 0.5, // Random speed
          wobble: Math.random() * 2 - 1, // Random horizontal movement
        });
      }
      return flakes;
    };

    setSnowflakes(generateSnowflakes());
  }, []);

  // Animate snowflakes
  useEffect(() => {
    const animationFrame = setInterval(() => {
      setSnowflakes((prevFlakes) =>
        prevFlakes.map((flake) => ({
          ...flake,
          y: flake.y >= 100 ? 0 : flake.y + flake.speed,
          x: flake.x + Math.sin(flake.y / 30) * flake.wobble,
        })),
      );
    }, 50);

    return () => clearInterval(animationFrame);
  }, []);

  return (
    <div className="rounded-md w-full h-screen bg-neutral-950 overflow-hidden z-50">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute rounded-full bg-neutral-300"
          style={{
            left: `${flake.x}%`,
            top: `${flake.y}%`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            transform: `translate(-50%, -50%)`,
          }}
        />
      ))}
    </div>
  );
};
