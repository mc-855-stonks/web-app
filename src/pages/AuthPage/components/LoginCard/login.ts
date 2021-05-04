import { doPublicPostRequest } from "utils/stonksApi";
import { saveUserSession } from "utils/userSession";

interface LoginResponseData {
  status: string;
  message: string;
  Authorization: string;
}

interface LoginResponse {
  data: LoginResponseData;
}

const onSuccessLogin = (response: LoginResponse) => {
  console.info(response.data);
  saveUserSession(response.data.Authorization);
  window.location.href = `${window.location.origin}/profile`;
};

const onErrorLogin = (error: any) => {
  console.error(error.message);
};

const login = (email: string, password: string, onError?: any) => {
  const credentialsData = { email, password };
  doPublicPostRequest(
    "auth/login",
    credentialsData,
    onSuccessLogin,
    onError || onErrorLogin
  );
};

export default login;
