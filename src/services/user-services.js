import axios from 'axios';
const API_BASE = process.env.REACT_APP_API_BASE;
const USERS_API = `${API_BASE}/users`;

// Attempts to create user, returns whether successful or not
// If successful, automatically sets browser cookies
export const createUser = async(newUser) => {
  try {
    const response = await axios.post(USERS_API, newUser)
    return true;
  } catch (err) {
    return false
  }
}


export const findAllScorecards = async() => {
  const response = await axios.get(USERS_API);
  const scorecards = response.data;
  return scorecards;
}

export const findUserByUsername = async(username) => {
  const response = await axios.get(`${API_BASE}/user/${username}`);
  const user = response.data;
  return user;
}

export const findUserByCookie = async() => {
  try {
    const response = await axios.get(`${API_BASE}/user_by_cookie`);
    const user = response.data;
    return user;
  } catch (err) {
    return undefined;
  }
}

export const deleteUser = async(user) => {
  const response = await axios
    .delete(`${USERS_API}/${user._id}`);
  return response.data;
}

export const updateUser = async(user) => {
  const response = await axios
    .put(`${USERS_API}/${user._id}`, user);
  return response.data;
}


// Attempts to log in user, returns whether or not login was successful
// If successful, will automatically set browser cookies
export const loginUser = async(username, password) => {
  try {
    const response = await axios.put(`${API_BASE}/user_login`);
    return true;
  } catch (err) {
    return false;
  }

}