import axios from 'axios';
const WORLD_ARCHERY_API = 'http://api.worldarchery.org/v3/COMPETITIONS/?';
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