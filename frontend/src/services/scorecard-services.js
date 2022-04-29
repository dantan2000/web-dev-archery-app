import axios from 'axios';
const API_BASE = process.env.REACT_APP_API_BASE;
const SCORECARDS_API = `${API_BASE}/scorecards`;

// Creates a scorecard in the database
export const createScorecard = async(newScorecard) => {
  const response = await axios.post(SCORECARDS_API, newScorecard, {withCredentials: true})
  return response.data;
}

// Finds all public scorecards
export const findAllScorecards = async() => {
  const response = await axios.get(SCORECARDS_API, {withCredentials: true});
  const scorecards = response.data;
  return scorecards;
}

// Finds all scorecards made by a user given their username
// Automatically checks the browser's cookies to determine whether to show
// only public or all scorecards
export const findScorecardsByUsername = async(username) => {
  const response = await axios.get(`${SCORECARDS_API}/${username}`, {withCredentials: true});
  const scorecards = response.data;
  return scorecards;
}

export const findScorecardById = async(sid) => {
  const response = await axios.get(`${API_BASE}/scorecard/${sid}`, {withCredentials: true})
  const scorecard = response.data;
  return scorecard
}

// Deletes a given scorecard
export const deleteScorecard = async(scorecard) => {
  const response = await axios
    .delete(`${SCORECARDS_API}/${scorecard._id}`, {withCredentials: true});
  return response.data;
}

// Updates a given scorecard
export const updateScorecard = async(scorecard) => {
  const response = await axios
    .put(`${SCORECARDS_API}/${scorecard._id}`, scorecard, {withCredentials: true});
  return response.data;
}