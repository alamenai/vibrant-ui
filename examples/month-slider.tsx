"use client"

import { MonthSlider } from "@/components/vibrant/month-slider"
import { useQueryState } from "nuqs"
import { DefaultColors } from "tailwindcss/types/generated/colors"

export const MonthSliderExample = () => {
  const [value] = useQueryState("color")

  return (
    <MonthSlider colorScheme={(value as keyof DefaultColors) || "violet"} />
  )
}
