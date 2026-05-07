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
  title: string;
  days: Day[];
};

export default function Plan(){

  const [plan, setPlan] = useState<Plan | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("currentPlan");
    if (stored) setPlan(JSON.parse(stored));
  }, []);

  if (!plan) return <div className="p-12 text-white">Loading plan...</div>;

  return (
    <div className="p-12 max-w-6xl mx-auto">
      <h1 className="text-[56px] uppercase tracking-[1px] leading-none mb-4">
        {plan.title}
      </h1>

      <div className="grid grid-cols-3 gap-4 mt-10">
        {plan.days.map((day, index) => (
          <div
            key={index}
            className={`border p-5 ${
              day.isRest
                ? "border-dashed border-[#2e2e2e]"
                : "border-[#2e2e2e] bg-[#1a1a1a]"
            }`}
          >
            <div className="text-[22px] uppercase tracking-[1px] text-(--wpg-accent-color) mb-3">
              {day.day} — {day.focus}
            </div>

            {day.isRest ? (
              <div className="text-[#2e2e2e] text-[13px] tracking-[2px] uppercase text-center py-4">
                Rest
              </div>
            ) : (
              day.exercises.map((ex, i) => (
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
            )}
          </div>
        ))}
      </div>
    </div>
  );
}