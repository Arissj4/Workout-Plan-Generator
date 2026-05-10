import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export async function name(req: NextRequest) {
  try{
    const sql = neon(process.env.POSTGRES_URL!);
    const response = await sql`SELECT * FROM users`;
    return NextResponse.json(response);

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to generate plan", details: String(error) },
      { status: 500 }
    )
  }
}