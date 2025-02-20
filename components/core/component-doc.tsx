"use client"

import { allComponents } from "@/.content-collections/generated"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { notFound, useParams, useRouter } from "next/navigation"
import { DocHeader } from "./doc-header"

import navigationItems from "@/json/sidebar.json"

// Get the ordered components based on navigation items
const orderedComponents = [...allComponents].sort((a, b) => {
  const componentsSection = navigationItems.find(
    (section) => section.headline === "Components"
  )
  if (!componentsSection) return 0

  const itemA = componentsSection.items.find((item) =>
    item.link.endsWith(a._meta.path)
  )
  const itemB = componentsSection.items.find((item) =>
    item.link.endsWith(b._meta.path)
  )

  const orderA = itemA?.id ?? Number.MAX_SAFE_INTEGER
  const orderB = itemB?.id ?? Number.MAX_SAFE_INTEGER

  return orderA - orderB
})

export const ComponentDoc = () => {
  const params = useParams()
  const router = useRouter()

  // Find the component based on the slug from the URL
  const currentIndex = orderedComponents.findIndex(
    (post) => post._meta.path === params.slug
  )
  const doc = orderedComponents[currentIndex]

  if (!doc) {
    return notFound()
  }

  // Navigate to the next component
  const goToNext = () => {
    const nextIndex = currentIndex + 1
    if (nextIndex < orderedComponents.length) {
      router.push(`/docs/components/${orderedComponents[nextIndex]._meta.path}`)
    }
  }

  // Navigate to the previous component
  const goToPrevious = () => {
    const prevIndex = currentIndex - 1
    if (prevIndex >= 0) {
      router.push(`/docs/components/${orderedComponents[prevIndex]._meta.path}`)
    }
  }

  return (
    <article>
      <DocHeader doc={doc} />
      <doc.mdx />
      <div className="w-full flex justify-between mt-5">
        <div>
          {currentIndex > 0 && (
            <Button
              variant="outline"
              className="rounded-full"
              onClick={goToPrevious}
            >
              <ArrowLeft className="mr-2" />
              Previous
            </Button>
          )}
        </div>

        <div>
          {currentIndex < orderedComponents.length - 1 && (
            <Button
              variant="outline"
              className="rounded-full"
              onClick={goToNext}
            >
              Next
              <ArrowRight className="ml-2" />
            </Button>
          )}
        </div>
      </div>
    </article>
  )
}
