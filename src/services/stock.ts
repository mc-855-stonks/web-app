import { doAuthenticatedRequest } from "../utils/stonksApi";

export interface Stock {
  id: number;
  ticker: string;
  name: string;
  segment: string;
  image: string;
}

interface GetStocksResponse {
  stocks: Array<Stock>;
}

export const getAvailableStocks = async () => {
  const response = await doAuthenticatedRequest<GetStocksResponse>(
    "GET",
    "stock/"
  );
  return response.data;
};
