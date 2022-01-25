import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import "./HomePage.css";
import { config } from "dotenv";
import { FaWeightHanging, FaClock } from "react-icons/fa";
import { GiWeightLiftingUp } from "react-icons/gi";

config();

const baseURL = process.env.REACT_APP_API_BASE;

interface WorkoutType {
  workout_id: number;
  title: string;
  day: string;
  duration_mins: number;
  notes: string;
  date: string;
  weight_lifted: number;
  exercises: number;
}

interface SetType {
  set_id: number;
  workout_id: number;
  name: string;
  weight: number;
  reps: number;
}

interface BestSetType {
  workout_id: number;
  name: string;
  weight: number;
  reps: number;
}

export function HomePage(): JSX.Element {
  const [workoutsList, setWorkoutsList] = useState<WorkoutType[]>([]);
  const [setsList, setSetsList] = useState<SetType[]>([]);
  const [bestSetsList, setBestSetsList] = useState<SetType[]>([]);

  const getWorkouts = useCallback(async () => {
    try {
      const res = await axios.get(`${baseURL}/workouts`);
      const workoutResults = res.data.data;
      setWorkoutsList(workoutResults);
      console.log(workoutResults);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const getSets = useCallback(async () => {
    console.log("trying to getSets");
    try {
      const res = await axios.get(`${baseURL}/sets`);
      const setResults = res.data.data;
      setSetsList(setResults);
      console.log({ setResults });
    } catch (err) {
      console.log(err);
    }
  }, []);

  const getBestSets = useCallback(async () => {
    console.log("trying to getSets");
    try {
      const res = await axios.get(`${baseURL}/sets/best`);
      const setResults = res.data.data;
      setBestSetsList(setResults);
      console.log({ setResults });
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    getWorkouts();
    getSets();
    getBestSets();
  }, [getWorkouts, getSets, getBestSets]);

  return (
    <div className="home-page">
      {/* General Statistics */}
      <div className="general-stats">
        <div className="general-stats-pbs">
          <h2 className="general-stats-pbs-num">X</h2>
          <h3 className="general-stats-pbs-desc">PBs</h3>
        </div>
        <div className="general-stats-workouts">
          <h2 className="general-stats-workouts-num">X</h2>
          <h3 className="general-stats-workouts-desc">Workouts</h3>
        </div>
        <div className="general-stats-weight">
          <h2 className="general-stats-weight-num">X</h2>
          <h3 className="general-stats-weight-desc">Weight Lifted</h3>
        </div>
      </div>
      {/* List of past workouts */}
      <div className="workout-list">
        {workoutsList.map((workout, index) => {
          return (
            <WorkoutCard
              key={index}
              workout={workout}
              setsList={setsList.filter(
                (set) => set.workout_id === workout.workout_id
              )}
              bestSetsList={bestSetsList.filter(
                (set) => set.workout_id === workout.workout_id
              )}
            />
          );
        })}
      </div>
    </div>
  );
}

interface WorkoutCardProps {
  workout: WorkoutType;
  setsList: SetType[];
  bestSetsList: BestSetType[];
}

function WorkoutCard(props: WorkoutCardProps): JSX.Element {
  return (
    <div
      className="workout-card"
      id={`workout-card-${props.workout.workout_id}`}
    >
      <div className="workout-card-row1">
        <h2 className="workout-card-title">{props.workout.title}</h2>
        <h3 className="workout-card-weight-lifted">
          <FaWeightHanging />
          {props.workout.weight_lifted}
        </h3>
        <h3 className="workout-card-duration">
          <FaClock />
          {props.workout.duration_mins}
        </h3>
        <h3 className="workout-card-exercises">
          <GiWeightLiftingUp />
          {props.workout.exercises}
        </h3>
      </div>
      <div className="workout-card-row2">
        <h3 className="workout-card-day">{props.workout.day}</h3>
        <h4 className="workout-card-date">{props.workout.date}</h4>
      </div>
      <hr />
      <div className="workout-card-body">
        <h5 className="workout-card-best-sets-title">Highlights</h5>
        {props.bestSetsList.slice(0, 3).map((set, index) => {
          return (
            <div
              key={`best-set-div-${index}`}
              className="workout-card-best-set"
            >
              <h6 key={`best-set-name-${index}`}>{set.name}</h6>
              <h6 key={`best-set-weight-${index}`}>{set.weight} Kg</h6>
              <h6 key={`best-set-reps-${index}`}>{set.reps}x</h6>
            </div>
          );
        })}
      </div>
    </div>
  );
}
