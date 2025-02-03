"use server"

import { promises as fs } from "fs"
import path from "path"
import { z } from "zod"

// Define the response type
type CodeResponse = {
  content?: string
  error?: string
  details?: string
}

// Validation schema
const fileSchema = z.object({
  fileName: z.string().min(1),
})

export async function getFileContent(fileName: string): Promise<CodeResponse> {
  // Validate input
  try {
    fileSchema.parse({ fileName })
  } catch {
    return {
      error: "File parameter is required",
    }
  }

  try {
    // Use path.join for safe path concatenation
    const filePath = path.join(process.cwd(), "components", "vibrant", fileName)

    const content = await fs.readFile(filePath, "utf8")

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
