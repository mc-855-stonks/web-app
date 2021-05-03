import { doPublicPostRequest } from "../../../../utils/stonksApi";

interface SavedUserData {
  status: number;
  message: string;
}

interface SaveUserResponse {
  data: SavedUserData;
}

interface SaveUserError {
  message: string;
}

const onSuccess = (response: SaveUserResponse) => {
  console.info("New user saved : ", response.data);
  window.location.href = `${window.location.origin}/login`;
};

const onError = (error: SaveUserError) => {
  console.error(error.message);
};

const saveNewUser = (
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
  doPublicPostRequest("user", userData, onSuccess, onError);
};

export default saveNewUser;
