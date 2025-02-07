"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Check, Copy } from "lucide-react"
import { useEffect, useState } from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"

type Props = {
  source: string
  language?: string
}

export const CodeBlock = ({ source, language = "typescript" }: Props) => {
  const [code, setCode] = useState("")
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    const fetchCode = async () => {
      try {
        const response = await fetch(
          `/api/file?name=${encodeURIComponent(source)}`
        )
        const data = await response.json()

        if (!response.ok) {
          setError(data.error || "Failed to fetch file")
          setCode("")
          return
        }

        if (data.content) {
          setCode(data.content)
          setError("")
        }
      } catch {
        setError("Failed to fetch file content")
        setCode("")
      }
    }

    fetchCode()
  }, [source])

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  if (error) {
    return <div className="p-4 bg-red-50 text-red-600 rounded-lg">{error}</div>
  }

  return (
    <div className="relative w-full">
      <Button
        size="icon"
        onClick={copyToClipboard}
        className={cn(
          "absolute top-4 right-6 p-2 bg-white hover:bg-gray-100 transition-colors rounded-full",
          isExpanded && "right-2"
        )}
        aria-label="Copy code"
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-500" />
        ) : (
          <Copy className="w-4 h-4 text-black" />
        )}
      </Button>

      <SyntaxHighlighter
        language={language}
        style={oneDark}
        className={cn("w-full", isExpanded ? "h-full" : "h-[480px]")}
      >
        {code}
      </SyntaxHighlighter>

      <div className="absolute bottom-0 left-0 right-4 flex justify-center pb-2">
        <div
          className={cn(
            "backdrop-blur-sm bg-transparent p-1 w-full h-16 flex items-center justify-center",
            isExpanded && "backdrop-blur-none"
          )}
        >
          <Button
            onClick={() => setIsExpanded(!isExpanded)}
            className="bg-white hover:bg-gray-100 text-black rounded-full"
            size="sm"
          >
            {isExpanded ? "Show Less" : "Show All"}
          </Button>
        </div>
      </div>
    </div>
  )
}
