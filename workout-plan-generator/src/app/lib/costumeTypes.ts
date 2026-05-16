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
  id: string;
  title: string;
  level: string;
  equipment: string[];
  goal: string;
  time: number;
  days: Day[];
};

type User = {
  name: string,
  email: string,
  image: string,
}

type SavedPlan = Omit<Plan, "days"> & { days: number };

export type {Exercise, Day, Plan, User, SavedPlan};