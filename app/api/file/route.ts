import fs from "fs/promises"
import { NextRequest, NextResponse } from "next/server"
import path from "path"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const fileName = searchParams.get("name")

  if (!fileName) {
    return NextResponse.json(
      { error: "File parameter is required" },
      { status: 400 },
    )
  }

  try {
    const fullPath = path.join(process.cwd(), fileName)

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
      { status: 500 },
    )
  }
}
