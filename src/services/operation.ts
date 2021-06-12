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

export interface Operation {
  id: number;
  date: string;
  side: "buy" | "sell";
  amount: number;
  price: number;
  ticker: string;
}

export interface GetOperationsResponse {
  data: Array<Operation>;
}

export const getOperations = async (ticker: string) => {
  const response = await doAuthenticatedRequest<GetOperationsResponse>(
    "GET",
    `operation/?ticker=${ticker}`
  );

  return response.data;
};

interface UpdateOperationRequest {
  id: number;
  date: string;
  side: string;
  amount: number;
  price: number;
  ticker: string;
}

export interface UpdateOperationResponse {
  status: string;
  message: string;
}

export const updateOperation = async (
  id: number,
  date: string,
  side: string,
  amount: number,
  price: number,
  ticker: string
) => {
  const request = {
    id,
    date,
    side,
    amount,
    price,
    ticker,
  };
  const response = await doAuthenticatedRequest<
    UpdateOperationResponse,
    UpdateOperationRequest
  >("PUT", "operation/", request);
  return response.data;
};

export interface DeleteOperationRequest {
  id: number;
  ticker: string;
}

export interface DeleteOperationResponse {
  status: string;
  message: string;
}

export const deleteOperation = async (id: number, ticker: string) => {
  const request = {
    id,
    ticker,
  };
  const response = await doAuthenticatedRequest<
    DeleteOperationResponse,
    DeleteOperationRequest
  >("DELETE", "operation/", request);
  return response.data;
};
