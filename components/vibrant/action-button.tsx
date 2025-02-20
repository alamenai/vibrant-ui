"use client"

import { Button, ButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Check, Loader2 } from "lucide-react"
import { useState } from "react"
import tailwindColors from "tailwindcss/colors"

type ColorScheme = keyof typeof tailwindColors

type ActionButtonProps = ButtonProps & {
  successText?: string
  successColor?: ColorScheme
}

const DEFAULT_COLOR = "violet"
const DEFAULT_SUCCESS_TEXT = "Done"

export const ActionButton = ({
  children,
  successText = DEFAULT_SUCCESS_TEXT,
  className,
  successColor = DEFAULT_COLOR,
  onClick,
  ...props
}: ActionButtonProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [showSuccessText, setShowSuccessText] = useState(false)
  const [buttonText, setButtonText] = useState(children)

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    if (isLoading) return

    setIsLoading(true)
    setButtonText("")
    setShowSuccessText(false)

    try {
      if (onClick) {
        await onClick(event)
      }

      setIsLoading(false)
      setIsSuccess(true)

      setTimeout(() => {
        setShowSuccessText(true)
        setButtonText(successText)
      }, 100)

      setTimeout(() => {
        setIsSuccess(false)
        setButtonText(children)
      }, 1000)
    } catch (error) {
      // Handle any errors
      console.error("Error:", error)
      setIsLoading(false)
      setButtonText(children)
    }
  }

  const color = tailwindColors[successColor as ColorScheme]

  const baseClasses =
    "w-48 relative flex items-center justify-center rounded-full text-white font-semibold transition-all duration-500 h-12"
  const loadingClasses = isLoading ? "w-12" : ""
  const successClasses = isSuccess && !showSuccessText ? "w-12" : ""
  const expandedSuccessClasses = isSuccess && showSuccessText ? "w-48" : ""
  const interactionClasses = isLoading || isSuccess ? "pointer-events-none" : ""

  return (
    <Button
      onClick={(event) => handleClick(event)}
      disabled={isLoading}
      className={cn(
        baseClasses,
        loadingClasses,
        successClasses,
        expandedSuccessClasses,
        interactionClasses,
        className
      )}
      style={{
        backgroundColor: isSuccess ? color[500] : "",
      }}
      {...props}
    >
      <div className="flex items-center gap-2">
        {isLoading ? (
          <Loader2 className="animate-spin" strokeWidth={4} />
        ) : isSuccess ? (
          <>
            <Check strokeWidth={4} />
            <span
              className={cn(
                "transition-all duration-300 overflow-hidden",
                showSuccessText
                  ? "max-w-48 opacity-100 translate-x-0"
                  : "max-w-0 opacity-0 -translate-x-4"
              )}
            >
              {buttonText}
            </span>
          </>
        ) : (
          <span>{buttonText}</span>
        )}
      </div>
    </Button>
  )
}
