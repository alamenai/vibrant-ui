"use client"

import { ReactNode } from "react"
import { Card, CardContent } from "../ui/card"

type Props = {
  children: ReactNode
}

export const ComponentPreview = ({ children }: Props) => {
  return (
    <Card className="w-full h-fit p-8">
      <CardContent className="flex p-0 relative w-full items-center justify-center">
        {children}
      </CardContent>
    </Card>
  )
}
