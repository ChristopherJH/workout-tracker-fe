import {
  FormContentType,
  SetContentType,
} from "../components/LogWorkout/LogWorkout";

export function isValidForm(
  workoutData: FormContentType,
  setsData: SetContentType[]
): boolean {
  const setsExist: boolean = setsData.length > 0;
  const dayExists: boolean = workoutData.day !== "";
  const durationExists: boolean = workoutData.duration_mins !== undefined;
  const titleExists: boolean = workoutData.title !== "";
  return setsExist && dayExists && durationExists && titleExists;
}
