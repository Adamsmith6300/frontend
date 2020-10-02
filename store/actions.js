import axios from "axios";
import { saveLoginSession } from "./helpers"


const actionTypes = {
  TEST: "TEST",
  SIGNUP_SUCCESS: "SIGNUP_SUCCESS",
  VERIFY_SUCCESS: "VERIFY_SUCCESS",
  VERIFY_FAILED:"VERIFY_FAILED",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  ERROR_SUBMIT_FORM_DATA: "ERROR_SUBMIT_FORM_DATA",
  RESEND_SUCCESS: "RESEND_SUCCESS"
};

const actions = {
  setTest: (val) => {
    return {
      type: actionTypes.TEST,
      payload: val,
    };
  },
  submitSignup: (formData) => {
    delete formData["RePassword"];
    return async (dispatch) => {
      let resp = await axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/people/signup`, formData)
        .then(function (response) {
          console.log(response);
          dispatch({ type: actionTypes.SIGNUP_SUCCESS });
        })
        .catch(function (error) {
          console.log(error.response);
          if (error.response.data.includes("UsernameExistsException")) {
            dispatch({
              type: actionTypes.ERROR_SUBMIT_FORM_DATA,
              payload: "Username exists!",
            });
          }
        });
    };
  },
  verifyUser: (data) => {
    console.log(data)
    return async (dispatch) => {
      const resp = await axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/people/signup/verify`, data)
        .then(function (response) {
          console.log(response);
          dispatch({ type: actionTypes.VERIFY_SUCCESS });
        })
        .catch(function (error) {
          console.log(error.response);
          if (error.response.data == "Account already verified!" || error.response.data == "Account already exists for this alias!") {
            dispatch({
              type: actionTypes.VERIFY_FAILED,
              payload: error.response.data,
            });
          } else {
            dispatch({ type: actionTypes.VERIFY_FAILED, payload: "Failed to verify!" });
          }
        });
    };
  },
  submitLogin: (formData) => {
    return async (dispatch) => {
      const resp = await axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/people/login`, formData)
        .then(function (response) {
          console.log(response);
          saveLoginSession(response);
          dispatch({ type: actionTypes.LOGIN_SUCCESS });
        })
        .catch(function (error) {
          console.log(error.response);
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
        .post(`${process.env.NEXT_PUBLIC_API_URL}/people/signup/resend`, formData)
        .then(function (response) {
          console.log(response);
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
};

export default {
  // TYPES
  ...actionTypes,
  // ACTIONS
  ...actions,
};
