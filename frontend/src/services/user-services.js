import axios from 'axios';
const API_BASE = process.env.REACT_APP_API_BASE;
const USERS_API = `${API_BASE}/users`;

// Attempts to create user, returns the created user if successful, errors otherwise
// If successful, automatically sets browser cookies
export const createUser = async(newUser) => {
  const response = await axios.post(USERS_API, newUser, {withCredentials: true, credentials: 'include'});
  return response;
}

// Finds all users in the database
export const findAllUsers = async() => {
  const response = await axios.get(USERS_API, {withCredentials: true});
  const users = response.data;
  return users;
}

// Given a username, finds the user in the database with that username
export const findUserByUsername = async(username) => {
  const response = await axios.get(`${API_BASE}/user/${username}`, {withCredentials: true});
  const user = response.data;
  return user;
}

// Finds the user based on the browser's cookies
// throws and error if no user is found
export const findUserByCookie = async() => {
  const response = await axios.get(`${API_BASE}/user_by_cookie`, {withCredentials: true});
  const user = response.data;
  return user;
}

// Deletes a user from the database
// Takes in a full User type
export const deleteUser = async(user) => {
  const response = await axios
    .delete(`${USERS_API}/${user._id}`, {withCredentials: true});
  return response.data;
}

// Updates a user in the database
// Takes in a full User type
export const updateUser = async(user) => {
  const response = await axios.put(`${USERS_API}`, user, {withCredentials: true});
  return response.data;
}


// Attempts to log in user, the user if successful, throws an error if not
// If successful, will automatically set browser cookies
export const loginUser = async(username, password) => {
  const response = await axios.put(`${API_BASE}/user_login`, {username: username, password: password}, {withCredentials: true, credentials: 'include'});
  return response.data;
}

// Logs user out
export const logoutUser = async() => {
  await axios.put(`${API_BASE}/user_logout`, {}, {withCredentials: true, credentials: 'include'});
}

// Finds all users that have favorited a given competition ID
export const findUsersByFavCompID = async(compID) => {
  try {
    const response = await axios.get(`${API_BASE}/users_by_fav_comp_id/${compID}`);
    return response.data;
  } catch (err) {
    return [];
  }
}

// Finds all events liked by a certain user given their username
export const findFavEventsByUsername = async(username) => {
  const response = await axios.get(`${API_BASE}/user_events/${username}`)
  return response.data;
}