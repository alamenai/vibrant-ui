"use client"

import { allDocs } from "@/.content-collections/generated"
import { notFound, useParams } from "next/navigation"
import { DocHeader } from "./doc-header"

export const Doc = () => {
  const params = useParams()

  // Find the component based on the slug from the URL
  const post = allDocs.find((post) => post._meta.path === params.slug)

  // Handle case where component is not found
  if (!post) {
    return notFound() // This will trigger the not-found page
  }

  const MdxContent = post.mdx
  return (
    <article>
      <DocHeader post={post} />
      <MdxContent />
    </article>
  )
}
