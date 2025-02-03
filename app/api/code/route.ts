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

  // Replace the @ alias with the actual root directory path
  const filePath = file.toString().replace("@/", path.join(process.cwd(), "/"))

  try {
    const content = fs.readFileSync(filePath, "utf8")
    return NextResponse.json({ content })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({ error: "Failed to read file" }, { status: 500 })
  }
}
