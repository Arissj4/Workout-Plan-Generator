"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Exercise = {
  name: string,
  sets: number,
  reps: number,
}

type Day = {
  day: string;
  focus: string;
  isRest: boolean;
  exercises: Exercise[];
};

type Plan = {
  id: string;
  title: string;
  level: string;
  equipment: string[];
  goal: string;
  time: number;
  days: Day[];
};

export default function Plan(){

  const [plan, setPlan] = useState<Plan | null>(null);
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

  useEffect(() => {
    const stored = localStorage.getItem("currentPlan");
    if (stored) setPlan(JSON.parse(stored));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/neon", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      });

      const data = await res.json();
      console.log(data);
    };
    fetchData();
  }, [])

  useEffect(() => {
    console.log(plan);
  }, [plan]);

  if (!plan) return <div className="flex flex-1 p-12 text-white items-center justify-center text-4xl animate-pulse">Loading plan...</div>;

  return (
    <div className="flex flex-col p-12 max-w-6xl mx-auto">
      <div className="flex">
        <div className="flex max-w-[70%]">
          <h1 className="text-[56px] uppercase tracking-[1px] leading-none mb-4">
            {plan.title}
          </h1>
        </div>

        <div className="flex flex-1 justify-end gap-2">
          <button
            className="flex justify-center items-center max-h-11.75 gap-1 bg-transparent px-8 py-3 text-(--wpg-muted-text-color) text-[14px] font-medium border border-[#2e2e2e] cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
            </svg>
            Export
          </button>

          <button
            className="max-h-11.75 bg-(--wpg-disabled-color) px-8 py-3 text-black text-[14px] font-medium "
            disabled={true}
          >
            Save Plan
          </button>
        </div>
      </div>

      <div className="flex gap-5">
        <div className="tag">
          {plan.level}
        </div>

        <div className="tag">
          {`${plan.days.length} ${plan.days.length === 1 ? "day" : "days"} / week`}
        </div>

        <div className="tag">
          {`${plan.time} min`}
        </div>

        <div className="tag">
          {plan.equipment.join(" + ")}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-10">
        {days.map((day, index) => (
          <div
            key={index}
            className={`border p-5 ${
              plan.days.find(d => day === d.day)
                ? "border-[#2e2e2e] bg-[#1a1a1a]"
                : "border-dashed border-[#2e2e2e] flex justify-center items-center "
            }`}
          >
            {plan.days.find(d => day === d.day) ?
            (
              <div className="text-[22px] uppercase tracking-[1px] text-(--wpg-accent-color) mb-3">
                {day} — {plan.days.find(d => day === d.day)?.focus}
              </div>
            )
            : null
            }

            {plan.days.find(d => day === d.day) ?
              plan.days.find(d => day === d.day)?.exercises.map((ex, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center py-2 border-b border-[#2e2e2e] last:border-0 text-[13px]"
                >
                  <span className="text-white">{ex.name}</span>
                  <span className="text-(--wpg-muted-text-color)">
                    {ex.sets} × {ex.reps}
                  </span>
                </div>
              ))
              : (
                <div className="text-[#2e2e2e] text-[13px] tracking-[2px] uppercase text-center py-4">
                  {day} - Rest
                </div>
              )
            }
          </div>
        ))}
      </div>
    </div>
  );
}