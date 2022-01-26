import { useState } from "react";
import { ExerciseType } from "../../types/ExerciseType";
import "./LogWorkout.css";

interface LogWorkoutProps {
  exerciseList: ExerciseType[];
}

export function LogWorkout(props: LogWorkoutProps): JSX.Element {
  return (
    <div className="log-workout">
      <div className="log-workout-title">
        <h1>Log a workout</h1>
      </div>
      <WorkoutForm exerciseList={props.exerciseList} />
    </div>
  );
}

interface WorkoutFormProps {
  exerciseList: ExerciseType[];
}

interface FormContentType {
  title: string;
  day: string;
  notes: string;
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
};

function WorkoutForm(props: WorkoutFormProps): JSX.Element {
  const [formContent, setFormContent] =
    useState<FormContentType>(defaultFormContent);
  const [currSet, setCurrSet] = useState<SetContentType>(defaultSetContent);
  const setsArray: SetContentType[] = [];

  function handlePostWorkout() {
    console.log("incomplete function");
  }

  return (
    <div className="workout-form">
      <form>
        <div className="form-row">
          <label htmlFor="inputTitle">Title</label>
          <input
            type="text"
            className="form-control"
            id="inputTitle"
            placeholder="Afternoon Workout"
            value={formContent.title}
            onChange={(e) =>
              setFormContent({
                ...formContent,
                title: e.target.value,
              })
            }
          />
        </div>
        <div className="form-row">
          <label htmlFor="inputDay">What day is it?</label>
          <input
            type="text"
            className="form-control"
            id="inputDay"
            placeholder="Chest and Triceps"
            value={formContent.day}
            onChange={(e) =>
              setFormContent({
                ...formContent,
                day: e.target.value,
              })
            }
          />
        </div>
        <hr />
        <div className="form-row workout-form-exercise-headers">
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
        <div className="form-row workout-form-sets-inputs">
          <div className="form-group">
            <div className="form-group col-md-6 workout-form-name-input">
              {/* Dropdown for exercises from api */}
              <select
                id="exerciseDropdown"
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
            <div className="form-group col-md-3 workout-form-weight-input">
              <input
                type="text"
                className="form-control"
                id="inputWeight"
                value={currSet.weight}
                onChange={(e) => {
                  setCurrSet({
                    ...currSet,
                    weight: parseInt(e.target.value),
                  });
                }}
              />
            </div>
            <div className="form-group col-md-3 workout-form-reps-input">
              <input
                type="text"
                className="form-control"
                id="inputReps"
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
          <button
            className="btn btn-primary workout-form-add-set-button"
            onClick={(e) => {
              e.preventDefault();
              setsArray.push(currSet);
              setCurrSet(defaultSetContent);
              console.log(setsArray);
            }}
          >
            New set
          </button>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={() => handlePostWorkout()}
        >
          Finish Workout
        </button>
      </form>
    </div>
  );
}
