import Cookies from "js-cookie";

const SESSION_NAME = "STONKS_SESSION";
const SESSION_EXPIRATION_TIME_HOURS = 24;

const saveUserSession = (sessionId: string) => {
  Cookies.set(SESSION_NAME, sessionId, {
    expires: SESSION_EXPIRATION_TIME_HOURS / 24,
  });
};

const removeUserSession = () => {
  Cookies.remove(SESSION_NAME);
};

const getUserSessionId = () => {
  return Cookies.get(SESSION_NAME);
};

export { saveUserSession, removeUserSession, getUserSessionId };
