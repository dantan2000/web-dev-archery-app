import { DISPLAY_SCORECARD }
from "../actions/scorecard-actions";

const scorecardReducer = (state = undefined, action) => {
  switch (action.type) {
    case DISPLAY_SCORECARD:
      return action.scorecard;
    default:
      return state;
  }
}

export default scorecardReducer;