import { Banner } from "@/components/core/marketing/banner"
import { Footer } from "@/layouts/footer"
import { Header } from "@/layouts/header"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { NuqsAdapter } from "nuqs/adapters/next/app"
import "prismjs/themes/prism-tomorrow.css"
import "./globals.css"

// Or any other theme you prefer
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Vibrant UI",
  description:
    "Modern, animated, and ready-to-use components to make your interfaces vibrant and visually stunning.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Banner />
        <Header />
        <NuqsAdapter>
          <main>{children}</main>
        </NuqsAdapter>
        <Footer />
      </body>
    </html>
  )
}
