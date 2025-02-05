import { promises } from "fs"
import path from "path"

type FileContent = {
  path: string
  type: "component" | "style" | "util"
}

type FileRegistry = {
  files: {
    [key: string]: FileContent
  }
}

export async function getRegistry(): Promise<FileRegistry> {
  try {
    // In server-side code (API routes), we need to use fs
    if (typeof window === "undefined") {
      const registryPath = path.join(
        process.cwd(),
        "public",
        "registry",
        "file-paths.json"
      )
      const data = await promises.readFile(registryPath, "utf8")
      return JSON.parse(data)
    }

    // In client-side code, we use fetch
    const response = await fetch("/registry/file-paths.json")
    if (!response.ok) {
      throw new Error("Failed to load registry")
    }
    return response.json()
  } catch (error) {
    console.error("Error loading registry:", error)
    return { files: {} }
  }
}

export async function getFilePath(fileName: string): Promise<string | null> {
  const registry = await getRegistry()
  return registry.files[fileName]?.path || null
}
