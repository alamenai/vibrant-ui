import WavyText from "@/components/core/landing/wavy-text"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github } from "lucide-react"
import Link from "next/link"

export const Hero = () => {
  return (
    <div className="mt-8 flex flex-col items-center">
      <Badge className="bg-rose-500 hover:bg-rose-500 text-sm">
        Built for Design Engineers
      </Badge>
      <WavyText text="Create Vibrant User Interfaces" />
      <p className="text-2xl max-w-2xl text-center">
        Modern, animated, and interactive components to make your interfaces
        vibrant and visually stunning.
      </p>
      <div className="flex gap-2">
        <Link href="/docs/components/month-slider">
          <Button className="bg-violet-600 hover:bg-violet-700 rounded-full mt-8">
            Browse Components
          </Button>
        </Link>
        <Link href="https://github.com/alamenai/vibrant-ui" target="_blank">
          <Button variant="outline" className="rounded-full mt-8">
            <Github /> See on Github
          </Button>
        </Link>
      </div>
    </div>
  )
}
