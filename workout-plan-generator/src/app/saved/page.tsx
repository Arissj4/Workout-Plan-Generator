import type { Plan } from "../lib/costumeTypes";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { neon } from "@neondatabase/serverless";
import { redirect } from "next/navigation";
import PlanCard from "@/app/components/PlanCard";


export default async function Saved(){

  const session = await getServerSession(authOptions);
  if (!session) redirect('/signin');

  const sql = neon(process.env.postgres_wpg_db_POSTGRES_URL!);
  const plans = await sql`SELECT id, level, title, goal, time, equipment FROM workouts WHERE user_email = ${session.user?.email} ORDER BY created_at DESC`;

  const plansWithDays = await Promise.all(plans.map(async (plan) => {
    const days = await sql`SELECT * FROM days WHERE workout_id = ${plan.id}`;
    plan.days = days.length;
    return plan;
  }))

  return (
    <div
      className="flex flex-col p-12 max-w-6xl mx-auto overflow-scroll hidden-scrollbar"
    >
      {plans.length === 0 && (
        <div
          className="w-full flex justify-center items-center"
        >
          <p className="text-white text-4xl text-center">
            No saved plans.
          </p>
        </div>
      )}

      {plans.length > 0 && (
        <div
          className="grid gap-4 mt-10"
        >
          {plansWithDays.map((plan: any) => (
            <PlanCard key={plan.id} plan={plan}/>
          ))}
        </div>
      )}

    </div>
  );
}