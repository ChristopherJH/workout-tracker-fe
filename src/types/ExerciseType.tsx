export interface ExerciseType {
  id: number;
  uuid: string;
  name: string;
  exercise_base: number;
  status: string;
  description: string;
  creation_date: string;
  category: number;
  muscles: number[];
  muscles_secondary: number[];
  equipment: number[];
  language: number;
  license: number;
  license_author: string;
  variations: number[];
}
