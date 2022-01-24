import { ExerciseImageType } from "../types/ExerciseImageType";
import { ExerciseType } from "../types/ExerciseType";

export function getExerciseImage(
  imageList: ExerciseImageType[],
  exercise: ExerciseType
): string | undefined {
  return imageList.find(
    (image) => image.exercise_base === exercise.exercise_base
  )?.image;
}
