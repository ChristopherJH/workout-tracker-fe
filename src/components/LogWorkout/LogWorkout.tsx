import { useState } from "react";
import { ExerciseType } from "../../types/ExerciseType";
import "./LogWorkout.css";
import { GrAddCircle } from "react-icons/gr";
import { MdDone } from "react-icons/md";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";

import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { config } from "dotenv";
import { WorkoutType } from "../../types/WorkoutType";

config();

const baseURL = process.env.REACT_APP_API_BASE;

interface LogWorkoutProps {
  exerciseList: ExerciseType[];
  setWorkoutsList: (input: WorkoutType[]) => void;
}

export function LogWorkout(props: LogWorkoutProps): JSX.Element {
  return (
    <div className="log-workout">
      <div className="log-workout-title">
        <h1>Log a workout</h1>
      </div>
      <WorkoutForm
        exerciseList={props.exerciseList}
        setWorkoutsList={props.setWorkoutsList}
      />
    </div>
  );
}

interface WorkoutFormProps {
  exerciseList: ExerciseType[];
  setWorkoutsList: (input: WorkoutType[]) => void;
}

interface FormContentType {
  title: string;
  day: string;
  notes: string;
  duration_mins: number;
  date: Date;
}

interface SetContentType {
  workout_id: number;
  name: string;
  weight: number;
  reps: number;
}

const defaultSetContent: SetContentType = {
  workout_id: 0,
  name: "",
  weight: 0,
  reps: 0,
};

const defaultFormContent: FormContentType = {
  title: "Workout",
  day: "",
  notes: "",
  duration_mins: 0,
  date: new Date(),
};

function WorkoutForm(props: WorkoutFormProps): JSX.Element {
  const [formContent, setFormContent] =
    useState<FormContentType>(defaultFormContent);
  const [currSet, setCurrSet] = useState<SetContentType>(defaultSetContent);
  const [setsArray, setSetsArray] = useState<SetContentType[]>([]);
  const navigate = useNavigate();

  async function handlePostWorkout(
    workoutData: FormContentType,
    setsData: SetContentType[]
  ) {
    try {
      const workoutRes = await axios.post(`${baseURL}/workout`, workoutData);
      console.log({ workoutRes });
      const updateWorkoutsRes = await axios.get(`${baseURL}/workouts`);
      const workoutResults = updateWorkoutsRes.data.data;
      props.setWorkoutsList(workoutResults);
      const setsRes = await axios.post(
        `${baseURL}/${workoutRes.data.data.workout_id}/sets`,
        { data: setsData }
      );
      navigate("/");
      setFormContent(defaultFormContent);

      setSetsArray([]);
      console.log(setsRes);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="workout-form">
      <form>
        <div>
          <label className="workout-form-title-label">
            Title
            <input
              type="text"
              className="form-control workout-form-title-input"
              placeholder="Afternoon Workout"
              value={formContent.title}
              onChange={(e) =>
                setFormContent({
                  ...formContent,
                  title: e.target.value,
                })
              }
            />
          </label>
        </div>
        <div>
          <label className="workout-form-day-label">
            What day is it?
            <input
              type="text"
              className="form-control workout-form-day-input"
              placeholder="Chest and Triceps"
              value={formContent.day}
              onChange={(e) =>
                setFormContent({
                  ...formContent,
                  day: e.target.value,
                })
              }
            />
          </label>
        </div>
        <div className="workout-form-date-picker">
          <label className="workout-form-date-label">
            When did you workout?
            <DatePicker
              selected={formContent.date}
              onChange={(date) => {
                setFormContent({
                  ...formContent,
                  date: date !== null ? date : new Date(),
                });
              }}
            />
          </label>
        </div>
        <div>
          <label className="workout-form-day-label">
            For how long (minutes)?
            <input
              className="form-control workout-form-duration-input"
              placeholder="50"
              value={formContent.duration_mins}
              onChange={(e) =>
                setFormContent({
                  ...formContent,
                  duration_mins: parseInt(e.target.value),
                })
              }
            />
          </label>
        </div>
        <hr />
        <div className="workout-form-exercise-headers">
          <h4>Exercise</h4>
          <h4>Weight (Kg)</h4>
          <h4>Reps</h4>
        </div>
        <div className="workout-form-prev-sets">
          {setsArray.map((set, index) => {
            return (
              <div
                className="workout-form-prev-sets-card"
                key={`prev-sets-div-${index}`}
              >
                <h5 key={`prev-sets-name-${index}`}>{set.name}</h5>
                <h5 key={`prev-sets-weight-${index}`}>{set.weight}</h5>

                <h5 key={`prev-sets-reps-${index}`}>{set.reps}</h5>
              </div>
            );
          })}
        </div>
        <div className="workout-form-sets-inputs">
          <div>
            <div className="workout-form-name-input">
              {/* Dropdown for exercises from api */}
              <select
                className="form-control"
                value={currSet.name}
                onChange={(e) => {
                  setCurrSet({
                    ...currSet,
                    name: e.target.value,
                  });
                }}
              >
                {props.exerciseList.map((exercise) => {
                  return (
                    <option key={`${exercise.name}`}>{exercise.name}</option>
                  );
                })}
              </select>
            </div>
            <div className="workout-form-weight-input">
              <input
                type="text"
                className="form-control"
                value={currSet.weight}
                onChange={(e) => {
                  setCurrSet({
                    ...currSet,
                    weight: parseInt(e.target.value),
                  });
                }}
              />
            </div>
            <div className="workout-form-reps-input">
              <input
                type="text"
                className="form-control"
                value={currSet.reps}
                onChange={(e) => {
                  setCurrSet({
                    ...currSet,
                    reps: parseInt(e.target.value),
                  });
                }}
              />
            </div>
          </div>
        </div>
        <div className="workout-form-add-set">
          <div className="workout-form-add-set-icon">
            <GrAddCircle />
          </div>
          <button
            className="workout-form-add-set-button"
            onClick={(e) => {
              e.preventDefault();
              setSetsArray((prevVals) => [...prevVals, currSet]);
            }}
          >
            New set
          </button>
        </div>
        <div>
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              handlePostWorkout(formContent, setsArray);
            }}
          >
            <MdDone />
            Finish Workout
          </button>
        </div>
      </form>
    </div>
  );
}
