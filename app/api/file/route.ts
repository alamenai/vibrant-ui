import { fileRegistry } from "@/registry"
import { getFilePath } from "@/registry/helpers"
import { promises as fs } from "fs"
import { NextRequest, NextResponse } from "next/server"
import path from "path"
import { z } from "zod"

const fileSchema = z.object({
  fileName: z
    .string()
    .min(1)
    .refine((fileName) => fileName in fileRegistry, {
      message: "File not found in registry",
    }),
})

export async function GET(request: NextRequest) {
  // Get fileName from search params
  const searchParams = request.nextUrl.searchParams
  const fileName = searchParams.get("fileName")

  if (!fileName) {
    return NextResponse.json(
      { error: "File parameter is required" },
      { status: 400 }
    )
  }

  try {
    fileSchema.parse({ fileName })
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof z.ZodError
            ? error.errors[0].message
            : "Invalid file parameter",
      },
      { status: 400 }
    )
  }

  try {
    const filePath = getFilePath(fileName)
    if (!filePath) {
      return NextResponse.json(
        { error: "File not found in registry" },
        { status: 404 }
      )
    }

    const fullPath = path.join(process.cwd(), filePath)
    const content = await fs.readFile(fullPath, "utf8")

    return NextResponse.json({ content })
  } catch (error) {
    console.error("Error reading file:", error)
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error"

    return NextResponse.json(
      {
        error: "Failed to read file",
        details: errorMessage,
      },
      { status: 500 }
    )
  }
}
