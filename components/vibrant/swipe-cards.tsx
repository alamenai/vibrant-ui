"use client"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { PackageOpen } from "lucide-react"
import Image from "next/image"
import { ReactNode, useCallback, useEffect, useRef, useState } from "react"

/* eslint-disable @typescript-eslint/no-unused-vars */

const SWIPE_THRESHOLD = 180

type ImageClip = {
  url: string
  alt: string
}

export type SwipeCardStyle = {
  width: number
  height: number
}

export type SwipeCards = {
  id: number
  content?: ReactNode
  images: ImageClip[]
}

export type SwipeCardsProps = {
  cards: SwipeCards[]
  style?: SwipeCardStyle
  animationHint?: boolean
}

type Direction = "left" | "right"

export const SwipeCards = ({
  cards,
  style,
  animationHint,
}: SwipeCardsProps) => {
  const [tempCards, setTempCards] = useState(cards)
  const [currentImageIndices, setCurrentImageIndices] = useState<
    Record<number, number>
  >(cards.reduce((acc, card) => ({ ...acc, [card.id]: 0 }), {}))

  if (!cards) {
    throw new Error("cards are required")
  }

  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [offsetX, setOffsetX] = useState(0)
  const [direction, setDirection] = useState(0)
  const [exitDirection, setExitDirection] = useState<Direction | null>(null)
  const [isSwiped, setIsSwiped] = useState(false)
  const cardRef = useRef(null)
  const [isImageNavigation, setIsImageNavigation] = useState(false)
  const [dragDistance, setDragDistance] = useState(0)
  const [dragStartTime, setDragStartTime] = useState(0)

  const handleImageNavigation = (
    cardId: number,
    direction: "left" | "right"
  ) => {
    setCurrentImageIndices((prev) => {
      const currentIndex = prev[cardId]
      const card = cards.find((c) => c.id === cardId)
      if (!card) return prev

      const totalImages = card.images.length
      if (totalImages <= 1) return prev

      let newIndex = currentIndex
      if (direction === "right" && currentIndex < totalImages - 1) {
        newIndex = currentIndex + 1
      } else if (direction === "left" && currentIndex > 0) {
        newIndex = currentIndex - 1
      }

      return { ...prev, [cardId]: newIndex }
    })
  }

  const handleCardClick = (e: React.MouseEvent, cardId: number) => {
    const card = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - card.left
    const isLeftSide = clickX < card.width / 2

    handleImageNavigation(cardId, isLeftSide ? "left" : "right")
    setIsImageNavigation(true)
    setTimeout(() => setIsImageNavigation(false), 100)
  }

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsDragging(true)
    setStartX(e.touches[0].clientX - offsetX)
    setDragDistance(0)
    setDragStartTime(Date.now())
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true)
    setStartX(e.clientX - offsetX)
    setDragDistance(0)
    setDragStartTime(Date.now())
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return
    const currentX = e.touches[0].clientX
    const newOffset = currentX - startX
    setOffsetX(newOffset)
    setDirection(newOffset > 0 ? 1 : -1)
    setDragDistance(Math.abs(newOffset))
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return
    const currentX = e.clientX
    const newOffset = currentX - startX
    setOffsetX(newOffset)
    setDirection(newOffset > 0 ? 1 : -1)
    setDragDistance(Math.abs(newOffset))
  }

  const handleDragEnd = () => {
    if (!isDragging) return
    setIsDragging(false)

    if (Math.abs(offsetX) > SWIPE_THRESHOLD) {
      setExitDirection(offsetX > 0 ? "right" : "left")
      setIsSwiped(true)

      setTimeout(() => {
        setTempCards((prevCards) => prevCards.slice(1))
        setExitDirection(null)
        setOffsetX(0)
        setIsSwiped(false)
      }, 300)
    } else {
      setOffsetX(0)
    }
  }

  const memoizedDragEnd = useCallback(handleDragEnd, [isDragging, offsetX])

  useEffect(() => {
    const handleEnd = (e: MouseEvent | TouchEvent) => {
      if (isDragging) {
        e.preventDefault()
        memoizedDragEnd()
      }
    }

    window.addEventListener("mouseup", handleEnd)
    window.addEventListener("touchend", handleEnd)

    return () => {
      window.removeEventListener("mouseup", handleEnd)
      window.removeEventListener("touchend", handleEnd)
    }
  }, [isDragging, memoizedDragEnd])

  const getZIndex = (index: number, totalCards: number) => {
    if (index === 0) return "z-50"
    return `z-${Math.max(0, 40 - (totalCards - index - 1) * 10)}`
  }

  return (
    <div className="flex flex-col items-center justify-center bg-gray-50 rounded-2xl select-none">
      <div
        className={cn(
          "flex flex-col items-center justify-center relative w-80 h-96",
          animationHint && "animate-swipeHintBoth"
        )}
        style={{ width: style?.width }}
      >
        {[...tempCards].reverse().map((card, reversedIndex) => {
          const index = tempCards.length - reversedIndex - 1
          const isFirstCard = index === 0
          const currentImageIndex = currentImageIndices[card.id]

          return (
            <Card
              key={card.id}
              ref={isFirstCard ? cardRef : null}
              className={cn(
                "absolute w-full h-full rounded-2xl shadow-xl transition-all duration-300 ease-out overflow-hidden",
                getZIndex(index, cards.length)
              )}
              style={{
                transform: (() => {
                  if (isFirstCard && !isSwiped) {
                    return `translateX(${offsetX}px) rotate(${
                      offsetX * 0.1
                    }deg)`
                  }
                  if (isFirstCard && isSwiped) {
                    return "translateX(100%)"
                  }
                  return `translateY(${(cards.length - index - 1) * 4}px)`
                })(),
                cursor: isDragging ? "grabbing" : "grab",
                display: isSwiped && isFirstCard ? "none" : "block",
              }}
              onMouseDown={isFirstCard ? handleMouseDown : undefined}
              onTouchStart={isFirstCard ? handleTouchStart : undefined}
              onTouchMove={isFirstCard ? handleTouchMove : undefined}
              onMouseMove={isFirstCard ? handleMouseMove : undefined}
              onTouchEnd={isFirstCard ? handleDragEnd : undefined}
              onClick={(e) => {
                const dragDuration = Date.now() - dragStartTime
                const isQuickInteraction = dragDuration < 200 // 200ms threshold
                if (
                  !isDragging &&
                  offsetX === 0 &&
                  dragDistance < 5 &&
                  isQuickInteraction
                ) {
                  handleCardClick(e, card.id)
                }
              }}
            >
              <CardContent className="relative flex items-center justify-center h-full p-0">
                {card.images && card.images.length > 0 && (
                  <div className="absolute inset-0">
                    <Image
                      src={card.images[currentImageIndex].url}
                      alt={card.images[currentImageIndex].alt}
                      className="w-full h-full  pointer-events-none"
                      fill
                    />
                    {/* Navigation indicators */}
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1">
                      {card.images.map((_, idx) => (
                        <div
                          key={idx}
                          className={`w-2 h-2 rounded-full ${
                            idx === currentImageIndex
                              ? "bg-white"
                              : "bg-white/50"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )}
                <div className="relative z-10 text-2xl font-bold text-white drop-shadow-lg">
                  {card.content}
                </div>
              </CardContent>
            </Card>
          )
        })}

        {tempCards.length === 0 && (
          <div className="flex flex-col items-center gap-4">
            <PackageOpen className="text-gray-300" size={48} />
            <p className="text-sm"> Your stack is empty</p>
          </div>
        )}
      </div>
    </div>
  )
}
