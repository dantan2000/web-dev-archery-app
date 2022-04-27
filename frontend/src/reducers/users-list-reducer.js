import { CREATE_SCORECARD, DELETE_SCORECARD, FIND_SCORECARDS, UPDATE_SCORECARD }
from "../actions/scorecard-actions";

const scorecardsListReducer = (state = [], action) => {
  switch (action.type) {
    case FIND_USERS:
      return action.scorecards;
    case DELETE_SCORECARD:
      return state.filter(
        scorecard => scorecard._id !== action.scorecard._id);
    case UPDATE_SCORECARD:
      return state.map(
        scorecard => scorecard._id === action.scorecard._id ? action.scorecard : scorecard); 
    default:
      return state;
  }
}

export default scorecardsListReducer;