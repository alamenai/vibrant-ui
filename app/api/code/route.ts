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
    // Use a more specific path resolution
    const basePath =
      process.env.NODE_ENV === "production"
        ? path.join(process.cwd(), ".next/server/app")
        : process.cwd()

    const filePath = file.toString().replace("@/", "").replace(/\\/g, "/")

    const fullPath = path.join(basePath, filePath)

    // Add some logging in production
    console.log("Attempting to read file:", fullPath)

    const content = fs.readFileSync(fullPath, "utf8")
    return NextResponse.json({ content })
  } catch (error) {
    console.error("File read error:", error)
    return NextResponse.json({ error: "Failed to read file" }, { status: 500 })
  }
}
