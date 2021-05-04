import { doPublicRequest } from "utils/stonksApi";

interface RegisterResponse {
  status: number;
  message: string;
}

interface RegisterRequest {
  email: string;
  investor_profile: string;
  name: string;
  password: string;
}

export const register = async (
  email: string,
  investorProfile: string,
  name: string,
  password: string
) => {
  const userData = {
    email,
    investor_profile: investorProfile,
    name,
    password,
  };

  const response = await doPublicRequest<RegisterResponse, RegisterRequest>(
    "POST",
    "user/",
    userData
  );
  return response.data;
};
