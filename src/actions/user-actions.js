import * as services from '../services/user-services';

export const SET_USER = 'SET_USER';
export const RESET_USER = 'RESET_USER';
export const FIND_USERS = 'FIND_USERS';

export const createUser = async(dispatch, user) => {
    const newUser = await services.createUser(user);
    dispatch({
        type: SET_USER,
        newUser
    });
}

export const findUserByUserName = async(dispatch, username) => {
    const user = await service.findUserByUserName(username);
    dispatch({
        type: SET_USER,
        user
    });
}

export const findUserByCookie = (dispatch) => {
    const user = await service.findUserByCookie();
    dispatch({
        type: SET_USER,
        user
    });
}

export const logoutUser = (dispatch) => {
  document.cookie = "amongLinesSession=;expires=" + new Date(0).toUTCString();
  dispatch({
    type: RESET_USER
  })
}

export const updateUser = async (dispatch, user) => {
    const status = await services.updateUser(user);
    dispatch({
        type: SET_USER,
        user
    });
}

export const findUsersByFavCompID = async (dispatch, compID) => {
  const users = await services.findUsersByFavCompID(compID);
  dispatch({
    type: FIND_USERS,
    users
  });
}