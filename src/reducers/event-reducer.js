import { DISPLAY_EVENT }
from "../actions/world-archery-actions";

const eventReducer = (state = undefined, action) => {
  switch (action.type) {
    case DISPLAY_SCORECARD:
      return action.event;
    default:
      return state;
  }
}

export default eventReducer;