// app/api/file/route.ts
import { getRegistry } from "@/lib/registry"
import { promises as fs } from "fs"
import { NextRequest, NextResponse } from "next/server"
import path from "path"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const fileName = searchParams.get("fileName")

  if (!fileName) {
    return NextResponse.json(
      { error: "File parameter is required" },
      { status: 400 }
    )
  }

  try {
    // Get registry and validate file exists
    const registry = await getRegistry()

    if (!registry.files[fileName]) {
      return NextResponse.json(
        { error: "File not found in registry" },
        { status: 404 }
      )
    }

    const filePath = registry.files[fileName].path
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
