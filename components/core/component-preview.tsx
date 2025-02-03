"use client"

import { ReactNode } from "react"
import { Card, CardContent } from "../ui/card"

type Props = {
  children: ReactNode
}

export const ComponentPreview = ({ children }: Props) => {
  return (
    <Card className="w-full h-full flex items-center justify-center">
      <CardContent className="flex p-8">{children}</CardContent>
    </Card>
  )
}
