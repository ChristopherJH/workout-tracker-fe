// import axios from "axios";
// import { useCallback, useEffect, useState } from "react";
// import { MuscleType } from "./types/MuscleType";
// import { ExerciseImageType } from "./types/ExerciseImageType";
// import { ExerciseType } from "./types/ExerciseType";
// import { getMuscleName } from "./utils/getMuscleName";
import "bootstrap/dist/css/bootstrap.min.css";
// import { getExerciseImage } from "./utils/getExerciseImage";
import { NavigationBar } from "./components/NavigationBar";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { StatsPage } from "./components/StatsPage";
import { HomePage } from "./components/HomePage/HomePage";
import { LogWorkout } from "./components/LogWorkout";
import { config } from "dotenv";

config();

// const baseURL = process.env.REACT_APP_API_BASE;

function App(): JSX.Element {
  // const [exerciseList, setExerciseList] = useState<ExerciseType[]>([]);
  // const [imageList, setImageList] = useState<ExerciseImageType[]>([]);
  // const [muscleList, setMuscleList] = useState<MuscleType[]>([]);

  // const getExercises = useCallback(async () => {
  //   try {
  //     // Custom link obtained from seeing how many exercises are in database (419) and limiting the search to those
  //     const res = await axios.get(
  //       "https://wger.de/api/v2/exercise/?limit=419&offset=0"
  //     );
  //     const exerciseResults: ExerciseType[] = res.data.results;
  //     const filteredResults: ExerciseType[] = exerciseResults.filter(
  //       (exercise) => exercise.language === 2
  //     );
  //     setExerciseList(filteredResults);
  //     console.log(filteredResults);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }, []);

  // const getImages = useCallback(async () => {
  //   try {
  //     // Custom link obtained from seeing how many images are in database (118) and limiting the search to those
  //     const res = await axios.get(
  //       "https://wger.de/api/v2/exerciseimage/?limit=118&offset=0"
  //     );
  //     const imageResults: ExerciseImageType[] = res.data.results;
  //     setImageList(imageResults);
  //     console.log(imageResults);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }, []);

  // const getMuscles = useCallback(async () => {
  //   try {
  //     const res = await axios.get("https://wger.de/api/v2/muscle/");
  //     const muscleResults: MuscleType[] = res.data.results;
  //     setMuscleList(muscleResults);
  //     console.log(muscleResults);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }, []);

  // const postSets = useCallback(async () => {
  //   const data = {
  //     data: [
  //       {
  //         name: "raaaa",
  //         weight: 45,
  //         reps: 9,
  //       },
  //       {
  //         name: "ya mum",
  //         weight: 55,
  //         reps: 9,
  //       },
  //     ],
  //   };
  //   try {
  //     const res = await axios.post(`${baseURL}/2/sets`, data);
  //     console.log(res);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }, []);

  // useEffect(() => {
  //   getExercises();
  //   getImages();
  //   getMuscles();
  // }, [getExercises, getImages, getMuscles]);

  return (
    <>
      <NavigationBar />
      {/* Define the files that should be accessed when a given path is accessed */}
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/new" element={<LogWorkout />} />
          <Route path="/stats" element={<StatsPage />} />
        </Routes>
      </Router>

      {/* {exerciseList.map((exercise, index) => {
        const exerciseImage = getExerciseImage(imageList, exercise);
        return (
          <div key={`div-${index}`}>
            {exerciseImage !== undefined && (
              <img
                src={exerciseImage}
                alt="Exercise example"
                key={`image-${exercise.name}`}
              />
            )}
            <h2 key={`${exercise}`}>{exercise.name}</h2>
            {exercise.muscles.map((muscleItem) => {
              const muscleName = getMuscleName(muscleList, muscleItem);
              return <p key={`${exercise}-${muscleName}`}>{muscleName}</p>;
            })}
          </div>
        );
      })} */}
    </>
  );
}

export default App;
