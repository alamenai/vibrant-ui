"use client"

import { useEffect, useRef, useState } from "react"

export const Compass = () => {
  const [rotation, setRotation] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startAngle, setStartAngle] = useState(0)
  const compassRef = useRef<HTMLDivElement | null>(null)

  // Calculate angle based on mouse position relative to center of compass
  const calculateAngle = (event: React.MouseEvent | MouseEvent) => {
    const compass = compassRef.current
    if (!compass) return 0

    const rect = compass.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    // Get mouse position relative to center
    const mouseX = event.clientX - centerX
    const mouseY = event.clientY - centerY

    // Calculate angle in radians and convert to degrees
    let angle = Math.atan2(mouseY, mouseX) * (180 / Math.PI)

    // Adjust angle so North (up) is 0 degrees
    angle = angle + 90

    // Normalize to 0-360 range
    if (angle < 0) angle += 360

    return angle
  }

  const handleMouseDown = (event: React.MouseEvent | MouseEvent) => {
    event.preventDefault()
    setIsDragging(true)

    // Calculate and store the initial angle
    const angle = calculateAngle(event)
    setStartAngle(angle - rotation)
  }

  const handleMouseMove = (event: React.MouseEvent | MouseEvent) => {
    if (!isDragging) return

    // Calculate new angle based on mouse position
    const currentAngle = calculateAngle(event)
    let newRotation = currentAngle - startAngle

    // Normalize to 0-360 range
    if (newRotation < 0) newRotation += 360
    if (newRotation >= 360) newRotation -= 360

    setRotation(newRotation)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging])

  return (
    <div
      ref={compassRef}
      className="relative w-36 h-36 rounded-full flex items-center justify-center border cursor-grab"
      style={{ cursor: isDragging ? "grabbing" : "grab" }}
      onMouseDown={handleMouseDown}
    >
      <div
        className="relative w-32 h-32 rounded-full flex items-center justify-center "
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        <div className="flex  flex-col items-center justify-between h-full   absolute top-0 bottom-0">
          <div>
            <p className="text-sm font-semibold">N</p>
          </div>
          <div>
            <p className="text-sm font-semibold">S</p>
          </div>
        </div>

        <div className="flex items-center justify-between w-full absolute left-0 right-0">
          <div>
            <p className="text-sm font-semibold">W</p>
          </div>
          <div>
            <p className="text-sm font-semibold">E</p>
          </div>
        </div>

        <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[40px] border-b-red-500 absolute top-4"></div>
        <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[40px] border-t-blue-500 absolute bottom-4"></div>
      </div>
      <div className="absolute top-0 left-0 w-full h-full rounded-full pointer-events-none">
        <div className="w-full h-full rounded-full flex items-center justify-center">
          <div className="absolute top-1/2 -translate-y-1/2 text-xs text-neutral-800">
            {Math.round(rotation)}°
          </div>
        </div>
      </div>
    </div>
  )
}
