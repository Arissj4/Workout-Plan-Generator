"use client"
import { useState } from "react";

export default function Landing(){
  const goals: Array<string> = ["Build muscle", "Lost fat", "Improve endurance", "Stay active"];
  const levels: Array<string> = ["Beginner", "Intermediate", "Advanced"];
  const equipments: Array<string> = ["Barbell", "Dumbbell", "Cables", "Machine", "Bodyweight only"];

  const [selectedGoal, setGoal] = useState<number>(0);
  const [selectedDays, setDays] = useState<number>(1);
  const [selectedLength, setLength] = useState<number>(1);
  const [selectedLevel, setLevel] = useState<number>(0);
  const [selectedEquipment, setEquipment] = useState<Array<number>>([]);





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

            <div className="mb-5">
              <div className="uppercase text-[11px] text-(--wpg-muted-text-color) tracking-[2px] mb-2 font-medium">
                Your goal
              </div>
              <div className="flex gap-2 flex-wrap">
                {goals.map((goal, index) => {
                  return (
                    <button
                      key={index}
                      className={`text-[13px] cursor-pointer border px-4 py-2 ${selectedGoal === index ? "text-(--wpg-accent-color) border-(--wpg-accent-color) bg-[rgba(232,255,71,.06)]" : "text-(--wpg-muted-text-color) border-(--wpg-border-color)"}`}
                      onClick={() => setGoal(index)}
                      type="button"
                    >
                      {goal}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-5">
              <div>
                <div className="uppercase text-[11px] text-(--wpg-muted-text-color) tracking-[2px] mb-2 font-medium">
                  days per week
                </div>
                <div>
                  <select
                    className="w-full bg-(--wpg-card-color) border border-(--wpg-border-color) text-white px-4 py-3 text-[14px] font-light outline-0"
                    onChange={ (e) => setDays(parseInt(e.target.value))}
                  >
                    <option value="1" className="bg-[#242424]" selected>1 day</option>
                    <option value="2" className="bg-[#242424]">2 days</option>
                    <option value="3" className="bg-[#242424]">3 days</option>
                    <option value="4" className="bg-[#242424]">4 days</option>
                    <option value="5" className="bg-[#242424]">5 days</option>
                    <option value="6" className="bg-[#242424]">6 days</option>
                    <option value="7" className="bg-[#242424]">7 days</option>
                  </select>
                </div>
              </div>
              <div>
                <div className="uppercase text-[11px] text-(--wpg-muted-text-color) tracking-[2px] mb-2 font-medium">
                  session length
                </div>
                <div>
                  <select
                    className="w-full bg-(--wpg-card-color) border border-(--wpg-border-color) text-white px-4 py-3 text-[14px] font-light outline-0"
                    onChange={ (e) => setLength(parseInt(e.target.value))}
                  >
                    <option value="1" className="bg-[#242424]" selected>30 min</option>
                    <option value="2" className="bg-[#242424]">45 min</option>
                    <option value="3" className="bg-[#242424]">60 min</option>
                    <option value="4" className="bg-[#242424]">90 min</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mb-5">
              <div className="uppercase text-[11px] text-(--wpg-muted-text-color) tracking-[2px] mb-2 font-medium">
                fitness level
              </div>
              <div className="flex gap-2 flex-wrap">
                {levels.map((level, index) => {
                  return (
                    <button
                      key={index}
                      className={`text-[13px] cursor-pointer border px-4 py-2 ${selectedLevel === index ? "text-(--wpg-accent-color) border-(--wpg-accent-color) bg-[rgba(232,255,71,.06)]" : "text-(--wpg-muted-text-color) border-(--wpg-border-color)"}`}
                      onClick={() => setLevel(index)}
                      type="button"
                    >
                      {level}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="mb-5">
              <div className="uppercase text-[11px] text-(--wpg-muted-text-color) tracking-[2px] mb-2 font-medium">
                equipment available
              </div>
              <div className="flex gap-2 flex-wrap">

                {equipments.map((equipment, index) => {
                  return (
                    <button
                      key={index}
                      className={`text-[13px] cursor-pointer border px-4 py-2 ${selectedEquipment.includes(index) ? "text-(--wpg-accent-color) border-(--wpg-accent-color) bg-[rgba(232,255,71,.06)]" : "text-(--wpg-muted-text-color) border-(--wpg-border-color)"}`}
                      onClick={() => {
                        if (selectedEquipment.includes(index)) {
                          setEquipment(selectedEquipment.filter((item) => item !== index));
                        } else {
                          setEquipment([...selectedEquipment, index]);
                        }
                      }}
                      type="button"
                    >
                      {equipment}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="mb-5">
              <button
                className={`w-full bg-(--wpg-accent-color) text-black text-[22px] tracking-[2px] cursor-pointer border p-4.5 mt-2 uppercase`}
                onClick={() => {}}
                type="submit"
              >
                generate my plan
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}