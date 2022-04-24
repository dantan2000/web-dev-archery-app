import axios from 'axios';
const API_BASE = process.env.REACT_APP_API_BASE;
const SCORECARDS_API = `${API_BASE}/scorecards`;

// Creates a scorecard in the database
export const createScorecard = async(newScorecard) => {
  const response = await axios.post(SCORECARDS_API, newScorecard)
  return response.data;
}

// Finds all public scorecards
export const findAllScorecards = async() => {
  const response = await axios.get(SCORECARDS_API);
  const scorecards = response.data;
  return scorecards;
}

// Finds all scorecards made by a user given their username
// Automatically checks the browser's cookies to determine whether to show
// only public or all scorecards
export const findScorecardsByUsername = async(username) => {
  const response = await axios.get(`${SCORECARDS_API}/${username}`);
  const scorecards = response.data;
  return scorecards;
}

// Deletes a given scorecard
export const deleteScorecard = async(scorecard) => {
  const response = await axios
    .delete(`${SCORECARDS_API}/${scorecard._id}`);
  return response.data;
}

// Updates a given scorecard
export const updateScorecard = async(scorecard) => {
  const response = await axios
    .put(`${SCORECARDS_API}/${scorecard._id}`, scorecard);
  return response.data;
}