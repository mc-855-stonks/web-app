import axios, { Method } from "axios";
import { getUserSessionId } from "./userSession";

axios.interceptors.request.use((config) => {
  config.headers["Content-Type"] = "application/json";
  return config;
});

const getAuthorizationHeader = () => {
  return { Authorization: getUserSessionId() };
};

export const doPublicRequest = <T, R = void>(
  method: Method,
  path: string,
  data: R | void
) => {
  return axios.request<T>({
    url: `${process.env.REACT_APP_STONKS_API_BASE_URL}${path}`,
    data,
    method,
  });
};

export const doAuthenticatedRequest = <T, R = void>(
  method: Method,
  path: string,
  data: R | void
) => {
  return axios.request<T>({
    url: `${process.env.REACT_APP_STONKS_API_BASE_URL}${path}`,
    data,
    method,
    headers: getAuthorizationHeader(),
  });
};
