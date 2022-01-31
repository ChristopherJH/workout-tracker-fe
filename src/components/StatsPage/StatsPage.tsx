import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import {
  fillWorkoutsPerWeek,
  QueryDataType,
} from "../../utils/fillWorkoutsPerWeek";
import { config } from "dotenv";
import moment from "moment";
import "./StatsPage.css";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";
import { weekToDate } from "../../utils/weekToDate";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  BarElement,
  Tooltip,
  Legend
);

config();

const baseURL = process.env.REACT_APP_API_BASE;

export function StatsPage(): JSX.Element {
  return (
    <div className="stats-page">
      <h1>Statistics</h1>
      <WorkoutsPerWeek />
    </div>
  );
}

interface WorkoutsPerWeekType {
  yr: number;
  week: number;
  num: number;
}

function WorkoutsPerWeek(): JSX.Element {
  const [workoutsPerWeek, setWorkoutsPerWeek] = useState<WorkoutsPerWeekType[]>(
    []
  );

  const getWorkoutsPerWeek = useCallback(async () => {
    console.log("trying to getWorkoutsPerWeek");
    try {
      const res = await axios.get(`${baseURL}/workouts/week`);
      const graphResults = res.data.data;
      setWorkoutsPerWeek(graphResults);
      console.log("graph results:", { graphResults });
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    getWorkoutsPerWeek();
  }, [getWorkoutsPerWeek]);

  // Number of weeks we want to show on our graph
  const numOfWeeks = 8;
  // Increase offset to view previous weeks
  const offset = 0;
  // Array to be filled with dates
  const weeksData = [];
  // For each week, get the date of the start of the week, and subtract week numbers
  for (let i = numOfWeeks + offset; i > offset; i--) {
    weeksData.push(
      moment()
        .day("Monday")
        .subtract(i - 1, "weeks")
        .format("DD/MM")
    );
  }

  // Formatting the dates received from the backend
  const formattedData: QueryDataType[] = workoutsPerWeek.map((row, index) => {
    const date = weekToDate(row.week, row.yr);
    return { date: moment(date).format("DD/MM"), count: row.num };
  });

  const countsData = fillWorkoutsPerWeek(weeksData, formattedData);
  return (
    <div className="stats-page-wpw">
      <Bar
        data={{
          labels: weeksData,
          datasets: [
            {
              label: "Workouts",
              data: countsData,
              backgroundColor: "rgba(53, 162, 235, 0.5)",
            },
          ],
        }}
        height={400}
        width={600}
        options={{
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: "Workouts per week",
            },
          },
        }}
      />
    </div>
  );
}
