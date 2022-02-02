import { config } from "dotenv";
import "./StatsPage.css";
import moment from "moment";

import { WorkoutsPerWeek } from "./WorkoutsPerWeek";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Tooltip } from "react-bootstrap";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Line,
} from "recharts";

config();

export const baseURL = process.env.REACT_APP_API_BASE;

export function StatsPage(): JSX.Element {
  return (
    <div className="stats-page">
      <h1>Statistics</h1>
      <WorkoutsPerWeek />
      <PBProgress />
    </div>
  );
}

interface BestSetDateType {
  workout_id: number;
  name: string;
  weight: number;
  reps: number;
  date: string;
}

function PBProgress(): JSX.Element {
  const [bestSetsDates, setBestSetsDates] = useState<BestSetDateType[]>([]);
  const getBestSetsDates = useCallback(async () => {
    console.log("trying to getSets");
    try {
      const res = await axios.get(`${baseURL}/sets/best/dates`);
      const setResults = res.data.data;
      setBestSetsDates(setResults);
      console.log({ setResults });
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    getBestSetsDates();
  }, [getBestSetsDates]);

  const xData = bestSetsDates.map((set) =>
    moment(set.date).format("YYYY/MM/DD")
  );
  const yData = bestSetsDates.map((set) => set.weight);
  console.log({ xData });
  console.log({ yData });
  const finalData = xData.map((point, index) => {
    return { date: point, weight: yData[index] };
  });
  return (
    <div className="stats-page-pb-progress">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
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
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            name="[STILL TESTING - INCORRECT]"
            type="monotone"
            dataKey="weight"
            stroke="#82ca9d"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
