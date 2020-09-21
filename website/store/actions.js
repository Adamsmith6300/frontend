import axios from "axios";

const actionTypes = {
  TEST: "TEST",
  SUBMIT_FORM_DATA: "SUBMIT_FORM_DATA",
};

const actions = {
  setTest: (val) => {
    return {
      type: actionTypes.TEST,
      payload: val,
    };
  },
  submitSignup: (formData) => {
    console.log(formData);
    console.log(process.env.NEXT_PUBLIC_API_URL);
    return async (dispatch) => {
      axios
        .post(process.env.NEXT_PUBLIC_API_URL, formData)
        .then(function (response) {
          console.log(response);
          dispatch({ type: actionTypes.SUBMIT_FORM_DATA });
        })
        .catch(function (error) {
          console.log(error);
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
