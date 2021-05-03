import axios from "axios";
import Cookies from "js-cookie";

axios.interceptors.request.use((config) => {
  config.headers["Content-Type"] = "application/json";
  return config;
});

const getAuthorizationHeader = () => {
  return { headers: { Authorization: Cookies.get("STONKS_SESSION") } };
};

const doPublicPostRequest = (
  resource: string,
  data: any,
  onSuccess: any,
  onError: any
) => {
  axios
    .post(`${process.env.REACT_APP_STONKS_API_BASE_URL}${resource}/`, data)
    .then(onSuccess)
    .catch(onError);
};

const doAuthenticatedPostRequest = (
  resource: string,
  data: any,
  onSuccess: any,
  onError: any
) => {
  axios
    .post(
      `${process.env.REACT_APP_STONKS_API_BASE_URL}${resource}/`,
      data,
      getAuthorizationHeader()
    )
    .then(onSuccess)
    .catch(onError);
};

const doAuthenticatedGetRequest = (
  resource: string,
  onSuccess: any,
  onError: any
) => {
  axios
    .get(
      `${process.env.REACT_APP_STONKS_API_BASE_URL}${resource}/`,
      getAuthorizationHeader()
    )
    .then(onSuccess)
    .catch(onError);
};

const doAuthenticatedPutRequest = (
  resource: string,
  data: any,
  onSuccess: any,
  onError: any
) => {
  axios
    .put(
      `${process.env.REACT_APP_STONKS_API_BASE_URL}${resource}/`,
      data,
      getAuthorizationHeader()
    )
    .then(onSuccess)
    .catch(onError);
};

const doAuthenticatedDeleteRequest = (
  resource: string,
  onSuccess: any,
  onError: any
) => {
  axios
    .delete(
      `${process.env.REACT_APP_STONKS_API_BASE_URL}${resource}/`,
      getAuthorizationHeader()
    )
    .then(onSuccess)
    .catch(onError);
};

export {
  doPublicPostRequest,
  doAuthenticatedGetRequest,
  doAuthenticatedPostRequest,
  doAuthenticatedPutRequest,
  doAuthenticatedDeleteRequest,
};
