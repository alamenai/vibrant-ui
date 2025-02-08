"use client"

import { cn } from "@/lib/utils"
import { Bug, Check, Copy } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"
import { Button } from "../ui/button"

type Props = {
  source: string
  language?: string
  expanded?: boolean
}

interface CustomSyntaxHighliter extends SyntaxHighlighter {
  scrollTop: number
}

export const CodeBlock = ({
  source,
  language = "typescript",
  expanded = false,
}: Props) => {
  const [code, setCode] = useState("")
  const [copied, setCopied] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const highlighterRef = useRef<CustomSyntaxHighliter>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCode = async () => {
      try {
        const api = `/api/file?name=${encodeURIComponent(source)}`
        const response = await fetch(api)
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

  useEffect(() => {
    if (!isExpanded) {
      if (highlighterRef.current) {
        highlighterRef.current.scrollTop = 0
      }
    }
  }, [isExpanded])

  if (error) {
    return <div className="p-4 bg-red-50 text-red-600 rounded-lg">{error}</div>
  }

  return (
    <div className="flex flex-col relative w-full">
      <div
        className={cn(
          "flex items-center gap-2 absolute top-4 right-2",
          !expanded && isExpanded && "right-6",
        )}
      >
        <Link
          href="https://github.com/alamenai/vibrant-ui/issues"
          target="_blank"
        >
          <Button
            size="icon"
            onClick={copyToClipboard}
            className={cn(
              "ap-2 bg-white hover:bg-gray-100 transition-colors rounded-full",
            )}
            aria-label="Copy code"
          >
            <Bug className="w-4 h-4 text-rose-500" />
          </Button>
        </Link>

        <Button
          size="icon"
          onClick={copyToClipboard}
          className={cn(
            "p-2 bg-white hover:bg-gray-100 transition-colors rounded-full",
          )}
          aria-label="Copy code"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-500" />
          ) : (
            <Copy className="w-4 h-4 text-black" />
          )}
        </Button>
      </div>

      <SyntaxHighlighter
        ref={highlighterRef}
        language={language}
        style={oneDark}
        className={cn(
          "rounded-md",
          expanded
            ? "h-full min-h-48"
            : isExpanded
              ? "h-[680px]"
              : "!overflow-hidden h-[480px]",
        )}
      >
        {code}
      </SyntaxHighlighter>

      {!expanded && (
        <div
          className={cn(
            `absolute right-0 top-2 bottom-4 left-0 w-full h-full backdrop-blur-sm bg-black/20 flex items-center justify-center rounded-md`,
            isExpanded && "backdrop-blur-none bottom-10 h-0 top-auto",
          )}
        >
          <Button
            onClick={() => setIsExpanded(!isExpanded)}
            className="bg-white hover:bg-gray-100 text-black rounded-full"
            size="sm"
          >
            {isExpanded ? <>Hide Code</> : <>Show Code</>}
          </Button>
        </div>
      )}
    </div>
  )
}
