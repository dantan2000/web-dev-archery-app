import axios from 'axios';
const API_BASE = process.env.REACT_APP_API_BASE;
const WORLD_ARCHERY_API = `${API_BASE}/events/?`;
const stdQuery = '&SortBy=-DATE&RBP=100&Page=0';

// Given a query string, contact the World Archery API and make a request with that query string
// Query string is of the format 'CompId=_&EventTypeID=_&...'
export const findEvents = async(queryString) => {
  const response = await axios.get(WORLD_ARCHERY_API.concat(queryString));
  return response.data.items;
}

// Makes a query of the API based on an object with the desired params
// The keys and values of the object must correspond with the World Archery API:
//    https://api.worldarchery.org/v3/API/Competitions
export const findEventsByParams = async(params) => {
  const response = await axios.get(WORLD_ARCHERY_API.concat(new URLSearchParams(params).toString));
  return response.data.items
}

export const findEventByID = async(eid) => {
  const response = await axios.get(WORLD_ARCHERY_API.concat(`CompId=${eid}`));
  if (response.data.pageInfo.totalResults < 1) {
    throw new Error("Error: No competition found");
  }
  return response.data.items[0];
}