"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { MonthSlider } from "@/components/vibrant/month-slider"
import { Hero } from "@/layouts/hero"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

const Page = () => {
  return (
    <div className="flex flex-col items-center overflow-x-hidden">
      <Hero />
      <Card className="rounded-2xl my-8">
        <CardHeader className="flex-row relative w-full items-center justify-between">
          <CardTitle>Month Slider</CardTitle>
          <Badge className="absolute right-4 bg-rose-500 hover:bg-rose-600">
            New
          </Badge>
        </CardHeader>
        <CardContent>
          <MonthSlider />
        </CardContent>
        <CardFooter>
          <Link href="/docs/components/month-slider" className="w-full">
            <Button
              variant="outline"
              className="w-full rounded-full items-center relative bg-slate-50 border-none font-semibold"
            >
              Try it now
              <ArrowRight className="absolute right-3" />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Page
