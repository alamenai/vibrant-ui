import WavyText from "@/components/core/landing/wavy-text"
import { Button } from "@/components/ui/button"
import { ArrowRight, FlaskConical, Github } from "lucide-react"
import Link from "next/link"

export const Hero = () => {
  return (
    <div className="mt-8 flex flex-col items-center">
      <Link
        href={"/docs/components/cards-accordion"}
        className="relative p-[2px] rounded-full bg-gradient-to-r from-violet-600 via-purple-500 to-rose-500 animate-[borderFlow_3s_linear_infinite]"
      >
        <div className="flex items-center rounded-full px-3 py-1 text-xs font-bold text-white">
          <FlaskConical size={18} className="mr-2" />
          Introducing Cards Accordion
          <ArrowRight className="ml-2" size={16} />
        </div>
      </Link>
      <WavyText text="More Interactive." />
      <p className="text-xl max-w-2xl text-center">
        Modern, animated, and interactive components built for design engineers.
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
