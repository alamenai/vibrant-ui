"use client"

import { cn } from "@/lib/utils"
import { Check, Copy } from "lucide-react"
import { useEffect, useState } from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"
import { Button } from "../ui/button"

type Props = {
  source: string
  language?: string
}

export const CodeBlock = ({ source, language = "typescript" }: Props) => {
  const url = `/api/code?file=${encodeURIComponent(
    `components/vibrant/${source}`
  )}`
  const [code, setCode] = useState("")
  const [copied, setCopied] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setCode(data.content))
  }, [url])

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
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
        className={`w-full ${isExpanded ? "h-full" : "h-[480px]"}`}
      >
        {code}
      </SyntaxHighlighter>

      <div className="absolute bottom-0 left-0 right-4 flex justify-center pb-2">
        <div
          className={cn(
            `backdrop-blur-sm bg-transparent p-1 w-full h-16 flex items-center justify-center`,
            isExpanded && "backdrop-blur-none"
          )}
        >
          <Button
            onClick={() => setIsExpanded(!isExpanded)}
            className="bg-white hover:bg-gray-100 text-black rounded-full"
            size="sm"
          >
            {isExpanded ? <>Show Less</> : <>Show All</>}
          </Button>
        </div>
      </div>
    </div>
  )
}
