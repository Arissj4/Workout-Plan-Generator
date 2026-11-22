import Groq from "groq-sdk";
import { NextRequest, NextResponse } from "next/server";
import * as zod from "zod";

const client = new Groq({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const responseSchema = zod.object({
  id: zod.string(),
  title: zod.string(),
  level: zod.string(),
  time: zod.string(),
  equipment: zod.string().array(),
  goal: zod.string(),
  days: zod.array(
    zod.object({
      day: zod.string(),
      focus: zod.string(),
      exercises: zod.array(
        zod.object({
          name: zod.string(),
          sets: zod.number(),
          reps: zod.number(),
        }),
      ),
    }),
  ),
});

type resSchema = zod.infer<typeof responseSchema>;

export async function POST(req: NextRequest) {
  try {
    const { goal, days, length, level, equipment } = await req.json();

    const message = await client.chat.completions.create({
      model: "openai/gpt-oss-120b",
      max_tokens: 4096,
      messages: [
        {
          role: "user",
          content: `Generate a ${days}-day per week workout plan for someone who wants to ${goal}.
            Their fitness level is ${level}.
            Each session should last ${length} minutes.
            Available equipment: ${equipment.join(", ")}.
            Do not consider the rest days. Each day that is not inside the training days, considered as rest day.

            Respond ONLY with a valid JSON object in this exact structure, no extra text:
            {
              "id": "Plan ID",
              "title": "Plan name",
              "level": "Fitness level",
              "time": "Session length in minutes, in string",
              "equipment": ["Equipment"],
              "goal": "Workout goal",
              "days": [
                {
                  "day": "Monday",
                  "focus": "Push",
                  "exercises": [
                    { "name": "Bench Press", "sets": in number, "reps": in number }
                  ]
                }
              ]
            }`,
        },
      ],
    });

    const raw = message.choices[0].message.content ?? "";
    const cleaned = raw.replace(/```json|```/g, "").trim();
    const jsonVersion = await JSON.parse(cleaned);
    const plan: resSchema = await responseSchema.parseAsync(jsonVersion);

    return NextResponse.json({ plan });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to generate plan", details: String(error) },
      { status: 500 },
    );
  }
}
