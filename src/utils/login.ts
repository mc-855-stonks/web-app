import { doPublicPostRequest } from "./stonksApi";
import { saveUserSession } from "./userSession";

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
  saveUserSession(response.data.Authorization);
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
