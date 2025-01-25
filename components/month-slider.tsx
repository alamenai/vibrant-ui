"use client";

import { useState, useEffect, useRef } from "react";

const MonthSlider = () => {
  const [months, setMonths] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setLastValidAngle] = useState(270);
  const containerRef = useRef<HTMLDivElement>(null);

  const calculateHandlePosition = (months: number) => {
    const angle = ((months / 12) * 360 - 90) * (Math.PI / 180);
    const radius = 95;
    return {
      x: Math.cos(angle) * radius + 128,
      y: Math.sin(angle) * radius + 128,
    };
  };

  const handlePosition = calculateHandlePosition(months);

  const handleMouseDown = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: { clientY: number; clientX: number }) => {
    if (!isDragging || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    let angle =
      Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);

    // Adjust angle to start from top (270 degrees)
    angle = (angle + 450) % 360;

    // Calculate months (1-12) based on rotation
    const calculatedMonths = Math.round((angle / 360) * 12);

    // Handle edge cases
    if (months === 12) {
      // At 12 months, only allow decreasing (moving counterclockwise)
      if (calculatedMonths < 12 && angle > 180) {
        setMonths(calculatedMonths);
        setLastValidAngle(angle);
      }
      return;
    }

    if (months === 1) {
      // At 1 month, only allow increasing (moving clockwise)
      if (calculatedMonths > 1 && angle < 180) {
        setMonths(calculatedMonths);
        setLastValidAngle(angle);
      }
      return;
    }

    // For all other positions, allow normal movement within 1-12 range
    if (calculatedMonths >= 1 && calculatedMonths <= 12) {
      setMonths(calculatedMonths);
      setLastValidAngle(angle);
    }
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener("mouseup", handleGlobalMouseUp);
    return () => window.removeEventListener("mouseup", handleGlobalMouseUp);
  }, []);

  return (
    <div
      role="presentation"
      ref={containerRef}
      className="relative w-64 h-64 rounded-full"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* Background circle */}
      <div className="absolute inset-0 rounded-full bg-gray-100"></div>

      {/* Progress arc with animated gradient */}
      <div
        className="absolute inset-0 rounded-full animate-gradient"
        style={{
          background: `conic-gradient(from 0deg, 
              rgb(139, 92, 246) 0%, /* violet-500 */
              rgb(124, 58, 237) ${(months / 12) * 50}%, /* violet-600 */
              rgb(109, 40, 217) ${(months / 12) * 100}%, /* violet-700 */
              transparent ${(months / 12) * 100}%, 
              transparent 100%)`,
        }}
      ></div>

      {/* Center circle with number */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white rounded-full w-32 h-32 flex flex-col items-center justify-center shadow-3xl">
          <span className="text-4xl font-bold text-gray-800">{months}</span>
          <span className="text-sm text-gray-500">months</span>
        </div>
      </div>

      {/* Dots around the circle */}
      {Array.from({ length: 12 }).map((_, index) => {
        const angle = (index * 30 - 90) * (Math.PI / 180);
        const radius = 120;
        const x = Math.cos(angle) * radius + 128;
        const y = Math.sin(angle) * radius + 128;

        return (
          <div
            key={index}
            className={`absolute w-1 h-1 rounded-full ${
              index + 1 <= months ? "bg-rose-500" : "bg-gray-200"
            }`}
            style={{
              left: `${x}px`,
              top: `${y}px`,
              transform: "translate(-50%, -50%)",
            }}
          />
        );
      })}

      {/* Draggable handle */}
      <button
        className="absolute w-14 h-14 cursor-grab active:cursor-grabbing transition-all duration-150"
        style={{
          left: `${handlePosition.x}px`,
          top: `${handlePosition.y}px`,
          transform: "translate(-50%, -50%)",
        }}
        onMouseDown={handleMouseDown}
      >
        <div className="w-full h-full bg-violet-400 rounded-full shadow-2xl flex items-center justify-center">
          <div className="w-12 h-12 bg-violet-700 rounded-full"></div>
        </div>
      </button>
    </div>
  );
};

export default MonthSlider;
