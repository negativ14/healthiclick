import Container from "@/components/container";
import Searchbar from "@/components/searchbar";

export default function Home() {
  return (
    <main className="">
      <Container className="flex flex-col h-[94vh] pb-10">
        <div className="flex-1 py-4 overflow-y-scroll">hii</div>
        <Searchbar />
      </Container>
    </main>
  );
}
