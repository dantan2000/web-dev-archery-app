import { SET_USER, RESET_USER }
from "../actions/user-actions";

const eventReducer = (state = undefined, action) => {
  switch (action.type) {
    case SET_USER:
      return action.DISPLAY_EVENT;
    case RESET_USER:
      return undefined;
    default:
      return state;
  }
}

export default eventReducer;