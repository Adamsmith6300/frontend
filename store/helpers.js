import jwt from "jwt-decode";
import axios from "axios";

export const saveLoginSession = (response) => {
  if (response.data) {
    const user = jwt(response.data["AuthenticationResult"]["IdToken"]);
    response.data["AuthenticationResult"]["IdExp"] = user["exp"];
    localStorage.setItem(
      "AuthResults",
      JSON.stringify(response.data["AuthenticationResult"])
    );
  }
};

export const isLoggedIn = () => {
  const authRes = JSON.parse(localStorage.getItem("AuthResults"));
  const nowUnix = Math.floor(Date.now() / 1000);
  return (
    authRes !== undefined && authRes !== null && authRes["IdExp"] > nowUnix
  );
};

export const logoutSession = () => {
  localStorage.removeItem("AuthResults");
};

export const getAuth = () => {
  const authRes = JSON.parse(localStorage.getItem("AuthResults"));
  return authRes["IdToken"];
};

export const checkMerchant = () => {
  const authRes = JSON.parse(localStorage.getItem("AuthResults"));
  if (authRes != null) {
    const user = jwt(authRes["IdToken"]);
    return user["cognito:groups"].includes("merchant-group");
  }
  return false;
};

export const fetchMerchantData = async () => {
  const authRes = JSON.parse(localStorage.getItem("AuthResults"));
  const user = jwt(authRes["IdToken"]);
  const resp = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/people/merchant/${user["sub"]}`,
    {
      headers: {
        Authorization: authRes["IdToken"],
      },
    }
  );
  return resp;
};
