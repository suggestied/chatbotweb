"use client";
import { useEffect, useRef, useState } from "react";
import { ChatMessage } from "./message";
import { Button } from "./ui/button";
import { sendMessage as SendMessage } from "@/supabase/functions";

type Message = {
  id: string;
  sender: "user" | "assistant";
  message: string;
  session_id: string;
  created_at?: string;
};

interface ChatComponentProps {
  initialMessages: Message[];
  sessionId: string;
}

export function ChatComponent({ initialMessages = [], sessionId }: ChatComponentProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Function to scroll to the bottom of the chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll down whenever messages update
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: crypto.randomUUID(),
      sender: "user",
      message: input,
      session_id: sessionId,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    try {
      const response = await SendMessage(sessionId, input);

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          sender: "assistant",
          message: response.response,
          session_id: sessionId,
        },
      ]);
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className=" h-full flex flex-col justify-between overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 bg-white rounded-3xl mx-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="sticky bottom-0 flex items-center space-x-4 p-4 bg-neutral-200">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="border border-gray-300 p-2 w-full rounded-md"
        />
        <Button onClick={sendMessage}>Send</Button>
      </div>
    </div>
  );
}
