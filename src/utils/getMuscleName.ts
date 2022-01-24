import { MuscleType } from "../types/MuscleType";

export function getMuscleName(
  muscleList: MuscleType[],
  muscleID: number
): string | undefined {
  return muscleList.find((muscle) => muscle.id === muscleID)?.name;
}
