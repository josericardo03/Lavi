import Team from "@/app/Components/Team";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <Team />
      </div>
    </div>
  );
}
