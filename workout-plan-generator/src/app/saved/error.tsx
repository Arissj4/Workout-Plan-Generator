"use client"

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void; }){
  return(
    <div className="flex flex-1 flex-col gap-10 p-12 text-white items-center justify-center ">
      <p className="text-4xl">
        Something went wrong!
      </p>
      <button
        className="bg-transparent text-[14px] border border-(--wpg-border-color) px-8 py-3 hover:cursor-pointer"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  )
}