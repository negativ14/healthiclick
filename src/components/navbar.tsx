import Container from "./container";
import ModeToggle from "./ui/toggle-mode";

export default function Navbar() {
  return (
    <header className="border-b">
      <Container className="py-2 flex items-center justify-between">
        <span className="flex items-center gap-1 bg-amber-500">
          <span className="size-8 rounded-full bg-accent" /> Rohit
        </span>
        <ModeToggle />
      </Container>
    </header>
  );
}
