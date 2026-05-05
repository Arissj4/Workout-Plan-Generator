"use client"
import { useState } from "react";

export default function Landing(){
  const goals: Array<string> = ["Build muscle", "Lost fat", "Improve endurance", "Stay active"];

  const [selectedGoal, setGoal] = useState<number>(0);

  return(
    <>
      <div className="wrapper flex flex-1 h-full">
        <div  className="wrapper wrapper-left py-15 px-12 min-w-[50%]">
          <div className="wrapper-left--tag text-(--wpg-main-text-color) text-[11px] mb-6 tracking-[3px]">
            AI-POWERED TRAINING
          </div>

          <div className="wrapper-left--title text-[88px] leading-[0.92] mb-7 uppercase">
            <h1>
              build your
              <br/>
              <span className="text-(--wpg-main-text-color)">perfect</span>
              <br/>
              program
            </h1>
          </div>

          <p className="wrapper-left--sub text-[15px] text-(--wpg-muted-text-color) max-w-95 mb-10 leading-[1.7]">
            Answer a few questions. Get a personalized weekly workout plan built for your body, your goals, and your schedule.
          </p>

          <div className="flex gap-3">
            <button
              className="bg-(--wpg-main-text-color) px-8 py-3 text-black text-[14px] font-medium cursor-pointer"
            >
              Generate Free
            </button>

            <button
              className="bg-transparent px-8 py-3 text-(--wpg-muted-text-color) text-[14px] font-medium border border-[#2e2e2e] cursor-pointer"
            >
              View Saved Plan
            </button>
          </div>
        </div>

        <div className="wrapper wrapper-right flex justify-center items-center w-[50%] h-auto py-15 px-12 bg-[#1a1a1a] border-l border-[#2e2e2e]">
          <form className="w-full">
            <div className="w-full mb-7">
              <div className="text-[28px] mb-1.5 tracking-[1px]">
                Your details
              </div>

              <div className="text-[13px] text-(--wpg-muted-text-color)">
                Takes less than 60 seconds
              </div>
            </div>

            <div>
              <div className="uppercase text-[11px] text-(--wpg-muted-text-color) tracking-[2px] mb-2 font-medium">
                Your goal
              </div>
              <div className="flex gap-2 flex-wrap">
                {goals.map((goal, index) => {
                  return (
                    <button
                      key={index}
                      className="text-[13px] text-(--wpg-muted-text-color) cursor-pointer border border-(--wpg-border-color) px-4 py-2 focus:text-(--wpg-accent-color) focus:border focus:border-(--wpg-accent-color) focus:bg-[rgba(232,255,71,.06)]"
                      onClick={() => setGoal(index)}
                    >
                      {goal}
                    </button>
                  )
                })}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}