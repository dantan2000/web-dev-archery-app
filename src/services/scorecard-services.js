import axios from 'axios';
const API_BASE = process.env.REACT_APP_API_BASE;
const SCORECARDS_API = `${API_BASE}/scorecards`;

export const createScorecard = async(newScorecard) => {
  const response = await axios.post(SCORECARDS_API, newScorecard)
  return response.data;
}

export const findAllScorecards = async() => {
  const response = await axios.get(SCORECARDS_API);
  const scorecards = response.data;
  return scorecards;
}

export const findScorecardsByUsername = async(username) => {
  const response = await axios.get(`${SCORECARDS_API}/${username}`);
  const scorecards = response.data;
  return scorecards;
}

export const deleteScorecard = async(tuit) => {
  const response = await axios
    .delete(`${SCORECARDS_API}/${tuit._id}`);
  return response.data;
}

export const updateScorecard = async(tuit) => {
  const response = await axios
    .put(`${SCORECARDS_API}/${tuit._id}`, tuit);
  return response.data;
}