"use client"

import { AnimatePresence, motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { ReactNode, useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"

export type CardsAccordionProps = {
  title: string
  description: string
  content?: ReactNode
}

const defualtAccordionItems = [
  {
    title: "Accordion Item 1",
    description:
      "This is the description of the first accordion item. When expanded, this card will show more information and have a full border.",
  },
  {
    title: "Accordion Item 2",
    description:
      "This is the description of the second accordion item. Click on any card to expand it and see the full details.",
  },
  {
    title: "Accordion Item 3",
    description:
      "This is the description of the third accordion item. The animation makes the interaction feel smooth and responsive.",
  },
]
export const CardsAccordion = ({ items }: { items: CardsAccordionProps[] }) => {
  if (items.length === 0) {
    items = defualtAccordionItems
  }

  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  const getBorderClasses = (index: number) => {
    const isActive = activeIndex === index
    const isFirst = index === 0
    const isLast = index === (items || defualtAccordionItems).length - 1
    const isPrevActive = activeIndex === index - 1
    const isNextActive = activeIndex === index + 1

    if (isActive) {
      return "border rounded-3xl shadow-md"
    }

    // Handle first item
    if (isFirst) {
      return isNextActive
        ? "rounded-t-3xl rounded-b-3xl border-t border-x border-b shadow-none my-2"
        : "rounded-t-3xl rounded-b-none border-t border-x shadow-none"
    }

    // Handle last item
    if (isLast) {
      return isPrevActive
        ? "border-t rounded-t-3xl rounded-b-3xl border-x border-b my-2"
        : "border-t-0 rounded-t-none rounded-b-3xl border-x border-b"
    }

    // Handle middle items
    if (isPrevActive) {
      return "rounded-t-3xl rounded-b-none border-t border-x mt-2"
    }

    if (isNextActive) {
      return "border-t-0 rounded-t-none rounded-b-3xl border-x border-b mb-2"
    }

    return "rounded-none border-t-0 border-x"
  }

  return (
    <div className="max-w-lg">
      {(items || defualtAccordionItems).map((item, index) => (
        <motion.div key={index} className={getBorderClasses(index)}>
          <Card
            className="border-none shadow-none bg-transparent"
            onClick={() => toggleAccordion(index)}
          >
            <CardHeader className="flex-row justify-between pb-0 cursor-pointer">
              <div className="flex flex-col gap-2">
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>
                  {activeIndex !== index && (
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {item.description}
                    </p>
                  )}
                </CardDescription>
              </div>
              <motion.div
                animate={{ rotate: activeIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="h-5 w-5 text-gray-500" />
              </motion.div>
            </CardHeader>
            <CardContent className="pb-4">
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                      <div className="mt-4 pt-4 border-t">{item.content}</div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
