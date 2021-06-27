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
    "return/"
  );
  return response.data;
};

export interface GetDailyIncomeResponse {
  returns: number;
}

export const getDailyIncome = async () => {
  const response = await doAuthenticatedRequest<GetDailyIncomeResponse>(
    "GET",
    "return/daily"
  );
  return response.data;
};
