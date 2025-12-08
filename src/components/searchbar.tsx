"use client";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useSession } from "next-auth/react";

export default function Searchbar({
  setCurrentMessages,
}: {
  setCurrentMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}) {
  const [input, setInput] = useState<string>("");
  const session = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handleSend() {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");

    const tempUserMsg: Message = {
      id: `temp-${Date.now()}`,
      content: userMessage,
      role: "user",
      createdAt: new Date(),
    };

    setCurrentMessages((prev) => [...prev, tempUserMsg]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: userMessage, role: "user" }),
      });

      const data = await response.json();

      if (data.success) {
        const aiMessage: Message = {
          id: data.aiMessageId,
          content: data.aiMessage,
          role: "assistant",
          createdAt: new Date(data.timestamp),
        };

        setCurrentMessages((prev) => [...prev, aiMessage]);
      }
    } catch (error) {
      console.error("Failed to send message:", error);
      setCurrentMessages((prev) =>
        prev.filter((msg) => msg.id !== tempUserMsg.id)
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center dark:bg-neutral-900 bg-neutral-100 rounded-lg border relative shadow-md">
      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
          }
        }}
        placeholder={
          session.status === "unauthenticated"
            ? "Please sign in to ask questions..."
            : isLoading
            ? "AI is responding..."
            : "Ask a diet-related question..."
        }
        className="min-h-13 max-h-[100px] lg:max-h-[200px] resize-none border-none pr-20"
        rows={1}
        disabled={session.status === "unauthenticated" || isLoading}
      />
      <Button
        onClick={handleSend}
        size="icon"
        className="absolute z-0 right-2 bottom-2"
        disabled={
          session.status === "unauthenticated" || isLoading || !input.trim()
        }
      >
        <Send className="h-4 w-4" />
      </Button>
    </div>
  );
}
