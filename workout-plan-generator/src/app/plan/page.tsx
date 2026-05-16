"use client"

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { jsPDF } from "jspdf";
import { useSession } from "next-auth/react";
import type {Exercise, Day, Plan} from "@/app/lib/costumeTypes";

export default function Plan(){

  const {data: session, status} = useSession();

  const [isDownloading, setIsDownloading] = useState<Boolean>(false);
  const [isSaving, setIsSaving] = useState<Boolean>(false);

  const [plan, setPlan] = useState<Plan | null>(null);
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

  useEffect(() => {
    const stored = localStorage.getItem("currentPlan");
    if (stored) setPlan(JSON.parse(stored));
  }, []);

  const handleExportAsPDF = () => {
    try{
      setIsDownloading(true);
      const doc = new jsPDF();

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      // Black page background
      doc.setFillColor(0, 0, 0);
      doc.rect(0, 0, pageWidth, pageHeight, "F");

      doc.setFontSize(24);
      doc.setFont("helvetica", "bold");
      doc.setTextColor("E8FF47");
      doc.text("WPG", 20, 20);

      doc.setTextColor("white");
      doc.setFont("helvetica", "normal");
      doc.setFontSize(16);
      doc.text("Workout List", 20, 40);

      doc.setFontSize(12);

      let y = 60;

      plan?.days.forEach((dayPlan, index) => {
        if (!dayPlan.isRest) {
          doc.text(
            `${dayPlan.day} - ${dayPlan.focus}`,
            20,
            y
        );

        y += 10;
          dayPlan.exercises.forEach((exercise, exIndex) => {
            doc.text(`  ${exIndex + 1}. ${exercise.name} - ${exercise.sets}x${exercise.reps}`, 20, y);
            y += 7;
          });
          y += 5; // Add some space after each day's exercises
        }
      });

      doc.save("workouts.pdf");
    } catch (error){
      console.log(error);
    } finally {
      setIsDownloading(false);
    }
  }

  const handleSavePlan = async () => {
    try{
      if(!session){
        alert("You must be logged in to save a plan.");
        return;
      }

      setIsSaving(true);

      const res = await fetch("/api/neon", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({plan, user_email: session?.user?.email})
      })

      const data = await res.json();
      if(data.success){
        alert(data.message);
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error){
      console.log(error);
    } finally {
      setIsSaving(false);
    }
  }

  if (!plan) return <div className="flex flex-1 p-12 text-white items-center justify-center text-4xl animate-pulse">Loading plan...</div>;
  if (isSaving) return <div className="flex flex-1 p-12 text-white items-center justify-center text-4xl animate-pulse">Saving plan...</div>

  return (

    <>

      {isDownloading ?
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50 text-white text-3xl animate-pulse flex-col gap-4 text-center ">
          <div className="loader"></div>
          Preparing your plan for download...
        </div>
      : null}

      <div className="flex flex-col p-12 max-w-6xl mx-auto">
        <div className="flex">
          <div className="flex max-w-[70%]">
            <h1 className="text-[56px] uppercase tracking-[1px] leading-none mb-4">
              {plan?.title}
            </h1>
          </div>

          <div className="flex flex-1 justify-end gap-2">
            <button
              className="flex justify-center items-center max-h-11.75 gap-1 bg-transparent px-8 py-3 text-(--wpg-muted-text-color) text-[14px] font-medium border border-[#2e2e2e] cursor-pointer active:brightness-150"
              onClick={() => handleExportAsPDF()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
              </svg>
              Export as PDF
            </button>

            {session?.user?.email ?
              <button
                className="max-h-11.75 bg-(--wpg-main-text-color) px-8 py-3 text-black text-[14px] font-medium hover:cursor-pointer active:bg-(--wpg-disabled-color)"
                onClick={() => handleSavePlan()}
              >
                Save Plan
              </button>
            : null
            }

          </div>
        </div>

        <div className="flex gap-5">
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
            {plan?.equipment.join(" + ")}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-10">
          {days.map((day, index) => (
            <div
              key={index}
              className={`border p-5 ${
                plan?.days.find(d => day === d.day)
                  ? "border-[#2e2e2e] bg-[#1a1a1a]"
                  : "border-dashed border-[#2e2e2e] flex justify-center items-center"
              }`}
            >
              {plan?.days.find(d => day === d.day) ?
              (
                <div className="text-[22px] uppercase tracking-[1px] text-(--wpg-accent-color) mb-3">
                  {day} — {plan?.days.find(d => day === d.day)?.focus}
                </div>
              )
              : null
              }

              {plan?.days.find(d => day === d.day) ?
                plan?.days.find(d => day === d.day)?.exercises.map((ex, i) => (
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
    </>
  );
}