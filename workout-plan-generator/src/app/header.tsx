import Link from "next/link";

export default function Header({ theme, setTheme }: { theme: string, setTheme: (action: string) => void }) {
  return(
    <>
      <header className={theme === "dark" ? "bg-black" : "bg-zinc-50"}>
        <nav className={theme === "dark" ? "text-white" : "text-black"}>
          <div>
            <Link href="/">Home</Link>
          </div>
          <div>
            <Link href="/saved">My plans</Link>
          </div>
          <div>
            <Link href="/plan">Preview Plan</Link>
          </div>
        </nav>
      </header>
    </>
  )
}
