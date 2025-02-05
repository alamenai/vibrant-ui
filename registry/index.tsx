type FileRegistry = {
  [key: string]: FileContent
}

export type FileContent = {
  path: string
  type: "component" | "style" | "util"
}

export const fileRegistry: FileRegistry = {
  "month-slider.tsx": {
    path: "components/vibrant/month-slider.tsx",
    type: "component",
  },
  "rotate-cards.tsx": {
    path: "components/vibrant/rotate-cards.tsx",
    type: "component",
  },
}
