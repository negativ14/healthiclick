"use client";

import { SessionProvider } from "next-auth/react";
import { ComponentProps } from "react";

export default function SessionProviderWrapper({
  children,
  ...props
}: ComponentProps<typeof SessionProvider>) {
  return <SessionProvider {...props}>{children}</SessionProvider>;
}
