import { FileContent, fileRegistry } from "."

/* eslint-disable @typescript-eslint/no-unused-vars */

export function getFilePath(fileName: string): string | null {
  const file = fileRegistry[fileName]
  if (!file) return null
  return file.path
}

export function getFilesByType(type: FileContent["type"]): string[] {
  return Object.entries(fileRegistry)
    .filter(([_, value]) => value.type === type)
    .map(([key, _]) => key)
}
