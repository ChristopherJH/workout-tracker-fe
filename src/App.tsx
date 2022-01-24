import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { MuscleType } from "./types/MuscleType";
import { ExerciseImageType } from "./types/ExerciseImageType";
import { ExerciseType } from "./types/ExerciseType";
import { getMuscleName } from "./utils/getMuscleName";

function App(): JSX.Element {
  const [exerciseList, setExerciseList] = useState<ExerciseType[]>([]);
  const [imageList, setImageList] = useState<ExerciseImageType[]>([]);
  const [muscleList, setMuslceList] = useState<MuscleType[]>([]);

  const getExercises = useCallback(async () => {
    try {
      // Custom link obtained from seeing how many exercises are in database (419) and limiting the search to those
      const res = await axios.get(
        "https://wger.de/api/v2/exercise/?limit=419&offset=0"
      );
      const exerciseResults: ExerciseType[] = res.data.results;
      const filteredResults: ExerciseType[] = exerciseResults.filter(
        (exercise) => exercise.language === 2
      );
      setExerciseList(filteredResults);
      console.log(filteredResults);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const getImages = useCallback(async () => {
    try {
      // Custom link obtained from seeing how many images are in database (118) and limiting the search to those
      const res = await axios.get(
        "https://wger.de/api/v2/exerciseimage/?limit=118&offset=0"
      );
      const imageResults: ExerciseImageType[] = res.data.results;
      setImageList(imageResults);
      console.log(imageResults);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const getMuscles = useCallback(async () => {
    try {
      const res = await axios.get("https://wger.de/api/v2/muscle/");
      const muscleResults: MuscleType[] = res.data.results;
      setMuslceList(muscleResults);
      console.log(muscleResults);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    getExercises();
    getImages();
    getMuscles();
  }, [getExercises, getImages, getMuscles]);

  return (
    <div className="app">
      <h1>{"Workout Tracker"}</h1>
      {exerciseList.map((exercise, index) => {
        const exerciseImage = imageList.find(
          (image) => image.exercise_base === exercise.exercise_base
        );
        return (
          <div key={`div-${index}`}>
            {exerciseImage !== undefined && (
              <img
                src={exerciseImage?.image}
                alt="Exercise example"
                key={`image-${exerciseImage.exercise_base}`}
              />
            )}
            <h2 key={`${exercise}`}>{exercise.name}</h2>
            {exercise.muscles.map((muscleItem) => {
              const muscleName = getMuscleName(muscleList, muscleItem);
              return <p key={`${exercise}-${muscleName}`}>{muscleName}</p>;
            })}
          </div>
        );
      })}
    </div>
  );
}

export default App;
