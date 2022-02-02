import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { fillWorkoutsPerWeek } from "../../utils/fillWorkoutsPerWeek";
import "./StatsPage.css";

import moment from "moment";
import { weekToDate } from "../../utils/weekToDate";
import { baseURL } from "./StatsPage";
import { getWeeksData } from "../../utils/getWeeksData";
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Bar,
  Tooltip,
  Legend,
} from "recharts";

interface WorkoutsPerWeekType {
  yr: number;
  week: number;
  num: string;
}

export interface FormattedWeekType {
  date: string;
  count: number;
}

export function WorkoutsPerWeek(): JSX.Element {
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

  // For each week (for a number of weeks, starting from a number of weeks from today), get the date of the start of the week
  const xData = getWeeksData(8, 0);

  // Formatting the dates received from the backend
  const formattedWeeks: FormattedWeekType[] = workoutsPerWeek.map(
    (row, index) => {
      const date = weekToDate(row.week, row.yr);
      return { date: moment(date).format("DD/MM"), count: parseInt(row.num) };
    }
  );

  const countsData = fillWorkoutsPerWeek(xData, formattedWeeks);
  const finalData = xData.map((point, index) => {
    return { week: point, count: countsData[index] };
  });

  return (
    <div className="stats-page-wpw">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={finalData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="week" />
          <YAxis />
          <Tooltip />
          <Legend verticalAlign="top" />

          <Bar name="Workouts per week" dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
