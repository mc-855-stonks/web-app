import { doAuthenticatedRequest } from "../utils/stonksApi";

export interface SectorData {
  sector: string;
  current_total: number;
  proportion: number;
}

export interface TickerData {
  ticker: string;
  current_total: number;
  proportion: number;
}

export interface PerformanceResponse {
  alpha: number;
  beta: number;
  volatility: number;
  sharpe: number;
}

export const getPerformance = async () => {
  const response = await doAuthenticatedRequest<PerformanceResponse>(
    "GET",
    `performance/`
  );
  return response.data;
};
