import Sobre from "@/app/Components/Sobre";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <Sobre />
      </div>
    </div>
  );
}
