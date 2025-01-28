import React from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeSanitize from "rehype-sanitize"
import rehypeHighlight from "rehype-highlight"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bot, User } from "lucide-react"
import { cn } from "@/lib/utils"

type Message = {
  id: string
  sender: "user" | "assistant"
  message: string
  session_id: string
  created_at?: string
}

interface ChatMessageProps {
  message: any
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.sender === "user"

  return (
    <div className={cn("flex mb-6", isUser ? "justify-end" : "justify-start")} key={message.id}>
      <div className={cn("flex items-start max-w-[85%] space-x-2", isUser && "flex-row-reverse space-x-reverse")}>
        <Avatar className="w-8 h-8 border-2 border-primary/10 flex items-center justify-center">
          {isUser ? <User className="w-5 h-5 text-primary" /> : <Bot className="w-5 h-5 text-primary" />}
        </Avatar>
        <div className={cn("rounded-lg p-4", isUser ? "bg-primary text-primary-foreground" : "bg-secondary")}>
          <ReactMarkdown
            className="prose dark:prose-invert max-w-none text-sm leading-relaxed"
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeSanitize, rehypeHighlight]}
            components={{
              a: ({ href, children }) => (
                <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  {children}
                </a>
              ),
              h1: ({ children }) => <h1 className="text-2xl font-bold mt-4 mb-2">{children}</h1>,
              h2: ({ children }) => <h2 className="text-xl font-bold mt-3 mb-2">{children}</h2>,
              h3: ({ children }) => <h3 className="text-lg font-bold mt-3 mb-1">{children}</h3>,
              h4: ({ children }) => <h4 className="text-base font-bold mt-2 mb-1">{children}</h4>,
              h5: ({ children }) => <h5 className="text-sm font-bold mt-2 mb-1">{children}</h5>,
              p: ({ children }) => <p className="mt-2 mb-2">{children}</p>,
              ul: ({ children }) => <ul className="list-disc pl-4 mt-2 mb-2 space-y-1">{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal pl-4 mt-2 mb-2 space-y-1">{children}</ol>,
              li: ({ children }) => <li className="mb-1">{children}</li>,
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-primary/50 pl-4 italic my-2 text-muted-foreground">
                  {children}
                </blockquote>
              ),
              code: ({ node, inline, className, children, ...props }) => (
                <code
                  className={cn(
                    "font-mono text-sm",
                    inline
                      ? "bg-muted text-primary-foreground rounded px-1 py-0.5"
                      : "block bg-muted text-primary-foreground rounded-md p-2 my-2 overflow-x-auto",
                  )}
                  {...props}
                >
                  {children}
                </code>
              ),
              pre: ({ children }) => <pre className="bg-muted rounded-md p-2 my-2 overflow-x-auto">{children}</pre>,
              table: ({ children }) => (
                <div className="overflow-x-auto my-4">
                  <table className="min-w-full divide-y divide-muted-foreground/20">{children}</table>
                </div>
              ),
              th: ({ children }) => (
                <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider">{children}</th>
              ),
              td: ({ children }) => <td className="px-3 py-2 whitespace-nowrap">{children}</td>,
            }}
          >
            {message.message}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  )
}

