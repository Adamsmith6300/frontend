const actionTypes = {
  TEST: "TEST",
};

const actions = {
  setTest: (val) => {
    return {
      type: actionTypes.TEST,
      payload: val,
    };
  },
};

export default {
  // TYPES
  ...actionTypes,
  // ACTIONS
  ...actions,
};
