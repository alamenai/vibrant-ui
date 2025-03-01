"use client"

import { cn } from "@/lib/utils"
import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "../ui/card"

type RulerProps = {
  unit?: string
  width?: number
  size?: number
  tick?: number
  variant?: "sm" | "lg" | "xl" | "2xl"
}

export const Ruler = ({
  variant = "lg",
  unit = "cm",
  width = 1500,
  size = 30,
  tick = 5,
}: RulerProps) => {
  const contentRef = useRef<HTMLDivElement | null>(null)
  const rulerRef = useRef<HTMLDivElement | null>(null)

  const totalTicks = size * tick
  const tickSpacing = width / totalTicks

  const [position, setPosition] = useState<null | number>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)

  useEffect(() => {
    if (contentRef.current) {
      const centerPosition = contentRef.current.offsetWidth / 2
      setPosition(centerPosition)
    }
  }, [])

  useEffect(() => {
    const handleMouseUp = () => {
      setIsDragging(false)
    }

    document.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("touchend", handleMouseUp)

    return () => {
      document.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("touchend", handleMouseUp)
    }
  }, [])

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    if (position) {
      setStartX(e.clientX - position)
    }
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    if (position) {
      setStartX(e.touches[0].clientX - position)
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const newPosition = e.clientX - startX
      updatePosition(newPosition)
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) {
      const newPosition = e.touches[0].clientX - startX
      updatePosition(newPosition)
    }
  }

  const updatePosition = (newPos: number) => {
    // Calculate boundaries to allow scrolling from 0 to size
    const contentWidth = contentRef.current
      ? contentRef.current.offsetWidth
      : width
    const centerOffset = contentWidth / 2

    // For 0cm at center: centerOffset
    // For size at center: centerOffset - (size * tick * tickSpacing)
    const minPosition = centerOffset - size * tick * tickSpacing
    const maxPosition = centerOffset

    // Constrain position within boundaries
    const constrainedPosition = Math.min(
      maxPosition,
      Math.max(minPosition, newPos)
    )

    setPosition(constrainedPosition)
  }

  const getCurrentValue = () => {
    if (contentRef.current) {
      const contentWidth = contentRef.current.offsetWidth

      const centerOffset = contentWidth / 2

      if (position) {
        // Calculate how far we've moved from the 0 position
        const pixelsFromZero = centerOffset - position

        // Convert pixels to a unit value
        const value = pixelsFromZero / tickSpacing / tick

        // Format as decimal with one digit precision for display
        return Math.max(0, parseFloat(value.toFixed(1)))
      }
    }
  }

  const createTicks = () => {
    const ticks = []

    for (let i = 0; i <= totalTicks; i++) {
      const isMajorTick = i % tick === 0
      const majorTick = Math.floor(i / tick)

      const tickElement = (
        <div
          key={i}
          className={cn(
            "absolute bottom-0 border-gray-400",
            isMajorTick ? "h-4 border-l-2" : "h-2 border-l"
          )}
          style={{
            left: `${i * tickSpacing}px`,
          }}
        >
          {isMajorTick && (
            <div className="absolute -top-6 text-xs text-center w-6 -ml-3">
              {majorTick}
            </div>
          )}
        </div>
      )

      ticks.push(tickElement)
    }

    return ticks
  }

  return (
    <Card className={cn("w-full mx-auto", `max-w-${variant || "md"}`)}>
      <CardContent className="p-4 relative">
        <>
          <div className="flex flex-col items-center mb-2">
            <div className="font-semibold text-lg">
              {getCurrentValue()} {contentRef.current && (unit || "cm")}
            </div>
          </div>

          <div
            className="relative overflow-hidden h-fit min-h-14 w-full px-1 select-none"
            ref={contentRef}
          >
            {contentRef.current && (
              <>
                <span className="h-2 w-2 rounded-full bg-black absolute mx-auto left-1/2"></span>
                <div
                  ref={rulerRef}
                  className="absolute h-full cursor-grab active:cursor-grabbing touch-"
                  style={{
                    width: `${width}px`,
                    transform: `translateX(${position}px)`,
                  }}
                  onMouseDown={handleMouseDown}
                  onTouchStart={handleTouchStart}
                  onMouseMove={handleMouseMove}
                  onTouchMove={handleTouchMove}
                >
                  {createTicks()}
                </div>
              </>
            )}
          </div>
        </>
      </CardContent>
    </Card>
  )
}
