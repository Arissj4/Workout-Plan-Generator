"use client"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation";

export default function SignIn( {provider}: {provider: string} ) { // This component is likely intended to be a client component if it's handling form submissions directly.

  const router = useRouter();

  const handleSingIn = async () => {
    const res = await signIn("google");
    if (res?.ok) {
      router.push("/");
    }
  }

  return (
    <>
      <div className="flex min-h-screen">

        <div
          className="w-1/2 bg-[#0e0e0e] p-14 flex flex-col justify-center"
        >
          <div>

            <h1 className="text-[64px] leading-[0.92] uppercase text-white">
              <span className="text-(--wpg-main-text-color) text-[64px] block">
                WPG
              </span>

              Your<br/>

              <span className="text-(--wpg-accent-color) block">Perfect</span>

              Program<br/>Awaits
            </h1>
            <p className="text-[13px] text-(--wpg-muted-text-color) mt-4 max-w-[280px] leading-[1.7]">
              Sign in to generate, save, and revisit your AI-powered workout plans anytime.
            </p>
          </div>
        </div>

        <div
          className="w-1/2 bg-[#1a1a1a] border-l border-[#2e2e2e] p-14 flex flex-col justify-center"
        >
          <h2 className="text-[32px] tracking-[1px] text-white mb-1.5">
            Welcome back
          </h2>

          <p className="text-[13px] text-(--wpg-muted-text-color) mb-8">
            Sign in to access your plans
          </p>

          <button
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="w-full bg-[#f5f2ee] flex items-center justify-center gap-2.5 py-3.5 cursor-pointer hover:opacity-90 transition-opacity"
          >
            <span className="text-[14px] font-medium text-black">
              Continue with Google
            </span>
          </button>

          {/* <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-[#2e2e2e]"/>
            <span className="text-[11px] text-[#5e5e5e] tracking-[1px]">
              OR
            </span>
            <div className="flex-1 h-px bg-[#2e2e2e]"/>
          </div>

          <input
            type="email"
            placeholder="you@example.com"
            className="w-full bg-[#242424] border border-[#2e2e2e] text-white px-4 py-3 text-[14px] outline-none placeholder:text-[#5e5e5e]"
          />
          <button
           className="flex justify-center items-center gap-2 w-full bg-(--wpg-accent-color) text-black text-[20px] tracking-[2px] py-3 mt-2.5 uppercase cursor-pointer"
          >
            Continue
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </button> */}

          <p className="text-[11px] text-[#5e5e5e] text-center mt-5 leading-[1.6]">
            By continuing you agree to our Terms of Service and Privacy Policy
          </p>
        </div>

      </div>
    </>
  )
}