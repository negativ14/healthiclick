"use client";
export const dynamic = "force-dynamic";
import Container from "@/components/container";
import Message from "@/components/message";
import Searchbar from "@/components/searchbar";
import { DetailedShimmerInput } from "@/components/ui/skeletons/input-shrimmer";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const { status } = useSession();
  const [currentMessages, setCurrentMessages] = useState<Message[]>([]);
  const [isFetchingMessages, setIsFetchingMessages] = useState<boolean>(true);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentMessages]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (status === "authenticated") {
        try {
          setIsFetchingMessages(true);
          const response = await fetch("/api/get-messages");
          const data = await response.json();

          if (data.success) {
            setCurrentMessages(data.messages);
          }
        } catch (error) {
          console.error("Failed to fetch messages:", error);
        } finally {
          setIsFetchingMessages(false);
        }
      } else if (status === "unauthenticated") {
        setIsFetchingMessages(false);
      }
    };

    fetchMessages();
  }, [status]);

  const sortedMessages = [...currentMessages].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  if (status === "loading" || isFetchingMessages) {
    return (
      <Container className="w-screen h-screen flex flex-col justify-between pb-10">
        <div className="flex-1 flex items-center justify-center">
          <Loader className="animate-spin" />
        </div>
        <DetailedShimmerInput />
      </Container>
    );
  }

  return (
    <main className="">
      <Container className="flex flex-col h-[94vh] pb-10">
        <div className="flex-1 py-4 overflow-y-scroll flex flex-col gap-8 no-scrollbar">
          {sortedMessages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              {status === "unauthenticated"
                ? "Please sign in to start chatting"
                : "No messages yet. Start a conversation!"}
            </div>
          ) : (
            sortedMessages.map((message, index) => (
              <div
                className={cn(
                  "flex",
                  message.role === "user" ? "justify-end" : "justify-start"
                )}
                key={index}
              >
                <Message message={message} />
              </div>
            ))
          )}
          <div ref={bottomRef} />
        </div>
        <Searchbar setCurrentMessages={setCurrentMessages} />
      </Container>
    </main>
  );
}
