"use client"

import { cn } from "@/lib/utils"
import { motion, useScroll, useTransform } from "framer-motion"
import { HTMLProps } from "react"

type CircularTextProps = Partial<HTMLProps<HTMLParagraphElement>> & {
  text?: string
  radius?: number
}

export const CircularText = ({
  text,
  className,
  radius = 120, // Default larger radius
}: CircularTextProps) => {
  const { scrollYProgress } = useScroll()

  // Default text content
  const defaultText = "CIRCULAR TEXT ANIMATION EXAMPLE "

  // Transform scrollYProgress to rotation
  const rotate = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 360] // Rotate full circle based on scroll
  )

  // Calculate SVG dimensions based on radius
  const size = radius * 2
  const viewBoxSize = size + 128 // Text layout padding

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <motion.div
        className=""
        style={{
          rotate,
          transformOrigin: "center",
        }}
      >
        <svg
          width={size}
          height={size}
          viewBox={`${-viewBoxSize / 2} ${
            -viewBoxSize / 2
          } ${viewBoxSize} ${viewBoxSize}`}
        >
          <path
            id="textPath"
            d={`M 0,${radius} A ${radius},${radius} 0 1,1 0,${-radius} A ${radius},${radius} 0 1,1 0,${radius}`}
            fill="none"
            className="text-neutral-900"
          />
          <text
            className={cn(
              "text-3xl font-bold fill-neutral-900 dark:fill-white:",
              className
            )}
          >
            <textPath href="#textPath" startOffset="0%">
              {text ?? defaultText}
            </textPath>
          </text>
        </svg>
      </motion.div>
    </div>
  )
}
