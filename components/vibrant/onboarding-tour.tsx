"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"

/* eslint-disable @typescript-eslint/no-explicit-any */

// Position options for the card
export const POSITIONS = {
  TOP: "top",
  RIGHT: "right",
  BOTTOM: "bottom",
  LEFT: "left",
}

export type TourCardProps = {
  title: string
  description: string
  children: React.ReactNode
  onPrevious: () => void
  onNext: () => void
  position?: string
  showPrevious?: boolean
  showNext?: boolean
  previousText?: string
  nextText?: string
  currentStep?: number
  totalSteps?: number
  targetRef?: React.RefObject<any> | null // Reference to the element this card should point to
  offset?: number // Distance from the target element in pixels
  zIndex?: number // z-index for the card
  className?: string
}

type CardStyle = {
  position: React.CSSProperties["position"]
  top: string | number
  left: string | number
  visibility: "visible" | "hidden" | "collapse" | undefined
  zIndex?: number
}

export const TourCard = ({
  title,
  description,
  children,
  onPrevious,
  onNext,
  position = POSITIONS.RIGHT,
  showPrevious = true,
  showNext = true,
  previousText = "Previous",
  nextText = "Next",
  currentStep = 1,
  totalSteps = 1,
  targetRef = null,
  offset = 12,
  zIndex = 50,
  className = "",
}: TourCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null)

  const [cardStyle, setCardStyle] = useState<CardStyle>({
    position: "fixed",
    top: 0,
    left: 0,
    visibility: "hidden",
  })

  const [arrowStyle, setArrowStyle] = useState({
    top: 0,
    left: 0,
  })

  // Calculate and set the position of the card
  useEffect(() => {
    if (!targetRef?.current || !cardRef?.current) {
      console.log("Missing refs:", {
        targetRef: !!targetRef?.current,
        cardRef: !!cardRef?.current,
      })
      return
    }

    const updatePosition = () => {
      const targetRect = targetRef.current.getBoundingClientRect()
      const cardRect = cardRef.current?.getBoundingClientRect()
      if (!cardRect) return

      let top = 0
      let left = 0
      let arrowTop = 0
      let arrowLeft = 0

      switch (position) {
        case POSITIONS.TOP:
          top = targetRect.top - cardRect.height - offset
          left = targetRect.left + targetRect.width / 2 - cardRect.width / 2
          arrowTop = cardRect.height
          arrowLeft = cardRect.width / 2
          break
        case POSITIONS.RIGHT:
          top = targetRect.top + targetRect.height / 2 - cardRect.height / 2
          left = targetRect.right + offset
          arrowTop = cardRect.height / 2
          arrowLeft = -6
          break
        case POSITIONS.BOTTOM:
          top = targetRect.bottom + offset
          left = targetRect.left + targetRect.width / 2 - cardRect.width / 2
          arrowTop = -6 // Adjust for border width
          arrowLeft = cardRect.width / 2
          break
        case POSITIONS.LEFT:
          top = targetRect.top + targetRect.height / 2 - cardRect.height / 2
          left = targetRect.left - cardRect.width - offset
          arrowTop = cardRect.height / 2
          arrowLeft = cardRect.width - 6
          break
        default:
          break
      }

      // Make sure card stays within viewport
      if (left < 10) left = 10
      if (left + cardRect.width > window.innerWidth - 10) {
        left = window.innerWidth - cardRect.width - 10
      }

      if (top < 10) top = 10
      if (top + cardRect.height > window.innerHeight - 10) {
        top = window.innerHeight - cardRect.height - 10
      }

      // Update card position
      setCardStyle({
        position: "fixed",
        top: `${top}px`,
        left: `${left}px`,
        zIndex: zIndex,
        visibility: "visible", // Make visible after positioning
      })

      // Update arrow position
      setArrowStyle({
        top: arrowTop,
        left: arrowLeft,
      })
    }

    // Initial position update
    // Use timeout to ensure card is rendered first
    const timeoutId = setTimeout(() => {
      updatePosition()
    }, 50)

    // Update position on window resize
    window.addEventListener("resize", updatePosition)
    window.addEventListener("scroll", updatePosition)

    // Cleanup event listeners
    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener("resize", updatePosition)
      window.removeEventListener("scroll", updatePosition)
    }
  }, [targetRef, cardRef, position, offset, zIndex])

  // Get arrow style based on position
  const getArrowClassName = () => {
    const baseStyle = "absolute w-3 h-3 bg-white transform rotate-45"

    switch (position) {
      case POSITIONS.TOP:
        return `${baseStyle} border-b border-r border-gray-200`
      case POSITIONS.RIGHT:
        return `${baseStyle} border-l border-t border-gray-200`
      case POSITIONS.BOTTOM:
        return `${baseStyle} border-t border-l border-gray-200`
      case POSITIONS.LEFT:
        return `${baseStyle} border-r border-b border-gray-200`
      default:
        return baseStyle
    }
  }

  return (
    <div
      ref={cardRef}
      style={cardStyle}
      className="z-50 transition-all duration-200"
    >
      <Card className={cn("w-64 shadow-xl relative rounded-2xl", className)}>
        <div
          className={getArrowClassName()}
          style={{
            position: "absolute",
            top:
              position === POSITIONS.BOTTOM
                ? "-6px"
                : position === POSITIONS.TOP
                ? "100%"
                : `calc(${arrowStyle.top}px - 6px)`,
            left:
              position === POSITIONS.RIGHT
                ? "-6px"
                : position === POSITIONS.LEFT
                ? "100%"
                : `calc(${arrowStyle.left}px - 6px)`,
            marginTop: position === POSITIONS.TOP ? "-6px" : 0,
            marginLeft: position === POSITIONS.LEFT ? "-6px" : 0,
          }}
        />

        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-bold">{title}</CardTitle>
            <div className="text-xs text-muted-foreground">
              {currentStep}/{totalSteps}
            </div>
          </div>
          {description && (
            <CardDescription className="text-xs">{description}</CardDescription>
          )}
        </CardHeader>

        <CardContent className="py-2 text-sm">{children}</CardContent>

        <CardFooter className="flex justify-between pt-2 pb-2">
          {showPrevious ? (
            <Button
              variant="outline"
              size="sm"
              onClick={onPrevious}
              className="h-8 text-xs"
            >
              <ChevronLeft className="h-3 w-3 mr-1" /> {previousText}
            </Button>
          ) : (
            <div />
          )}

          {showNext && (
            <Button size="sm" onClick={onNext} className="h-8 text-xs">
              {nextText} <ChevronRight className="h-3 w-3 ml-1" />
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
