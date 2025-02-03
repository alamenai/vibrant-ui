import { promises as fs } from "fs"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const fileName = searchParams.get("file")

  if (!fileName) {
    return NextResponse.json(
      { error: "File parameter is required" },
      { status: 400 }
    )
  }

  try {
    // Use path.join to create the correct file path
    const content = await fs.readFile(
      process.cwd() + `/app/components/vibrant/${fileName}`,
      "utf8"
    )

    return NextResponse.json({ content })
  } catch (error) {
    console.error("Error reading file:", error)
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error"
    return NextResponse.json(
      { error: "Failed to read file", details: errorMessage },
      { status: 500 }
    )
  }
}
