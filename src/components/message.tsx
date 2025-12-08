import { cn } from "@/lib/utils";

export default function Message({ message }: { message: Message }) {
  return (
    <div
      className={cn(
        "max-w-[75%] p-2 rounded-lg",
        message.role === "user"
          ? "bg-sky-500/90 rounded-br-none"
          : "bg-secondary rounded-tl-none"
      )}
    >
      <p
        className={cn(
          "text-sm",
          message.role === "user" ? "text-white" : "text-secondary-foreground"
        )}
      >
        {message.content}
      </p>

      {message.role === "user" && (
        <time
          className={cn(
            "text-xs mt-1.5 block",
            message.role === "user"
              ? "text-white/80 text-end"
              : "text-foreground/60"
          )}
        >
          {new Date(message.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </time>
      )}
    </div>
  );
}
