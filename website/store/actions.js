import axios from "axios";

const actionTypes = {
  TEST: "TEST",
  SUBMIT_FORM_DATA: "SUBMIT_FORM_DATA",
  ERROR_SUBMIT_FORM_DATA: "ERROR_SUBMIT_FORM_DATA",
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
        .post(`${process.env.NEXT_PUBLIC_API_URL}/user/signup`, formData)
        .then(function (response) {
          console.log(response);
          dispatch({ type: actionTypes.SUBMIT_FORM_DATA });
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
};

export default {
  // TYPES
  ...actionTypes,
  // ACTIONS
  ...actions,
};
