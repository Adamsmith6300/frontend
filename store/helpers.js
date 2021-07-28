import jwt from "jwt-decode";
import axios from "axios";
import Querystring from "querystring";

export const shuffleArray = (array) => {
  let curId = array.length;
  // There remain elements to shuffle
  while (0 !== curId) {
    // Pick a remaining element
    let randId = Math.floor(Math.random() * curId);
    curId -= 1;
    // Swap it with the current element.
    let tmp = array[curId];
    array[curId] = array[randId];
    array[randId] = tmp;
  }
  return array;
};
export const roundToTwo = (num) => {
  return +(Math.round(num + "e+2") + "e-2");
};
export const saveLoginSession = (response) => {
  console.log("SAVING...");
  console.log(response);
  if (response.data) {
    const user = jwt(response.data["AuthenticationResult"]["IdToken"]);
    response.data["AuthenticationResult"]["IdExp"] = user["exp"];
    localStorage.setItem(
      "AuthResults",
      JSON.stringify(response.data["AuthenticationResult"])
    );
  }
  if (response.IdToken) {
    const user = jwt(response.IdToken);
    let authResults = {
      ...response,
      IdExp: user["exp"],
    };
    localStorage.setItem("AuthResults", JSON.stringify(authResults));
  }
  if (response.id_token) {
    const user = jwt(response.id_token);
    let authResults = {
      ...response,
      IdToken: response["id_token"],
      RefreshToken: response["refresh_token"],
      IdExp: user["exp"],
    };
    localStorage.setItem("AuthResults", JSON.stringify(authResults));
  }
};

export const getTokens = async ({ code, redirect }) => {
  let body = Querystring["stringify"]({
    client_id: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID,
    redirect_uri: process.env.NEXT_PUBLIC_DOMAIN + redirect,
    grant_type: "authorization_code",
    code: code,
  });
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };
  return axios.post(
    `${process.env.NEXT_PUBLIC_AUTH_DOMAIN}/oauth2/token`,
    body,
    config
  );
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

export const getPersonId = () => {
  const authRes = JSON.parse(localStorage.getItem("AuthResults"));
  const person = jwt(authRes["IdToken"]);
  return person["sub"];
};

export const checkMerchant = () => {
  const authRes = JSON.parse(localStorage.getItem("AuthResults"));
  if (authRes != null) {
    const user = jwt(authRes["IdToken"]);
    return (
      "cognito:groups" in user &&
      user["cognito:groups"].includes("merchant-group")
    );
  }
  return false;
};

export const checkPerson = () => {
  const authRes = JSON.parse(localStorage.getItem("AuthResults"));
  if (authRes != null) {
    const user = jwt(authRes["IdToken"]);
    return (
      "cognito:groups" in user &&
      user["cognito:groups"].includes("people-group")
    );
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

export const getAccountLink = async () => {
  const authRes = JSON.parse(localStorage.getItem("AuthResults"));
  const user = jwt(authRes["IdToken"]);
  const resp = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/people/merchant/${user["sub"]}/account-link`,
    {
      headers: {
        Authorization: authRes["IdToken"],
      },
    }
  );
  return resp;
};

export const fetchAccountData = async () => {
  const authRes = JSON.parse(localStorage.getItem("AuthResults"));
  const user = jwt(authRes["IdToken"]);
  const resp = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/people/person/${user["sub"]}`,
    {
      headers: {
        Authorization: authRes["IdToken"],
      },
    }
  );
  return resp;
};

export const refreshIdToken = async () => {
  const authRes = JSON.parse(localStorage.getItem("AuthResults"));
  console.log(authRes);
  if ("RefreshToken" in authRes) {
    const resp = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/people/refresh`,
      { refresh_token: authRes["RefreshToken"] },
      {
        headers: {
          Authorization: authRes["IdToken"],
        },
      }
    );
    return resp;
  }
};

export const updateStoreDetails = async (payload) => {
  const authRes = JSON.parse(localStorage.getItem("AuthResults"));
  const user = jwt(authRes["IdToken"]);
  const resp = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/people/merchant/${user["sub"]}`,
    payload,
    {
      headers: {
        Authorization: authRes["IdToken"],
      },
    }
  );
  return resp;
};

export const updateAccountDetails = async (payload) => {
  const authRes = JSON.parse(localStorage.getItem("AuthResults"));
  const user = jwt(authRes["IdToken"]);
  const resp = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/people/person/${user["sub"]}`,
    payload,
    {
      headers: {
        Authorization: authRes["IdToken"],
      },
    }
  );
  return resp;
};

export const getPresignedBannerURL = async (payload) => {
  const authRes = JSON.parse(localStorage.getItem("AuthResults"));
  const user = jwt(authRes["IdToken"]);
  return axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/people/merchant/${user["sub"]}/banner`,
    payload,
    {
      headers: {
        Authorization: authRes["IdToken"],
      },
    }
  );
};

export const postImageUpload = async (file, presignedData) => {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    Object.keys(presignedData.fields).forEach((key) => {
      if (key != "Cache-Control") {
        formData.append(key, presignedData.fields[key]);
      }
    });
    // Actual file has to be appended last.
    formData.append("file", file);
    const xhr = new XMLHttpRequest();
    xhr.open("POST", presignedData.url, true);
    xhr.send(formData);
    xhr.onload = function () {
      this.status === 204
        ? resolve("Successfully uploaded")
        : reject(this.responseText);
    };
  });
};

export const updateProductDetails = async (productId, payload) => {
  const authRes = JSON.parse(localStorage.getItem("AuthResults"));
  const user = jwt(authRes["IdToken"]);
  const resp = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/people/merchant/${user["sub"]}/product/${productId}`,
    payload,
    {
      headers: {
        Authorization: authRes["IdToken"],
      },
    }
  );
  return resp;
};

export const getPresignedProductImgURL = async (payload) => {
  const authRes = JSON.parse(localStorage.getItem("AuthResults"));
  const user = jwt(authRes["IdToken"]);
  return axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/people/merchant/${user["sub"]}/product/image/upload`,
    payload,
    {
      headers: {
        Authorization: authRes["IdToken"],
      },
    }
  );
};

export const postNewProduct = async (formData) => {
  const authRes = JSON.parse(localStorage.getItem("AuthResults"));
  const user = jwt(authRes["IdToken"]);
  const resp = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/people/merchant/${user["sub"]}/product`,
    formData,
    {
      headers: {
        Authorization: authRes["IdToken"],
      },
    }
  );
  return resp;
};

export const deleteProducts = async (data) => {
  const authRes = JSON.parse(localStorage.getItem("AuthResults"));
  const user = jwt(authRes["IdToken"]);
  const resp = await axios.delete(
    `${process.env.NEXT_PUBLIC_API_URL}/people/merchant/${user["sub"]}/products`,
    {
      headers: {
        Authorization: authRes["IdToken"],
      },
      data: {
        ...data,
      },
    }
  );
  return resp;
};

export const submitSocialLogin = async (params) => {
  let shopify_params = localStorage.getItem("shopify_params");
  let req_url = `${process.env.NEXT_PUBLIC_API_URL}/people/login/social`;
  if (shopify_params) {
    shopify_params = JSON.parse(shopify_params);
    req_url += "?";
    let entries = Object.entries(shopify_params);
    for (let i = 0; i < entries.length; ++i) {
      req_url += entries[i][0] + "=" + entries[i][1];
      if (i < entries.length - 1) {
        req_url += "&";
      }
    }
  }
  const resp = await axios.get(req_url, {
    headers: {
      Authorization: params["id_token"],
    },
  });
  localStorage.removeItem("shopify_params");
  return resp;
};

export const submitSocialLoginMerchant = async (params) => {
  const resp = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/people/login/social/merchant`,
    {
      headers: {
        Authorization: params["IdToken"],
      },
    }
  );
  return resp;
};

export const getAuthUrl = async (storeName) => {
  const authRes = JSON.parse(localStorage.getItem("AuthResults"));
  const user = jwt(authRes["IdToken"]);
  const resp = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/people/merchant/${user["sub"]}/connect?storeName=${storeName}`,
    {
      headers: {
        Authorization: authRes["IdToken"],
      },
    }
  );
  return resp;
};

export const getShopifyProducts = async () => {
  const authRes = JSON.parse(localStorage.getItem("AuthResults"));
  const user = jwt(authRes["IdToken"]);
  const resp = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/people/merchant/${user["sub"]}/shopify/products`,
    {
      headers: {
        Authorization: authRes["IdToken"],
      },
    }
  );
  return resp;
};

export const importProducts = async (products) => {
  const authRes = JSON.parse(localStorage.getItem("AuthResults"));
  const user = jwt(authRes["IdToken"]);
  const resp = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/people/merchant/${user["sub"]}/products`,
    products,
    {
      headers: {
        Authorization: authRes["IdToken"],
      },
    }
  );
  return resp;
};

export const verifyAddress = async (payload) => {
  const authRes = JSON.parse(localStorage.getItem("AuthResults"));
  const resp = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/market/address`,
    payload,
    {
      headers: {
        Authorization: authRes["IdToken"],
      },
    }
  );
  return resp;
};

export const confirmPayment = async (OrderId) => {
  const authorization = getAuth();
  return await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/market/order/${OrderId}/update`,
    {
      headers: {
        Authorization: authorization,
      },
    }
  );
};

export const reviewStore = async () => {
  const authRes = JSON.parse(localStorage.getItem("AuthResults"));
  const user = jwt(authRes["IdToken"]);
  const resp = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/people/merchant/${user["sub"]}/approval`,
    {
      headers: {
        Authorization: authRes["IdToken"],
      },
    }
  );
  return resp;
};

export const resetPasswordRequest = async (payload) => {
  return await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/people/forgot-password`,
    payload
  );
};

export const resetPasswordConfirmation = async (payload) => {
  return await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/people/forgot-password/confirm`,
    payload
  );
};

export const updateMerchantOrderStatus = async (payload) => {
  console.log(payload);
  const authRes = JSON.parse(localStorage.getItem("AuthResults"));
  const user = jwt(authRes["IdToken"]);
  const resp = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/people/merchant/${user["sub"]}/order/${payload.OrderId}`,
    payload,
    {
      headers: {
        Authorization: authRes["IdToken"],
      },
    }
  );
  return resp;
};
