import { doAuthenticatedRequest } from "../utils/stonksApi";

interface EditProfileResponse {
  status: number;
  message: string;
}

interface EditProfileRequest {
  name: string;
  investor_profile: string;
  password: string;
}

export interface GetProfileResponseData {
  id: number;
  name: string;
  email: string;
  password: string;
  investor_profile: string;
}

interface GetProfileResponse {
  data: GetProfileResponseData;
}

export const editProfile = async (
  name: string,
  investorProfile: string,
  password: string
) => {
  const userData = {
    name,
    investor_profile: investorProfile,
    password,
  };

  const response = await doAuthenticatedRequest<
    EditProfileResponse,
    EditProfileRequest
  >("PUT", "user/", userData);
  return response.data;
};

export const getProfile = async () => {
  const response = await doAuthenticatedRequest<GetProfileResponse>(
    "GET",
    "user/"
  );
  return response.data.data;
};
