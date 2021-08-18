import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createWrapper, HYDRATE } from "next-redux-wrapper";

import middleware from "./middleware";
import actionTypes from "./actions";

const initialState = {
  cartData: {
    items: {},
    total: 0,
  },
  checkout: { activeStep: 1, pi_client_secret: null },
};

// create your reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };
    case actionTypes.ERROR_SUBMIT_FORM_DATA:
      return { ...state, formError: action.payload };
    case actionTypes.SIGNUP_SUCCESS:
      return { ...state, successfulSignup: true };
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        successfulLogin: true,
      };
    case actionTypes.VERIFY_SUCCESS:
      return { ...state, verifiedUser: true };
    case actionTypes.VERIFY_FAILED:
      return { ...state, error: action.payload };
    case actionTypes.ERROR:
      return { ...state, error: action.payload };
    case actionTypes.GET_PRODUCTS:
      return { ...state, products: action.payload };
    case actionTypes.GET_CATEGORIES:
      return { ...state, categories: action.payload };
    case actionTypes.GET_MERCHANTS:
      return { ...state, merchants: action.payload };
    case actionTypes.TOGGLE_CART:
      return { ...state, showCart: action.payload };
    case actionTypes.UPDATE_CART:
      let newTotal = state.cartData.total + action.payload.totalChange;
      return { ...state, cartData: { ...action.payload, total: newTotal } };
    case actionTypes.SET_ACTIVE_CHECKOUT:
      return {
        ...state,
        checkout: { ...state.checkout, activeStep: action.payload },
      };
    case actionTypes.POST_NEW_ORDER:
      return {
        ...state,
        checkout: {
          ...state.checkout,
          postNewOrderSuccess: true,
        },
      };
    case actionTypes.CLEAR_FLAG:
      const flag = action.payload;
      return { ...state, [flag]: false };
    case actionTypes.MERCHANT_APPLICATION_SUCCESS:
      return { ...state, successfulMerchantApplication: true };
    case actionTypes.SET_MERCHANT_DATA:
      return { ...state, myShop: action.payload };
    case actionTypes.SAVE_PERSON_INFO:
      return { ...state, personInfo: action.payload };
    case actionTypes.LOGOUT_PERSON:
      return { ...state, myShop: null, personInfo: null };
    default:
      return state;
  }
};

// create a makeStore function
const makeStore = (context) =>
  createStore(reducer, compose(applyMiddleware(thunk, ...middleware)));

// export an assembled wrapper
export const wrapper = createWrapper(makeStore, { debug: false });
