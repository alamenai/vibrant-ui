"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"

export const Navbar = () => {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <nav className="flex items-center gap-4 px-8 w-full justify-start">
      <Link
        href="/docs/introduction"
        className={`${
          isActive("/docs/introduction")
            ? "text-rose-600 font-medium"
            : "text-gray-500 hover:text-gray-900"
        }`}
      >
        Get Started
      </Link>
      <Link
        href="/docs/components/month-slider"
        className={`${
          isActive("/docs/components/month-slider")
            ? "text-rose-600 font-medium"
            : "text-gray-500 hover:text-gray-900"
        }`}
      >
        Components
      </Link>
      <Link
        href="https://github.com/alamenai/vibrant-ui/discussions"
        target="_blank"
        className="text-gray-500 hover:text-gray-900"
      >
        <span className="flex  relative items-center self-end">
          Discussions
        </span>
      </Link>
      <Link
        href="https://github.com/alamenai/vibrant-ui/issues"
        target="_blank"
        className="ml-auto"
      >
        <Button>Feedback</Button>
      </Link>
    </nav>
  )
}
