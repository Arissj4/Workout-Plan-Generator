"use client"
import { useReducer } from "react";
import Header from "./header";

export default function Home() {
  const [theme, setTheme] = useReducer<string, any>((state, action) => {
    switch (action) {
      case "dark":
        return "dark";
      case "light":
        return "light";
      default:
        return state;
    }
  }, "light");

  return (
    <div className={"flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black"}>
      <Header theme={theme} setTheme={setTheme} />
      <div className={`${theme === "light" ? "text-white" : "text-black"}`}>
        Home Page of WPG
      </div>
    </div>
  );
}
