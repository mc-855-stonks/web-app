import { doAuthenticatedRequest } from "../utils/stonksApi";

export interface MonthlyIncomeData {
  date: string;
  return: number;
}

export interface MonthlyIncomeResponse {
  returns: Array<MonthlyIncomeData>;
}

export const getMonthlyIncome = async () => {
  const response = await doAuthenticatedRequest<MonthlyIncomeResponse>(
    "GET",
    "performance/",
  );
  return response.data;
};
