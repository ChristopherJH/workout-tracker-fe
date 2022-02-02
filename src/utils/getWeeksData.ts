import moment from "moment";

export function getWeeksData(numOfWeeks: number, offset: number): string[] {
  const weeksData: string[] = [];
  for (let i = numOfWeeks + offset; i > offset; i--) {
    weeksData.push(
      moment()
        .day("Monday")
        .subtract(i - 1, "weeks")
        .format("DD/MM")
    );
  }
  return weeksData;
}
