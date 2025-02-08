import Image from "next/image"
import Link from "next/link"

import logo from "@/public/v-logo.svg"

export const Logo = () => {
  return (
    <Link href="/" className="flex relative items-center gap-2">
      <Image src={logo} width={24} height={24} alt="app logo" />
      <span className="text-nowrap">Vibrant UI</span>
    </Link>
  )
}
