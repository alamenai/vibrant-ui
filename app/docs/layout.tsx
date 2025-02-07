import Sidebar from "@/layouts/sidebar"
import { ReactNode } from "react"

const DocLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex pl-24 pr-96 min-h-screen gap-20 py-4">
      <Sidebar />
      <div className="min-w-full">{children}</div>
    </main>
  )
}

export default DocLayout
