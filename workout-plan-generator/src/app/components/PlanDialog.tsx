import { Plan } from "../lib/costumeTypes";

export default function PlanDialog({plan, closeDialog}: {plan: Plan; closeDialog: () => void}) {

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  return(
    <>
      <div
        className="fixed flex justify-center items-center top-1/2 left-1/2 -translate-1/2 z-auto bg-gray-900 w-full h-full opacity-70"
        onClick={closeDialog}
      />
      <div className="fixed top-1/2 left-1/2 -translate-1/2 not-lg:w-[80%] lg:w-[50%] not-lg:h-[80%] lg:h-[60%] bg-gray-950 p-8 rounded-lg shadow-lg border border-(--wpg-border-color)">
        <div className="absolute text-3xl top-2 right-3.5 text-gray-500 hover:text-gray-300 cursor-pointer" onClick={closeDialog}>
          &times;
        </div>
        <h2 className="text-2xl font-bold mb-4 text-center">
          Workout Plan
        </h2>
        <div
          className="grid lg:grid-cols-2 md:grid-cols-1 gap-2 overflow-y-auto h-[calc(100%-4rem)] pr-2 hidden-scrollbar"
        >
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
  )
};