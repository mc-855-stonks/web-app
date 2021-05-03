import Cookies from "js-cookie";
import { doPublicPostRequest } from "../../../../utils/stonksApi";

const SESSION_EXPIRATION_TIME_HOURS = 24;

interface LoginResponseData {
  status: string;
  message: string;
  Authorization: string;
}

interface LoginResponse {
  data: LoginResponseData;
}

const onSuccess = (response: LoginResponse) => {
  console.info(response.data);
  Cookies.set("STONKS_SESSION", response.data.Authorization, {
    expires: SESSION_EXPIRATION_TIME_HOURS / 24,
  });
  window.location.href = `${window.location.origin}/profile`;
};

const onError = (error: any) => {
  console.error(error.message);
};

const login = (email: string, password: string) => {
  const credentialsData = { email, password };
  doPublicPostRequest("auth/login", credentialsData, onSuccess, onError);
};

export default login;
