import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { MuscleType } from "../../types/MuscleType";
import "./HomePage.css";
import { config } from "dotenv";

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

export function HomePage(): JSX.Element {
  const [workoutsList, setWorkoutsList] = useState<WorkoutType[]>([]);

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

  useEffect(() => {
    getWorkouts();
  }, [getWorkouts]);

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
      <div className="workouts-list">
        {workoutsList.map((workout, index) => {
          return <WorkoutCard key={index} workout={workout} />;
        })}
      </div>
    </div>
  );
}

interface WorkoutCardProps {
  workout: WorkoutType;
}
function WorkoutCard(props: WorkoutCardProps): JSX.Element {
  return (
    <div
      className="workout-card"
      id={`workout-card-${props.workout.workout_id}`}
    >
      <div className="workout-card-header">
        <h2 className="workout-card-title">{props.workout.title}</h2>
        <h3>{props.workout.weight_lifted}</h3>
        <h3>{props.workout.exercises}</h3>
      </div>

      <h3 className="workout-card-day">{props.workout.day}</h3>
      <h4 className="workout-card-date">{props.workout.date}</h4>
    </div>
  );
}
