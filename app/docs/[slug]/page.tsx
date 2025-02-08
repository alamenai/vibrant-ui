import { allDocs } from "@/.content-collections/generated"
import { Doc } from "@/components/core/doc"
import { Metadata } from "next"

export type Props = {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = allDocs.find((post) => post._meta.path === slug)

  if (!post) {
    return {
      title: "Not Found | Vibrant UI",
      description: "The requested page could not be found.",
    }
  }

  return {
    title: `${post.title} | Vibrant UI`,
    description: post.description,
  }
}

export default function Page() {
  return <Doc />
}
