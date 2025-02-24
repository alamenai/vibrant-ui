"use client"

import { ReactNode } from "react"
import { Card, CardContent } from "../ui/card"

type Props = {
  children: ReactNode
}

export const ComponentPreview = ({ children }: Props) => {
  return (
    <Card className="w-full h-fit relative">
      <CardContent className="flex p-8 relative w-full items-center justify-center">
        {children}
      </CardContent>
    </Card>
  )
}
