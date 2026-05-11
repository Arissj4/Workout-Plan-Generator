import Link from "next/link";

export default function Header() {
  return(
    <>
      <nav className="flex w-full items-center justify-between px-8 py-5 font-sans tracking-[2px] border-b border-[#2e2e2e]">
        <div className="text-(--wpg-main-text-color) text-[28px] font-bold">
          WPG
        </div>

        <ul className="flex gap-7 text-[13px] items-center">
          <li>
            <Link href={"/"}>Home</Link>
          </li>

          {/* <li>
            <Link href={"/saved"}>My Plans</Link>
          </li> */}

          <li>
            <Link href={"/plan"}>Preview Plan</Link>
          </li>
        </ul>

        <div className="flex items-center">
          <button
            className="bg-(--wpg-disabled-color) px-5 py-2 text-black text-[13px]"
            disabled={true}
          >
            Sign in
          </button>
        </div>
      </nav>
    </>
  )
}
