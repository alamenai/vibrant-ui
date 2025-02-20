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
  const doc = allDocs.find((post) => post._meta.path === slug)

  if (!doc) {
    return {
      title: "Not Found | Vibrant UI",
      description: "The requested page could not be found.",
    }
  }

  return {
    title: `${doc.title} | Vibrant UI`,
    description: doc.description,
  }
}

export default function Page() {
  return <Doc />
}
