import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { neon } from "@neondatabase/serverless";
import { redirect } from "next/navigation";
import PlanCard from "@/app/components/PlanCard";
import type { Plan, Day, Exercise } from "../lib/costumeTypes";
import PlanDialog from "../components/PlanDialog";


export default async function Saved(){

  const session = await getServerSession(authOptions);
  if (!session) redirect('/signin');

  const sql = neon(process.env.postgres_wpg_db_POSTGRES_URL!);

  const plansRows = await sql`
    SELECT id, level, title, goal, time, equipment
    FROM workouts
    WHERE user_email = ${session.user?.email}
    ORDER BY created_at DESC
  `

  const plansIds = plansRows.map( plan => plan.id);

  const daysRows = plansIds.length > 0 ?
  await sql`
    SELECT id, day, focus, workout_id
    FROM days
    WHERE workout_id = ANY(${plansIds})
  `
  : [];

  const daysIds = daysRows.map((d) => d.id);

  const exercisesRows = daysIds.length > 0 ?
  await sql`
    SELECT id, name, sets, reps, days_id
    FROM exercises
    WHERE days_id = ANY(${daysIds})
  `
  : [];

  const plans: Plan[] = plansRows.map(plan => {
    const days: Day[] = daysRows
      .filter(day => day.workout_id === plan.id)
      .map(day => {
        const exercises = exercisesRows
          .filter(ex => ex.days_id === day.id)
          .map(exercise => ({
            name: exercise.name as string,
            sets: exercise.sets as number,
            reps: exercise.reps as number
          })
        );
        return {
          day: day.day as string,
          focus: day.focus as string,
          isRest: false,
          exercises,
        };
      });

    return{
      id: plan.id as string,
      title: plan.title as string,
      level: plan.level as string,
      equipment: (plan.equipment as string).split(", "),
      goal: plan.goal as string,
      time: plan.time as number,
      days: days,
    }
  });

  return (
    <div
      className="flex flex-col w-full p-12 max-w-6xl mx-auto overflow-scroll hidden-scrollbar max-w-[800px]"
    >
      {plans.length === 0 && (
        <div
          className="w-full flex justify-center items-center"
        >
          <p className="text-white text-4xl text-center mt-20">
            No saved plans.
          </p>
        </div>
      )}

      {plans.length > 0 && (
        <div
          className="flex flex-col gap-4 mt-10 w-full"
        >
          {plans.map((plan: any) => (
            <PlanCard key={plan.id} plan={plan}/>
          ))}
        </div>
      )}

    </div>
  );
}