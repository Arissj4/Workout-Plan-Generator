"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useState } from "react";
import  userIcon  from "@/../public/default-user-icon.svg";
import type { Session } from "next-auth";


type Props = {
  session: Session | null;
}

export default function Header(props: Props) {
  const { session } = props;
  const router = useRouter();
  const [showDropDown, setShowDropDown] = useState<Boolean>(false);
  const [isOpen, setIsOpen] = useState<Boolean>(false);


  return(
    <>
      <nav
        className="flex flex-col w-full items-center justify-between lg:py-5 pt-5 font-sans tracking-[2px] border-b border-[#2e2e2e]"
      >
        <div className="flex w-full not-lg:justify-between px-8">
          <button
            className="w-30 text-(--wpg-main-text-color) text-[28px] font-bold hover:cursor-pointer"
            onClick={() => router.push("/")}
          >
            WPG
          </button>

          <ul className="hidden lg:flex justify-center w-full gap-7 text-[13px] items-center">
            <li>
              <Link href={"/"}>Home</Link>
            </li>

            {session ?
              <li>
                <Link href={"/saved"}>My Plans</Link>
              </li>
            : null
            }


            <li>
              <Link href={"/plan"}>Preview Plan</Link>
            </li>
          </ul>

          <div className="hidden lg:flex justify-end items-center w-30">
            {session ?
              <>
                {/* <button
                  className="bg-(--wpg-main-text-color) px-5 py-2 text-black text-[13px] hover:cursor-pointer"
                  type="button"
                  onClick={async () => await signOut()}
                >
                  Sign out
                </button> */}

                <div
                  className="relative w-10 h-10 border-2 border-(--wpg-main-text-color) rounded-full hover:cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => setShowDropDown(!showDropDown)}
                >
                  <img
                    className="rounded-full"
                    src={session.user?.image || userIcon.src}
                    alt="User Icon"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src === userIcon.src;
                    }}
                  />
                </div>
                {showDropDown ?
                  <div
                    className="absolute top-17 right-8 min-w-36 bg-[#1a1a1a] border border-[#2e2e2e] p-2 rounded-md shadow-xl flex flex-col z-50 cursor-default"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      className="w-full text-left bg-transparent px-4 py-2 text-(--wpg-main-text-color) hover:text-white hover:bg-[#2e2e2e] rounded-sm text-[13px] transition-colors cursor-pointer"
                      type="button"
                      onClick={async () => await signOut()}
                    >
                      Sign out
                    </button>
                  </div>
                : null}
              </>
            :
              <button
                className="bg-(--wpg-main-text-color) px-5 py-2 text-black text-[13px] hover:cursor-pointer"
                type="button"
                onClick={() => {router.push("/signin")}}
              >
                Sign in
              </button>
            }
          </div>

          <button
            className="lg:hidden flex justify-center flex-col gap-1.25 p-1 cursor-pointer bg-transparent border-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-5.5 h-[1.5px] bg-white transition-all duration-300 origin-center
              ${isOpen ? "translate-y-[6.5px] rotate-45" : ""}`}
            />
            <span className={`block w-5.5 h-[1.5px] bg-white transition-all duration-300
              ${isOpen ? "opacity-0 scale-x-0" : ""}`}
            />
            <span className={`block w-5.5 h-[1.5px] bg-white transition-all duration-300 origin-center
              ${isOpen ? "translate-y-[-6.5px] -rotate-45" : ""}`}
            />
          </button>
        </div>


        <div
          className={`min-[1000px]:hidden mt-5 overflow-hidden transition-all duration-300 bg-[#141414]
          ${isOpen ? "max-h-[400px] border-t border-[#2e2e2e]" : "max-h-0"} w-full`}
        >
          {/* Nav links */}
          <div className="flex flex-col">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-8 py-4 text-[14px] text-(--wpg-muted-text-color) border-b border-[#1e1e1e] hover:text-white transition-colors"
            >
              Home
            </Link>
            {session && (
              <Link
                href="/saved"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-8 py-4 text-[14px] text-(--wpg-muted-text-color) border-b border-[#1e1e1e] hover:text-white transition-colors"
              >
                My Plans
              </Link>
            )}
            <Link
              href="/plan"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-8 py-4 text-[14px] text-(--wpg-muted-text-color) border-b border-[#1e1e1e] hover:text-white transition-colors"
            >
              Preview Plan
            </Link>
          </div>

          {/* Mobile auth footer */}
          <div className="px-8 py-5">
            {session ? (
              <>
                <div className="flex items-center gap-3 mb-4">
                  <img src={session.user?.image!} className="w-8 h-8 rounded-full" />
                  <div>
                    <div className="text-[13px] text-white">{session.user?.name}</div>
                    <div className="text-[11px] text-(--wpg-muted-text-color)">{session.user?.email}</div>
                  </div>
                </div>
                <button
                  className="w-full text-center bg-transparent px-4 py-2 text-[14px] text-(--wpg-main-text-color) border border-(--wpg-border-color) hover:text-white hover:bg-[#2e2e2e] rounded-sm transition-colors cursor-pointer"
                  type="button"
                  onClick={async () => {await signOut(); setIsOpen(false)}}
                >
                  Sign out
                </button>
              </>
            ) : (
              <button
                onClick={() => {router.push("/signin"); setIsOpen(false)}}
                className="w-full bg-(--wpg-main-text-color) text-[14px] py-3 text-black tracking-[2px] cursor-pointer uppercase"
              >
                Sign in
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  )
}
