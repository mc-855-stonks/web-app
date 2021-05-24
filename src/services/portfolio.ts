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

export interface PortfolioResponse {
  sectors: Array<SectorData>;
  stocks: Array<TickerData>;
}

export const getPortfolio = async (displayType: string) => {
  const response = await doAuthenticatedRequest<PortfolioResponse>(
    "GET",
    `portfolio/?groupby=${displayType}`
  );
  return response.data;
};
