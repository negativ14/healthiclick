"use client";
import { useTheme } from "next-themes";
import { Button } from "./button";
import { useEffect, useState } from "react";
import { MoonStar, Sun } from "lucide-react";

export default function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [systemTheme, setSystemTheme] = useState<"dark" | "light">("light");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefer-color-scheme: dark)");

    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const SWITCH = () => {
    switch (theme) {
      case "light": {
        setTheme("dark");
        return;
      }
      case "dark": {
        setTheme("light");
        return;
      }
      case "system": {
        setTheme(systemTheme);
        return;
      }
      default: {
        return;
      }
    }
  };
  return (
    <Button
      onClick={SWITCH}
      variant={"ghost"}
      size={"icon"}
      className="bg-background"
    >
      <Sun className="absolute size-4 dark:scale-0 shrink-0" />
      <MoonStar className="absolute size-4 scale-0 dark:scale-100 shrink-0" />
    </Button>
  );
}