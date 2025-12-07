"use client";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Searchbar() {
  const [input, setInput] = useState<string>("");

  function handleSend() {
    //doo something
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
        placeholder="Ask a diet-related question..."
        className="min-h-13 max-h-[200px] resize-none border-none pr-20"
        rows={1}
        //session not disable
      />
      <Button onClick={handleSend} size="icon" className="absolute z-0 right-2 bottom-2">
        <Send className="h-4 w-4" />
      </Button>
    </div>
  );
}
