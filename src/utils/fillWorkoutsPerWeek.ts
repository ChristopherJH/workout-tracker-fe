export interface QueryDataType {
  date: string;
  count: number;
}

export function fillWorkoutsPerWeek(
  datesArray: string[],
  queryData: QueryDataType[]
): number[] {
  const countsArray = new Array(datesArray.length).fill(0);
  queryData.forEach((data) => {
    const datePresent = datesArray.includes(data["date"]);
    if (datePresent) {
      countsArray[datesArray.indexOf(data["date"])] = data["count"];
    }
  });
  return countsArray;
}
