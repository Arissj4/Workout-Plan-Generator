"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";

type User = {
  name: string,
  email: string,
  image: string,
}


type Props = {
  user: User,
}

export default function Header(props: Props) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

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

          {user ?
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
          {user ?
            <button
              className="bg-(--wpg-main-text-color) px-5 py-2 text-black text-[13px] hover:cursor-pointer"
              type="button"
              onClick={async () => await signOut()}
            >
              Sign out
            </button>
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
