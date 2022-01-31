import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import "./HomePage.css";
import { config } from "dotenv";
import { FaWeightHanging, FaClock } from "react-icons/fa";

import { CgArrowsExpandRight } from "react-icons/cg";
import { GiWeightLiftingUp } from "react-icons/gi";
import { WorkoutType } from "../../types/WorkoutType";
import { SetType } from "../../types/SetType";
import { BestSetType } from "../../types/BestSetType";
import moment from "moment";

config();

const baseURL = process.env.REACT_APP_API_BASE;

interface HomePageProps {
  workoutsList: WorkoutType[];
  setWorkoutsList: (input: WorkoutType[]) => void;
}
export function HomePage(props: HomePageProps): JSX.Element {
  const [setsList, setSetsList] = useState<SetType[]>([]);
  const [bestSetsList, setBestSetsList] = useState<SetType[]>([]);
  const [totalWeight, setTotalWeight] = useState<number>(0);
  const { setWorkoutsList } = props;
  const getWorkouts = useCallback(async () => {
    try {
      const res = await axios.get(`${baseURL}/workouts`);
      const workoutResults = res.data.data;
      setWorkoutsList(workoutResults);
      console.log(workoutResults);
    } catch (err) {
      console.log(err);
    }
  }, [setWorkoutsList]);

  const getSets = useCallback(async () => {
    try {
      const res = await axios.get(`${baseURL}/sets`);
      const setResults = res.data.data;
      setSetsList(setResults);
      console.log({ setResults });
    } catch (err) {
      console.log(err);
    }
  }, []);

  const getTotalWeight = useCallback(async () => {
    try {
      const res = await axios.get(`${baseURL}/totalweight`);
      const weightResult = res.data.data[0].sum;
      setTotalWeight(weightResult);
      console.log({ weightResult });
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
    getTotalWeight();
  }, [getWorkouts, getSets, getBestSets, getTotalWeight]);

  return (
    <div className="home-page">
      {/* General Statistics */}
      <div className="general-stats">
        <div className="general-stats-pbs">
          <h2 className="general-stats-pbs-num">X</h2>
          <h3 className="general-stats-pbs-desc">PBs</h3>
        </div>
        <div className="general-stats-workouts">
          <h2 className="general-stats-workouts-num">
            {props.workoutsList.length}
          </h2>
          <h3 className="general-stats-workouts-desc">Workouts</h3>
        </div>
        <div className="general-stats-weight">
          <h2 className="general-stats-weight-num">
            {parseFloat((totalWeight / 1000).toPrecision(3))}
          </h2>
          <h3 className="general-stats-weight-desc">Tonnes Lifted</h3>
        </div>
      </div>
      {/* List of past workouts */}
      <div className="workout-list">
        {props.workoutsList.map((workout, index) => {
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
        <div className="workout-card-title">
          <h2>{props.workout.title}</h2>
        </div>
        <div className="workout-card-weight-lifted">
          <h3 className="workout-card-weight-lifted-icon">
            {" "}
            <FaWeightHanging />
          </h3>
          <h3>{props.workout.weight_lifted}</h3>
        </div>
        <div className="workout-card-duration">
          <h3 className="workout-card-duration-icon">
            {" "}
            <FaClock />
          </h3>
          <h3>{props.workout.duration_mins}</h3>
        </div>
        <div className="workout-card-exercises">
          <h3 className="workout-card-exercises-icon">
            {" "}
            <GiWeightLiftingUp />
          </h3>
          <h3>{props.workout.exercises}</h3>
        </div>
      </div>
      <div className="workout-card-row2">
        <h3 className="workout-card-day">{props.workout.day}</h3>
        <h4 className="workout-card-date">
          {moment(props.workout.date).calendar()}
        </h4>
      </div>
      <hr />
      <div className={`workout-card-body-${props.workout.workout_id}`}>
        <div
          className={`workout-card-highlights collapse show multi-collapse-${props.workout.workout_id}`}
          id={`highlights-${props.workout.workout_id}`}
        >
          <h5 className="workout-card-best-sets-title">Highlights</h5>
          {props.bestSetsList.slice(0, 3).map((set, index) => {
            return (
              <div
                key={`best-set-div-${index}`}
                className="row workout-card-best-set"
              >
                <h6 key={`best-set-name-${index}`} className="col-6">
                  {set.name}
                </h6>
                <h6 key={`best-set-weight-${index}`} className="col-2">
                  {set.weight} Kg
                </h6>
                <h6 key={`best-set-reps-${index}`} className="col-2">
                  {set.reps}x
                </h6>
              </div>
            );
          })}
        </div>
        <div
          className={`workout-card-all-sets collapse multi-collapse-${props.workout.workout_id}`}
          id={`all-sets-${props.workout.workout_id}`}
        >
          <h5 className="workout-card-all-sets-title">Sets</h5>
          {props.setsList.map((set, index) => {
            // Only display workout name if it is the first instance of it
            let firstSet = true;
            if (index !== 0 && set.name === props.setsList[index - 1].name) {
              firstSet = false;
            }
            return (
              <div key={`set-div-${index}`} className="row workout-card-set">
                <h6 key={`set-name-${index}`} className="col-6">
                  {firstSet ? set.name : "-"}
                </h6>
                <h6 key={`set-weight-${index}`} className="col-2">
                  {set.weight} Kg
                </h6>
                <h6 key={`set-reps-${index}`} className="col-2">
                  {set.reps}x
                </h6>
              </div>
            );
          })}
        </div>
      </div>
      <div className="workout-card-footer">
        <button
          className="workout-card-expand-button"
          type="button"
          data-parent={`.workout-card-body-${props.workout.workout_id}`}
          data-toggle="collapse"
          data-target={`.multi-collapse-${props.workout.workout_id}`}
          aria-expanded="false"
          aria-controls={`highlights-${props.workout.workout_id} all-sets-${props.workout.workout_id}`}
        >
          <CgArrowsExpandRight />
        </button>
      </div>
    </div>
  );
}
