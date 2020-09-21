// store.ts

import { createStore } from "redux";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import actionTypes from "./actions";

const initialState = { tick: "init", val: "" };

// create your reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };
    case actionTypes.TEST:
      return { ...state, val: action.payload };
    default:
      return state;
  }
};

// create a makeStore function
const makeStore = (context) => createStore(reducer);

// export an assembled wrapper
export const wrapper = createWrapper(makeStore, { debug: true });
