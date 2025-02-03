import fs from "fs"
import { NextResponse } from "next/server"
import path from "path"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const file = searchParams.get("file")

  if (!file) {
    return NextResponse.json(
      { error: "File parameter is required" },
      { status: 400 }
    )
  }

  try {
    // Use path.join to create the correct file path
    const filePath = path.join(process.cwd(), file)

    const content = fs.readFileSync(filePath, "utf8")
    return NextResponse.json({ content })
  } catch (error) {
    console.error("Error reading file:", error)
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    return NextResponse.json(
      { error: "Failed to read file", details: errorMessage },
      { status: 500 }
    )
  }
}
