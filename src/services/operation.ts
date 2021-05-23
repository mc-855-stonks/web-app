import { doAuthenticatedRequest } from "../utils/stonksApi";

interface CreateOperationRequest {
  date: string;
  side: string;
  amount: number;
  price: number;
  ticker: string;
}

export interface CreateOperationResponse {
  status: string;
  message: string;
}

export const createOperation = async (
  date: string,
  side: string,
  amount: number,
  price: number,
  ticker: string
) => {
  const request = {
    date,
    side,
    amount,
    price,
    ticker,
  };

  const response = await doAuthenticatedRequest<
    CreateOperationResponse,
    CreateOperationRequest
  >("POST", "operation/", request);
  return response.data;
};
