import { doAuthenticatedRequest } from "../utils/stonksApi";

export interface BenchmarkData {
  date: string;
  return: number;
  ibov: number;
  cdi: number;
}

export interface BenchmarkResponse {
  data: Array<Array<BenchmarkData>>;
}

export const getBenchmark = async () => {
  const response = await doAuthenticatedRequest<BenchmarkResponse>(
    "GET",
    "benchmark/"
  );
  return response.data;
};
