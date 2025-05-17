"use client"

import { Button } from "@/components/ui/button"
import { POSITIONS, TourCard } from "@/components/vibrant/onboarding-tour"
import { Layout, Plus, User } from "lucide-react"
import { useRef, useState } from "react"

export const OnboardingTourDemo = () => {
  const [isOnboarding, setIsOnboarding] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 3

  // References to the UI elements we want to highlight
  const buttonRefs = [
    useRef<HTMLButtonElement | null>(null), // First button
    useRef<HTMLButtonElement | null>(null), // Second button
    useRef<HTMLButtonElement | null>(null), // Third button
  ]

  const handlePrevious = () => {
    const prevStep = Math.max(currentStep - 1, 1)
    setCurrentStep(prevStep)
  }

  const handleNext = () => {
    const nextStep = Math.min(currentStep + 1, totalSteps + 1)

    if (nextStep > totalSteps) {
      // End the onboarding
      setIsOnboarding(false)
    } else {
      setCurrentStep(nextStep)
    }
  }

  const startOnboarding = () => {
    setCurrentStep(1)
    setIsOnboarding(true)
  }

  // Card content for each step
  const getCardContent = (step: number) => {
    switch (step) {
      case 1:
        return "This is the dashboard feature that gives you an overview of all your activities."
      case 2:
        return "Use this button to create new projects and organize your work."
      case 3:
        return "Access your profile settings and preferences here."
      default:
        return ""
    }
  }

  // Card positions for each step
  const getCardPosition = (step: number) => {
    switch (step) {
      case 1:
        return POSITIONS.RIGHT
      case 2:
        return POSITIONS.BOTTOM
      case 3:
        return POSITIONS.LEFT
      default:
        return POSITIONS.RIGHT
    }
  }

  return (
    <div className="relative flex flex-col items-center">
      <div className="mb-16">
        <Button onClick={startOnboarding}>Start Tour</Button>
      </div>

      <div className="flex gap-32 items-center justify-start">
        <Button
          variant="outline"
          ref={buttonRefs[0]}
          className="flex gap-2 items-center"
        >
          <Layout />
          Dashboard
        </Button>

        <Button
          variant="outline"
          ref={buttonRefs[1]}
          className="flex gap-2 items-center"
        >
          <Plus />
          New Project
        </Button>

        <Button
          variant="outline"
          ref={buttonRefs[2]}
          className="flex gap-2 items-center"
        >
          <User />
          Profile
        </Button>
      </div>

      {isOnboarding &&
        currentStep <= totalSteps &&
        buttonRefs[currentStep - 1]?.current && (
          <TourCard
            title={`Feature ${currentStep} of ${totalSteps}`}
            description="Learn about this feature"
            onPrevious={handlePrevious}
            onNext={handleNext}
            position={getCardPosition(currentStep)}
            showPrevious={currentStep > 1}
            showNext={true}
            nextText={currentStep === totalSteps ? "Finish" : "Next"}
            currentStep={currentStep}
            totalSteps={totalSteps}
            targetRef={buttonRefs[currentStep - 1]}
            offset={16}
            zIndex={50}
          >
            {getCardContent(currentStep)}
          </TourCard>
        )}
    </div>
  )
}
