import { doAuthenticatedRequest } from "../utils/stonksApi";

export interface MonthlyIncomeData {
  date: string;
  return: number;
}

export const getMonthlyIncome = async () => {
  return [
    { date: "2021-05", return: 4000, },
    { date: "2021-04", return: 3000, },
    { date: "2021-03", return: -2000, },
    { date: "2021-02", return: 2780, },
    { date: "2021-01", return: -300, },
    { date: "2020-12", return: 2390, },
    { date: "2020-11", return: 2390, },
    { date: "2020-10", return: -1500, },
    { date: "2020-09", return: 500, },
    { date: "2020-08", return: 1800, },
    { date: "2020-07", return: -3000, },
    { date: "2020-06", return: 3490, },
  ];
};
