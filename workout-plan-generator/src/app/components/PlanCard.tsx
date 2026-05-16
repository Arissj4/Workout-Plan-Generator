"use client"
import { redirect } from "next/navigation";
import { Plan } from "../lib/costumeTypes";

export default function PlanCard({plan}: {plan: Plan}) {

  return(
     <div
        key={plan?.id}
        className="flex flex-col justify-between border p-5 border-[#2e2e2e] bg-[#1a1a1a] hover:cursor-pointer"
        onClick={() => {
          redirect(`/plan/${plan.id}`)
        }}
      >
        <div className="text-[22px] uppercase tracking-[1px] text-(--wpg-accent-color) mb-3"
        >
          {plan?.title}
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="tag">
            {plan?.level}
          </div>

          <div className="tag">
            {`${plan?.days.length} ${plan?.days.length === 1 ? "day" : "days"} / week`}
          </div>

          <div className="tag">
            {`${plan?.time} min`}
          </div>

          <div className="tag">
            {plan?.equipment}
          </div>
        </div>
      </div>
  )
}