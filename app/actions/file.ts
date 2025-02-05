"use server"

import { getFilePath } from "@/registry/helpers"
import { fileRegistry } from "@/registry/index"
import { promises as fs } from "fs"
import path from "path"
import { z } from "zod"

type CodeResponse = {
  content?: string
  error?: string
  details?: string
}

const fileSchema = z.object({
  fileName: z
    .string()
    .min(1)
    .refine((fileName) => fileName in fileRegistry, {
      message: "File not found in registry",
    }),
})

export async function getFileContent(fileName: string): Promise<CodeResponse> {
  try {
    fileSchema.parse({ fileName })
  } catch (error) {
    return {
      error:
        error instanceof z.ZodError
          ? error.errors[0].message
          : "File parameter is required",
    }
  }

  try {
    const filePath = getFilePath(fileName)
    if (!filePath) {
      return {
        error: "File not found in registry",
      }
    }

    // Use path.join for safe path concatenation
    const fullPath = path.join(process.cwd(), filePath)

    const content = await fs.readFile(fullPath, "utf8")

    return { content }
  } catch (error) {
    console.error("Error reading file:", error)
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error"

    return {
      error: "Failed to read file",
      details: errorMessage,
    }
  }
}
