"use client"

import { allComponents } from "@/.content-collections/generated"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { notFound, useParams, useRouter } from "next/navigation"
import { DocHeader } from "./doc-header"

export const ComponentDoc = () => {
  const params = useParams()
  const router = useRouter()

  // Find the component based on the slug from the URL
  const currentIndex = allComponents.findIndex(
    (post) => post._meta.path === params.slug
  )
  const post = allComponents[currentIndex]

  // Handle case where component is not found
  if (!post) {
    return notFound()
  }

  // Navigate to the next component
  const goToNext = () => {
    const nextIndex = currentIndex + 1
    if (nextIndex < allComponents.length) {
      router.push(`/docs/components/${allComponents[nextIndex]._meta.path}`)
    }
  }

  // Navigate to the previous component
  const goToPrevious = () => {
    const prevIndex = currentIndex - 1
    if (prevIndex >= 0) {
      router.push(`/docs/components/${allComponents[prevIndex]._meta.path}`)
    }
  }

  return (
    <article>
      <DocHeader post={post} />
      <post.mdx />
      <div className="w-full flex justify-between mt-5">
        <div>
          {currentIndex > 0 && (
            <Button
              variant="outline"
              className="rounded-full"
              onClick={goToPrevious}
            >
              <ArrowLeft />
              Previous
            </Button>
          )}
        </div>

        <div>
          {currentIndex < allComponents.length - 1 && (
            <Button
              variant="outline"
              className="rounded-full"
              onClick={goToNext}
            >
              Next
              <ArrowRight />
            </Button>
          )}
        </div>
      </div>
    </article>
  )
}
