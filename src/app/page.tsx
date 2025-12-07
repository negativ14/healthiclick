"use client";
import Container from "@/components/container";
import Searchbar from "@/components/searchbar";
import { Loader } from "lucide-react";
import { useSession } from "next-auth/react";

export default function Home() {
  const { status } = useSession();

  if (status === "loading") {
    return (
      <Container className="w-screen h-screen animate-spin flex items-center justify-center">
        <Loader />
      </Container>
    );
  }
  return (
    <main className="">
      <Container className="flex flex-col h-[94vh] pb-10">
        <div className="flex-1 py-4 overflow-y-scroll">hii</div>
        <Searchbar />
      </Container>
    </main>
  );
}
