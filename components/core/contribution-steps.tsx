"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Badge } from "../ui/badge"

type DescriptionTextPart = {
  type: "text"
  text: string
}

type DescriptionLinkPart = {
  type: "link"
  text: string
  href: string
}

type DescriptionPart = DescriptionTextPart | DescriptionLinkPart

type ContributionStep = {
  title: string
  description: DescriptionPart[]
}

export const ContributionSteps = () => {
  const steps: ContributionStep[] = [
    {
      title: "Create Component",
      description: [
        { text: "Go to ", type: "text" },
        {
          text: "vibrant folder",
          type: "link",
          href: "https://github.com/alamenai/vibrant-ui/tree/main/components/vibrant",
        },
        { text: " and implement your component.", type: "text" },
      ],
    },
    {
      title: "Create Example",
      description: [
        { text: "Go to ", type: "text" },
        {
          text: "examples folder",
          type: "link",
          href: "https://github.com/alamenai/vibrant-ui/tree/main/examples",
        },
        {
          text: " and create an example of usage of your component.",
          type: "text",
        },
      ],
    },
    {
      title: "Write Documentation",
      description: [
        { text: "Go to ", type: "text" },
        {
          text: "components folder",
          type: "link",
          href: "https://github.com/alamenai/vibrant-ui/tree/main/docs/components",
        },
        {
          text: " and write the documentation. Use this ",
          type: "text",
        },
        {
          text: "template",
          type: "link",
          href: "https://github.com/alamenai/vibrant-ui/blob/main/docs/template.mdx",
        },
        { text: ".", type: "text" },
      ],
    },
    {
      title: "Add Component",
      description: [
        { text: "Go to ", type: "text" },
        {
          text: "sidebar.json",
          type: "link",
          href: "https://github.com/alamenai/vibrant-ui/blob/main/json/sidebar.json",
        },
        { text: " and add your component to the items list.", type: "text" },
      ],
    },
  ]

  const renderDescriptionPart = (part: DescriptionPart, index: number) => {
    if (part.type === "link") {
      return (
        <Link
          key={index}
          href={part.href}
          className="text-rose-600 hover:text-rose-800"
          rel="noopener noreferrer"
          target="_blank"
        >
          {part.text}
        </Link>
      )
    }
    return <span key={index}>{part.text}</span>
  }

  return (
    <div className="w-full py-2">
      <div className="flex gap-8">
        {steps.map((step, index) => (
          <div key={index} className="relative">
            <Card className="border-violet-500 w-full h-full">
              <CardHeader className="pb-2">
                <CardTitle className="font-semibold tracking-normal text-violet-600 text-nowrap">
                  <Badge className="rounded-full w-8 h-8 text-base items-center justify-center mr-2 bg-violet-500 hover:bg-violet-600">
                    {index + 1}
                  </Badge>
                  {step.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="mt-2 text-sm">
                <p>{step.description.map(renderDescriptionPart)}</p>
              </CardContent>
            </Card>
            {index < steps.length - 1 && (
              <div className="absolute right-0 top-1/2 translate-y-1/2 w-8 h-px bg-rose-600 border-dashed bottom-0 translate-x-full" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ContributionSteps
