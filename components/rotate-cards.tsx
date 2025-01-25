"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image";

export type RotateCard = {
  name: string;
  role: string;
  testimonial: string;
  image: string;
};

const defaultCards: RotateCard[] = [
  {
    name: "Sarah Johnson",
    role: "Product Designer",
    testimonial:
      "The team's dedication to excellence and innovation truly stands out. Working with them has been an amazing journey.",
    image:
      "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250",
  },
  {
    name: "Michael Chen",
    role: "Senior Developer",
    testimonial:
      "Their approach to problem-solving and attention to detail made all the difference in our project's success.",
    image:
      "https://gravatar.com/avatar/27205e5c51cb03f862138b22bcb5dc20f94a342e744ff6df1b8dc8af3c865109",
  },
  {
    name: "Ala Eddine Menai",
    role: "Frontend Engineer",
    testimonial:
      "Outstanding service and exceptional results. They exceeded our expectations in every way possible.",
    image: "https://avatars.githubusercontent.com/u/20143684?v=4",
  },
];

export const RotateCards = ({ cards }: { cards: RotateCard[] }) => {
  const [currentPosition, setCurrentPosition] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const getCardStyle = (index: number) => {
    const baseIndex = (index - currentPosition + 3) % 3;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const baseStyles: any = {
      0: {
        zIndex: 40,
        x: 0,
        y: 0,
        rotate: 0,
        scale: 1,
        opacity: 1,
      },
      1: {
        zIndex: 30,
        x: isHovering ? 0 : 20,
        y: isHovering ? 0 : 10,
        rotate: isHovering ? 0 : 15,
        scale: isHovering ? 1 : 0.95,
        opacity: isHovering ? 1 : 0.9,
      },
      2: {
        zIndex: 30,
        x: isHovering ? 0 : -20,
        y: isHovering ? 0 : 10,
        rotate: isHovering ? 0 : -15,
        scale: isHovering ? 1 : 0.95,
        opacity: isHovering ? 1 : 0.9,
      },
    };

    return baseStyles[baseIndex];
  };

  const rotateLeft = () => {
    setCurrentPosition((prev) => (prev + 1) % 3);
  };

  const rotateRight = () => {
    setCurrentPosition((prev) => (prev - 1 + 3) % 3);
  };

  return (
    <div className="flex flex-col w-fit">
      <div className="flex items-center justify-center relative w-96 h-96">
        {(cards ?? defaultCards).map((card, index) => {
          const isFirst = (index - currentPosition + 3) % 3 === 0;
          return (
            <motion.div
              key={index}
              className={`absolute top-0 translate-x-1/2 w-80 h-96 rounded-xl shadow-lg bg-white`}
              animate={getCardStyle(index)}
              onHoverStart={() => isFirst && setIsHovering(true)}
              onHoverEnd={() => isFirst && setIsHovering(false)}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
            >
              <div className="h-full flex flex-col items-center text-white">
                <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-white">
                  <Image
                    layout="fill"
                    src={card.image}
                    alt={card.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-center text-neutral-950">
                  {card.name}
                </h3>
                <p className="text-sm mb-4 opacity-90 text-neutral-800">
                  {card.role}
                </p>
                <div className="px-4 mt-4">
                  <p className="relative flex text-center text-sm leading-relaxed text-neutral-600 px-4">
                    <Quote
                      size={16}
                      className="absolute -left-2 text-neutral-200"
                    />
                    {card.testimonial}
                    <Quote
                      size={16}
                      className="absolute -right-2 text-neutral-200 rotate-180 self-end"
                    />
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
      <div className="flex justify-center gap-4 mt-12">
        <Button
          onClick={rotateLeft}
          className="rounded-full bg-white hover:bg-zinc-100 w-8 h-8"
        >
          <ChevronLeft className="text-neutral-900" />
        </Button>
        <Button
          onClick={rotateRight}
          className="rounded-full bg-white hover:bg-zinc-100 w-8 h-8"
        >
          <ChevronRight className="text-neutral-900" />
        </Button>
      </div>
    </div>
  );
};

export default RotateCards;
