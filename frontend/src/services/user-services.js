import axios from 'axios';
const API_BASE = process.env.REACT_APP_API_BASE;
const USERS_API = `${API_BASE}/users`;

// Attempts to create user, returns whether successful or not
// If successful, automatically sets browser cookies
export const createUser = async(newUser) => {
  try {
    const response = await axios.post(USERS_API, newUser);
    return true;
  } catch (err) {
    return false;
  }
}

// Finds all users in the database
export const findAllUsers = async() => {
  const response = await axios.get(USERS_API);
  const users = response.data;
  return users;
}

// Given a username, finds the user in the database with that username
export const findUserByUsername = async(username) => {
  const response = await axios.get(`${API_BASE}/user/${username}`);
  const user = response.data;
  return user;
}

// Finds the user based on the browser's cookies
// Returns undefined if no user was found
export const findUserByCookie = async() => {
  try {
    const response = await axios.get(`${API_BASE}/user_by_cookie`);
    const user = response.data;
    return user;
  } catch (err) {
    return undefined;
  }
}

// Deletes a user from the database
// Takes in a full User type
export const deleteUser = async(user) => {
  const response = await axios
    .delete(`${USERS_API}/${user._id}`);
  return response.data;
}

// Updates a user in the database
// Takes in a full User type
export const updateUser = async(user) => {
  const response = await axios
    .put(`${USERS_API}/${user._id}`, user);
  return response.data;
}


// Attempts to log in user, the user if successful, throws an error if not
// If successful, will automatically set browser cookies
export const loginUser = async(username, password) => {
  const response = await axios.put(`${API_BASE}/user_login`, {username: username, password: password});
  return response.data;
}

// Finds all users that have favorited a given competition ID
export const findUsersByFavCompID = async(compID) => {
  try {
    const response = await axios.put(`${API_BASE}/users_by_fav_comp_id/${compID}`);
    return response.data;
  } catch (err) {
    return [];
  }
}