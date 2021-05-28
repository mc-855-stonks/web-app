import { doAuthenticatedRequest } from "../utils/stonksApi";

export interface StockInfo {
  ticker: string;
  company_name: string;
  invested_value: number;
  current_total: number;
  current_price: number;
  mean_price: number;
  curr_return: number;
  curr_return_percent: number;
  amount: number;
  proportion: number;
}

export interface WalletResponse {
  total_invested: number;
  wallet_total: number;
  wallet_return: number;
  wallet_return_percent: number;
  stocks: Array<StockInfo>;
}

export const getWalletSummary = async () => {
  const response = await doAuthenticatedRequest<WalletResponse>(
    "GET",
    "wallet/"
  );
  return response.data;
};
