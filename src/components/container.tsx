import { cn } from "@/lib/utils";
import React from "react";

export default function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl mx-auto px-4 md:px-8 lg:px-16", className)}>
      {children}
    </div>
  );
}
