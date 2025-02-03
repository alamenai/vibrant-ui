import {
  createDefaultImport,
  defineCollection,
  defineConfig,
} from "@content-collections/core"

import { MDXContent } from "mdx/types"

// Collection for MDX files directly inside docs
const docs = defineCollection({
  name: "docs",
  directory: "docs",
  include: "*.mdx",
  exclude: "components/**/*.mdx", // Exclude files already handled by the components collection
  parser: "frontmatter",
  schema: () => ({}),
  transform: ({ _meta, ...post }) => {
    const mdx = createDefaultImport<MDXContent>(`@/docs/${_meta.filePath}`)
    return {
      ...post,
      _meta,
      mdx,
    }
  },
})

// Collection for components inside docs/components
const components = defineCollection({
  name: "components",
  directory: "docs/components",
  include: "*.mdx",
  parser: "frontmatter",
  schema: () => ({}),
  transform: ({ _meta, ...post }) => {
    const mdx = createDefaultImport<MDXContent>(
      `@/docs/components/${_meta.filePath}`
    )
    return {
      ...post,
      _meta,
      mdx,
    }
  },
})

export default defineConfig({
  collections: [components, docs],
})
