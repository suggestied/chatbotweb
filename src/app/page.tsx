"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { sendFirstMessage } from "@/supabase/functions"

export default function LandingPage() {
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await sendFirstMessage(input)

      const chatId = response.session_id;
      router.push(`/chat?id=${chatId}`)
    } catch (error) {
      console.error("Error:", error)
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome to AI Chatbot</CardTitle>
          <CardDescription>Start a conversation with our AI assistant</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-4">
              <Input
                type="text"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Starting Chat..." : "Start Chat"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

