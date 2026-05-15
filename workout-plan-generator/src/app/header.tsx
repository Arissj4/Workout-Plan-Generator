"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { use, useEffect, useState } from "react";
import  userIcon  from "@/../public/default-user-icon.svg";
import type { User } from "@/app/lib/costumeTypes"
import type { Session } from "next-auth";




type Props = {
  session: Session | null;
}

export default function Header(props: Props) {
  const { session } = props;
  const router = useRouter();
  const [showDropDown, setShowDropDown] = useState<Boolean>(false);


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

        <div className="flex items-center">
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
              onClick={() => router.push("/signin")}
            >
              Sign in
            </button>
          }
        </div>
      </nav>
    </>
  )
}
