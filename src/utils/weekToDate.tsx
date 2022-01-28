import moment from "moment";

export function weekToDate(week: number, year: number): Date {
  console.log("week and year parsed:", week, year);
  return moment()
    .year(year)
    .week(week + 1)
    .startOf("week")
    .add(1, "days")
    .toDate();
}
