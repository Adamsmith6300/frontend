import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createWrapper, HYDRATE } from "next-redux-wrapper";

import middleware from "./middleware";
import actionTypes from "./actions";

const initialState = { tick: "init", val: "" };

// create your reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };
    case actionTypes.TEST:
      return { ...state, val: action.payload };
    case actionTypes.ERROR_SUBMIT_FORM_DATA:
      return { ...state, formError: action.payload };
    case actionTypes.SUBMIT_FORM_DATA:
      return { ...state, successfulSignup: true };
    default:
      return state;
  }
};

// create a makeStore function
const makeStore = (context) =>
  createStore(reducer, compose(applyMiddleware(thunk, ...middleware)));

// export an assembled wrapper
export const wrapper = createWrapper(makeStore, { debug: true });
