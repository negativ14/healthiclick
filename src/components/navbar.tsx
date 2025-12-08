"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Container from "./container";
import { Button } from "./ui/button";
import ModeToggle from "./ui/toggle-mode";
import GoogleIcon from "@/assets/icons/google";
import Image from "next/image";
import { LogOut } from "lucide-react";

export default function Navbar() {
  const session = useSession();
  console.log("from client navbar session", session);
  return (
    <header className="border-b">
      <Container className="py-2 flex items-center justify-between">
        <div className="flex-1">
          {session.status === "unauthenticated" && (
            <Button
              className="cursor-pointer"
              variant="secondary"
              onClick={async () =>
                await signIn("google", undefined, { prompt: "select_account" })
              }
            >
              Sign in with
              <GoogleIcon />
            </Button>
          )}

          {session.status === "authenticated" && (
            <div className="flex items-center gap-2">
              <Image
                src={session.data.user.image!}
                alt="user img"
                width={10}
                height={10}
                className="size-9 object-cover rounded-full border"
              />
              <div className="flex flex-col">
                <p className="text-sm text-foreground/80 font-medium tracking-tight">
                  {session.data.user.name}
                </p>
                <p className="text-xs text-muted-foreground tracking-wide whitespace-nowrap truncate">
                  {session.data.user.email}
                </p>
              </div>
            </div>
          )}

          {session.status === "loading" && (
            <div className="animate-pulse flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gray-300 dark:bg-neutral-700" />
              <div className="flex flex-col gap-1">
                <div className="w-28 h-3 bg-gray-300 dark:bg-neutral-700 rounded" />
                <div className="w-20 h-3 bg-gray-300 dark:bg-neutral-700 rounded" />
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <ModeToggle />

          {session.status === "authenticated" && (
            <Button
              className="text-foreground/80"
              onClick={() =>
                signOut({
                  callbackUrl: "/",
                  redirect: true,
                })
              }
              variant={"ghost"}
              size={"icon"}
            >
              {" "}
              <LogOut />{" "}
            </Button>
          )}
        </div>
      </Container>
    </header>
  );
}
