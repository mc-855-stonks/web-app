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

export const getPortfolio = async () => {
  /*
  const response = await doAuthenticatedRequest<PortfolioResponse>(
    "GET",
    "portfolio/"
  );
  return response.data; */
  return {
    stocks: [
      { ticker: "PETR4", current_total: 400, proportion: 0 },
      { ticker: "ITU4", current_total: 1000, proportion: 0 },
      { ticker: "VVAR", current_total: 900, proportion: 0 },
      { ticker: "BBDC3", current_total: 700, proportion: 0 },
      { ticker: "SANB4", current_total: 2000, proportion: 0 },
    ],
    sectors: [
      { sector: "Petróleo", current_total: 400, proportion: 0 },
      { sector: "Banco", current_total: 3700, proportion: 0 },
      { sector: "Varejo", current_total: 900, proportion: 0 },
    ],
  };
};
