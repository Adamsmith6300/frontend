import axios from "axios";
import {
  saveLoginSession,
  getAuth,
  roundToTwo,
  logoutSession,
} from "./helpers";
import { defaultEvent } from "../utils/gtag";

const actionTypes = {
  ERROR: "ERROR",
  SIGNUP_SUCCESS: "SIGNUP_SUCCESS",
  VERIFY_SUCCESS: "VERIFY_SUCCESS",
  VERIFY_FAILED: "VERIFY_FAILED",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  ERROR_SUBMIT_FORM_DATA: "ERROR_SUBMIT_FORM_DATA",
  RESEND_SUCCESS: "RESEND_SUCCESS",
  GET_PRODUCTS: "GET_PRODUCTS",
  GET_CATEGORIES: "GET_CATEGORIES",
  GET_MERCHANTS: "GET_MERCHANTS",
  TOGGLE_CART: "TOGGLE_CART",
  UPDATE_CART: "UPDATE_CART",
  SET_ACTIVE_CHECKOUT: "SET_ACTIVE_CHECKOUT",
  POST_NEW_ORDER: "POST_NEW_ORDER",
  CLEAR_FLAG: "CLEAR_FLAG",
  MERCHANT_APPLICATION_SUCCESS: "MERCHANT_APPLICATION_SUCCESS",
  SET_MERCHANT_DATA: "SET_MERCHANT_DATA",
  SAVE_PERSON_INFO: "SAVE_PERSON_INFO",
  LOGOUT_PERSON: "LOGOUT_PERSON",
  SET_CART: "SET_CART",
};

const actions = {
  submitSignup: (formData) => {
    delete formData["RePassword"];
    return async (dispatch) => {
      let resp = await axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/people/signup`, formData)
        .then(function (response) {
          saveLoginSession(response);
          dispatch({ type: actionTypes.SIGNUP_SUCCESS });
        })
        .catch(function (error) {
          console.log(error.response);
          dispatch({
            type: actionTypes.ERROR_SUBMIT_FORM_DATA,
            payload: "Failed to signup!",
          });
        });
    };
  },
  verifyUser: (data) => {
    return async (dispatch) => {
      const resp = await axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/people/signup/verify`, data)
        .then(function (response) {
          saveLoginSession(response);
          dispatch({ type: actionTypes.VERIFY_SUCCESS });
        })
        .catch(function (error) {
          console.log(error.response);
          if (
            error.response.data == "Account already verified!" ||
            error.response.data == "Account already exists for this alias!"
          ) {
            dispatch({
              type: actionTypes.VERIFY_FAILED,
              payload: error.response.data,
            });
          } else {
            dispatch({
              type: actionTypes.VERIFY_FAILED,
              payload: "Failed to verify!",
            });
          }
        });
    };
  },
  submitLogin: (formData) => {
    let shopify_params = JSON.parse(localStorage.getItem("shopify_params"));
    return async (dispatch) => {
      const resp = await axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/people/login`, {
          ...formData,
          shopify_params: shopify_params,
        })
        .then(function (response) {
          localStorage.removeItem("shopify_params");
          saveLoginSession(response);
          dispatch({ type: actionTypes.LOGIN_SUCCESS });
        })
        .catch(function (error) {
          console.log(error);
          if (error) {
            dispatch({
              type: actionTypes.ERROR_SUBMIT_FORM_DATA,
              payload: "Email or password are invalid!",
            });
          }
        });
    };
  },
  submitResend: (formData) => {
    return async (dispatch) => {
      const resp = await axios
        .post(
          `${process.env.NEXT_PUBLIC_API_URL}/people/signup/resend`,
          formData
        )
        .then(function (response) {
          dispatch({ type: actionTypes.RESEND_SUCCESS });
        })
        .catch(function (error) {
          console.log(error.response);
          if (error) {
            dispatch({
              type: actionTypes.ERROR_SUBMIT_FORM_DATA,
              payload: "Invalid email!",
            });
          }
        });
    };
  },
  getProducts: () => {
    return async (dispatch) => {
      const resp = await axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/market/products`)
        .then(function (response) {
          dispatch({ type: actionTypes.GET_PRODUCTS, payload: response.data });
        })
        .catch(function (error) {
          dispatch({
            type: actionTypes.ERROR,
            payload: "FAILED TO GET PRODUCTS",
          });
        });
    };
  },
  getCategories: () => {
    return async (dispatch) => {
      const resp = await axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/market/categories`)
        .then(function (response) {
          dispatch({
            type: actionTypes.GET_CATEGORIES,
            payload: response.data,
          });
        })
        .catch(function (error) {
          dispatch({
            type: actionTypes.ERROR,
            payload: "FAILED TO GET CATEGORIES",
          });
        });
    };
  },
  getMerchants: () => {
    return async (dispatch) => {
      const resp = await axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/market/merchants`)
        .then(function (response) {
          dispatch({
            type: actionTypes.GET_MERCHANTS,
            payload: response.data.Merchants,
          });
        })
        .catch(function (error) {
          dispatch({
            type: actionTypes.ERROR,
            payload: "FAILED TO GET MERCHANTS",
          });
        });
    };
  },
  toggleCart: (showCart) => {
    return {
      type: actionTypes.TOGGLE_CART,
      payload: showCart,
    };
  },
  addToCart: (product, oldCart, qty) => {
    let newCart = { ...oldCart };
    let price = product.price;
    let inventory = product.stockUnlimited ? Number.MAX_VALUE : product.stock;
    let cartItemKey = product.ProductId;
    if (product.chosenVariant != null) {
      price = product.chosenVariant.price;
      inventory = product.chosenVariant.stockUnlimited
        ? Number.MAX_VALUE
        : product.chosenVariant.stock;
      cartItemKey = product.ProductId + "_var_" + product.chosenVariant.id;
    }
    if (newCart.items[cartItemKey]) {
      if (newCart.items[cartItemKey].qty + qty <= inventory) {
        newCart.items[cartItemKey].qty += qty;
      }
    } else {
      newCart.items[cartItemKey] = { ...product, qty: qty };
    }
    newCart.totalChange = roundToTwo(price * qty);
    return {
      type: actionTypes.UPDATE_CART,
      payload: newCart,
    };
  },
  removeFromCart: (product, oldCart, qty) => {
    let newCart = { ...oldCart };
    let price = product.price;
    let cartItemKey = product.ProductId;
    if (product.chosenVariant != null) {
      price = product.chosenVariant.price;
      cartItemKey = product.ProductId + "_var_" + product.chosenVariant.id;
    }
    if (newCart.items[cartItemKey]) {
      newCart.items[cartItemKey].qty -= qty;
      newCart.totalChange = -roundToTwo(price * qty);
      if (newCart.items[cartItemKey].qty <= 0) {
        delete newCart.items[cartItemKey];
      }
    }
    return {
      type: actionTypes.UPDATE_CART,
      payload: newCart,
    };
  },
  setCart: (cart) => {
    return {
      type: actionTypes.SET_CART,
      payload: cart,
    };
  },
  setActiveCheckout: (stepNo) => {
    return {
      type: actionTypes.SET_ACTIVE_CHECKOUT,
      payload: stepNo,
    };
  },
  confirmPayment: (OrderId) => {
    const authorization = getAuth();
    return async (dispatch) => {
      const resp = await axios
        .get(
          `${process.env.NEXT_PUBLIC_API_URL}/market/order/${OrderId}/update`,
          {
            headers: {
              Authorization: authorization,
            },
          }
        )
        .then(function (response) {
          dispatch({
            type: actionTypes.POST_NEW_ORDER,
          });
        })
        .catch(function (error) {
          console.log(error.response);
          if (error) {
            dispatch({
              type: actionTypes.ERROR,
              payload: error.response,
            });
          }
        });
    };
  },
  clearFlag: (flag) => {
    return {
      type: actionTypes.CLEAR_FLAG,
      payload: flag,
    };
  },
  submitMerchantApplication: (formData) => {
    const authorization = getAuth();
    return async (dispatch) => {
      const resp = await axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/people/merchant/`, formData, {
          headers: {
            Authorization: authorization,
          },
        })
        .then(function (response) {
          dispatch({ type: actionTypes.MERCHANT_APPLICATION_SUCCESS });
        })
        .catch(function (error) {
          console.log(error.response);
          if (error) {
            dispatch({
              type: actionTypes.ERROR_SUBMIT_FORM_DATA,
              payload: "Failed to submit merchant application!",
            });
          }
        });
    };
  },
  setMerchantData: (data) => {
    return {
      type: actionTypes.SET_MERCHANT_DATA,
      payload: data,
    };
  },
  savePersonInfo: (info) => {
    return {
      type: actionTypes.SAVE_PERSON_INFO,
      payload: info,
    };
  },
  logoutPerson: () => {
    logoutSession();
    return {
      type: actionTypes.LOGOUT_PERSON,
    };
  },
};

export default {
  // TYPES
  ...actionTypes,
  // ACTIONS
  ...actions,
};
