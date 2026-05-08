import Groq from "groq-sdk";
import { NextRequest, NextResponse } from "next/server"

const client = new Groq({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export async function POST(req: NextRequest) {
  try {
    const { goal, days, length, level, equipment } = await req.json();

    const message = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: `Generate a ${days}-day per week workout plan for someone who wants to ${goal}.
            Their fitness level is ${level}.
            Each session should last ${length} minutes.
            Available equipment: ${equipment.join(", ")}.

            Respond ONLY with a valid JSON object in this exact structure, no extra text:
            {
              "id": "Plan ID",
              "title": "Plan name",
              "level": "Fitness level",
              "time": "Session length in minutes",
              "equipment": ["Equipment"],
              "goal": "Workout goal",
              "days": [
                {
                  "day": "Monday",
                  "focus": "Push",
                  "isRest": false,
                  "exercises": [
                    { "name": "Bench Press", "sets": 4, "reps": 8 }
                  ]
                }
              ]
            }`
        },
      ],
    });

    const raw = message.choices[0].message.content ?? "";
    const cleaned = raw.replace(/```json|```/g, "").trim();
    const plan = JSON.parse(cleaned);

    return NextResponse.json({ plan });

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to generate plan", details: String(error) },
      { status: 500 }
    );
  }
}