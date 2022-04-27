import * as services from '../services/scorecard-services';

export const CREATE_SCORECARD = 'CREATE_SCORECARD';
export const FIND_SCORECARDS = 'FIND_SCORECARDS';
export const UPDATE_SCORECARD = 'UPDATE_SCORECARD';
export const DELETE_SCORECARD = 'DELETE_SCORECARD';
export const DISPLAY_SCORECARD = 'DISPLAY_SCORECARD';

export const createScorecard = async(dispatch, scorecard) => {
    const newSC = await services.createScorecard(scorecard);
    dispatch({
        type: CREATE_SCORECARD,
        newSC
    });
}

export const findAllScorecards = async(dispatch) => {
    const scorecards = await services.findAllScorecards();
    dispatch({
        type: FIND_SCORECARDS,
        scorecards
    });
}

export const findScorecardsByUsername = async(dispatch, username) => {
    const scorecards = await services.findScorecardsByUsername(username);
    dispatch({
        type: FIND_SCORECARDS,
        scorecards
    });
}

// TODO
// export const findScorecardById = (dispatch, id) => {
// }

export const updateScorecard = async (dispatch, scorecard) => {
    const status = await services.updateScorecard(scorecard);
    dispatch({
        type: UPDATE_SCORECARD,
        scorecard
    });
}

export const deleteScorecard = async (dispatch, scorecard) => {
    const response = await services.deleteScorecard(scorecard);
    dispatch({
        type: DELETE_SCORECARD,
        scorecard
    });
}