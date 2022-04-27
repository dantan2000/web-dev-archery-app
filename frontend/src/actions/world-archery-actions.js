import * as services from '../services/world-archery-services';

export const FIND_EVENTS = 'FIND_EVENTS';
export const DISPLAY_EVENT = 'DISPLAY_EVENT';

export const findEvents = async(dispatch, queryString) => {
    const events = await services.findEvents(queryString);
    dispatch({
        type: FIND_EVENTS,
        events
    });
}

export const findEventsByParams = (dispatch, params) => {
    const events = await service.findEventsByParams(params);
    dispatch({
        type: FIND_EVENTS,
        events
    });
}

export const findEventByID = (dispatch, eid) => {
    const event = await service.findEventByID(eid);
    dispatch({
        type: DISPLAY_EVENT,
        event
    });
}