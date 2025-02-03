"use client"

import { Badge } from "@/components/ui/badge"
import data from "@/json/sidebar.json"
import Link from "next/link"
import { usePathname } from "next/navigation"

type SidebarItem = {
  id: number
  label: string
  link: string
  isNew?: boolean
  comingSoon?: boolean
}

type SideBarData = {
  headline: string
  items: SidebarItem[]
}[]

const Sidebar = () => {
  const router = usePathname()

  return (
    <div className="min-w-56 pl-8">
      {(data as SideBarData).map((section) => (
        <div key={section.headline} className="mb-8">
          <h2 className="font-semibold mb-4 text-[13px] text-violet-600">
            {section.headline}
          </h2>
          <ul>
            {section.items.map((item) => {
              const isActive = router === item.link // Check if the link is active
              const isNew = item?.isNew // Check if the item is new
              const isComingSoon = item?.comingSoon // Check if the item is coming soon

              return (
                <li key={item.id}>
                  <Link
                    href={isComingSoon ? "#" : item.link} // Disable link if coming soon
                    className={`flex items-center mb-2 text-[15px] ${
                      isActive ? "font-bold" : ""
                    } ${
                      isComingSoon
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-inherit"
                    }`}
                    aria-disabled={isComingSoon} // Mark as disabled for accessibility
                  >
                    <span className="w-full flex justify-between pr-8">
                      {item.label}
                      {isNew && ( // Add badge if the item is new
                        <Badge className="bg-rose-500 hover:bg-rose-500 cursor-default">
                          New
                        </Badge>
                      )}
                      {isComingSoon && ( // Add badge if the item is new
                        <Badge className="bg-violet-500 hover:bg-viole-500 cursor-default">
                          soon
                        </Badge>
                      )}
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default Sidebar
