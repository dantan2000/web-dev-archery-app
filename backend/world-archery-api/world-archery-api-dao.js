import axios from 'axios';
import { URLSearchParams } from 'url';


export const searchWorldArcheryAPI = async (params) => {
  const queryParams = new URLSearchParams(params);
  queryParams.append('RBP', 100);
  queryParams.append('Page', 0);
  const queryURL = 'http://api.worldarchery.org/v3/COMPETITIONS/?' + queryParams.toString();
  try {
    const res = await axios.get(queryURL);
    console.log(res.data);
    return res.data;
  } catch (err) {
    return {};
  }
}

export const getCompetitionByID = async (id) => {
  const queryParams = new URLSearchParams();
  queryParams.append('CompId', id )
  const queryURL = 'http://api.worldarchery.org/v3/COMPETITIONS/?' + queryParams.toString();
  console.log(queryURL);
  try {
    const res = await axios.get(queryURL);
    console.log(res.data);
    return res.data.items[0];
  } catch (err) {
    return [];
  }
}