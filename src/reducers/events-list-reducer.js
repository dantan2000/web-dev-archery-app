import { FIND_EVENTS }
from "../actions/event-actions";

const eventsListReducer = (state = [], action) => {
  switch (action.type) {
    case FIND_EVENTS:
      return [
        ...state,
        action.events
      ];
    default:
      return state;
  }
}

export default eventsListReducer;