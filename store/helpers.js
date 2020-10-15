import jwt from "jwt-decode";

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
  console.log(nowUnix);
  console.log(authRes["IdExp"]);
  return (
    authRes !== undefined && authRes !== null && authRes["IdExp"] > nowUnix
  );
};
