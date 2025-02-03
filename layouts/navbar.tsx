import Link from "next/link"

export const Navbar = () => {
  return (
    <nav className="flex items-center gap-4 px-8">
      <Link href="/docs/introduction">Get Started</Link>
      <Link href="/docs/components/month-slider">Components</Link>
    </nav>
  )
}
