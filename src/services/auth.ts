import { doPublicRequest } from "utils/stonksApi";
import { saveUserSession } from "utils/userSession";

interface LoginResponse {
  status: string;
  message: string;
  Authorization: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

export const login = async (email: string, password: string) => {
  const credentialsData = { email, password };
  const response = await doPublicRequest<LoginResponse, LoginRequest>(
    "POST",
    "auth/login",
    credentialsData
  );
  saveUserSession(response.data.Authorization);

  return response;
};
