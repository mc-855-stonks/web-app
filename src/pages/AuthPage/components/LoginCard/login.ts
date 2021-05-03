import { doPublicPostRequest } from "../../../../utils/stonksApi";

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
