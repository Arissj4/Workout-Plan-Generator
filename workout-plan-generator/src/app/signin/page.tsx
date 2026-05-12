"use client"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation";

export default function SignIn( {provider}: {provider: string} ) { // This component is likely intended to be a client component if it's handling form submissions directly.

  const router = useRouter();

  const handleSingIn = async () => {
    await signIn("google");
    router.push("/plan");
  }

  return (
    <>
      <div className="flex h-full">
        <div
          className="flex w-[60%]"
        >

        </div>

        <div
          className="flex w-[40%] p-14"
        >
          <div
            className="flex flex-col w-full h-full justify-center items-center"
          >
            <h1
              className="text-3xl font-bold mb-4"
            >
              Welcome back
            </h1>

            <h2
              className="mb-4"
            >
              Sign in to access your plans
            </h2>

            <button
              className="w-full bg-[#f5f2ee] flex items-center justify-center gap-2.5 py-3.5 cursor-pointer hover:opacity-90 transition-opacity"
              type="button"
              onClick={() => handleSingIn()}
            >
              <span className="text-[14px] font-medium text-black">Continue with Google</span>
            </button>
          </div>
        </div>
      </div>

    </>
  )
}