import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createWrapper, HYDRATE } from "next-redux-wrapper";

import middleware from "./middleware";
import actionTypes from "./actions";

const initialState = { val: "" };

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
      return { ...state, successfulLogin: true };
    case actionTypes.VERIFY_SUCCESS:
      return { ...state, verifiedUser: true };
    default:
      return state;
  }
};

// create a makeStore function
const makeStore = (context) =>
  createStore(reducer, compose(applyMiddleware(thunk, ...middleware)));

// export an assembled wrapper
export const wrapper = createWrapper(makeStore, { debug: true });
