import Header from "./header";
import Landing from "./landing";

export default function Home() {

  return (
    <div className="flex flex-col flex-1 h-full overflow-scroll hidden-scrollbar font-sans bg-black">
      <Landing />
    </div>
  );
}
