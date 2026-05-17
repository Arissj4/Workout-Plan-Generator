import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import type { Day, Exercise, Plan } from "@/app/lib/costumeTypes"

export async function GET(req: NextRequest) {
  try{
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({error: "Unauthorized"}, {status: 401});

    const sql = neon(process.env.postgres_wpg_db_POSTGRES_URL!);
    const response = await sql`SELECT * FROM workouts WHERE user_email = ${session.user?.email}`;
    return NextResponse.json(response);

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to generate plan", details: String(error) },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try{
    const body = await req.json();
    const session = await getServerSession(authOptions);
    if(!session) return NextResponse.json({error: "Unauthorized"}, {status: 401});

    const equipments = body.plan.equipment.join(", ");

    const sql = neon(process.env.postgres_wpg_db_POSTGRES_URL!)
    await sql`INSERT INTO workouts (title, time, level, goal, equipment, user_email) VALUES (${body.plan.title}, ${body.plan.time}, ${body.plan.level}, ${body.plan.goal}, ${equipments}, ${session?.user?.email})`

    const workouts = await sql`
      SELECT * FROM workouts
      WHERE user_email = ${session?.user?.email}
      ORDER BY created_at DESC
    `;

    body.plan.days.forEach(async (day: Day) => {
      await sql`INSERT INTO days (workout_id, day, focus) VALUES (${workouts[0].id}, ${day.day}, ${day.focus})`

      const lastDay = await sql`
        SELECT * FROM days
        WHERE workout_id = ${workouts[0].id}
        ORDER BY created_at DESC
      `;

      day.exercises.forEach(async (exercise: Exercise) => {
        await sql`INSERT INTO exercises (days_id, name, sets, reps) VALUES (${lastDay[0].id}, ${exercise.name}, ${exercise.sets}, ${exercise.reps})`
      });
    });

    return NextResponse.json(
      {
        message: "Plan saved successfully",
        success: true
      },
      { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {error: "Failed to save the plan", details: String(error)},
      {status: 500}
    )
  }
}