"use client"

import { Card, CardContent } from "../ui/card"
import { CodeBlock } from "./code-block"

type Props = {
  source: string
}

export const ComponentSource = ({ source }: Props) => {
  return (
    <Card className=" w-full h-full pr-0">
      <CardContent className="flex p-4 pr-0">
        <CodeBlock source={source} />
      </CardContent>
    </Card>
  )
}
