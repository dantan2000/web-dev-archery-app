import * as services from '../services/scorecard-services';

export const CREATE_SCORECARD = 'CREATE_SCORECARD';
export const FIND_ALL_SCORECARDS = 'FIND_ALL_SCORECARS';
export const FIND_SC_BY_USER_ID = 'FIND_SC_BY_USER_ID'; //do we need this?
export const UPDATE_SCORECARD = 'UPDATE_SCORECARD';
export const DELETE_SCORECARD = 'DELETE_SCORECARD';

export const createScorecard = async(dispatch, scorecard) => {
    const newSC = await services.createScorecard(scorecard);
    dispatch({
        type: CREATE_SCORECARD,
        newSC
    });
}

export const findAllScorecards = async(dispatch) => {
    const scorecards = await servvice.findAllScorecards();
    dispatch({
        type: FIND_ALL_SCORECARDS,
        scorecards
    });
}

//uhhhhh?
export const findScorecardsByUserID = () => {}

export const updateScorecard = async (dispatch, scorecard) => {
    const status = await services.updateScorecard(scorecard);
    dispatch({
        type: UPDATE_SCORECARD,
        scorecard
    });
}

export const deleteScorecard = async (dispatc, tuit) => {
    const response = await services.deleteScorecard(scorecard);
    dispatch({
        type: DELETE_SCORECARD,
        scorecard
    })
}