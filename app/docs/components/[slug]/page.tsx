import { allComponents } from "@/.content-collections/generated"
import { ComponentDoc } from "@/components/core/component-doc"
import { Metadata } from "next"
import { Props } from "../../[slug]/page"

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = allComponents.find((post) => post._meta.path === slug)

  if (!post) {
    return {
      title: "Not Found | Vibrant UI",
      description: "The requested page could not be found.",
    }
  }

  return {
    title: `${post._meta.fileName
      .replace(".mdx", "")
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")} | Vibrant UI`,
    description: post.description,
  }
}

export default function Page() {
  return <ComponentDoc />
}
