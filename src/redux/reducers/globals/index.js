const initialState = {
  isClicked: false,
};

function appReducer(state = initialState, action) {
  switch (action.type) {
    case "globals/anyAction":
      return { ...state, isClicked: true };
      break;
  }
  return state;
}

export default appReducer;
