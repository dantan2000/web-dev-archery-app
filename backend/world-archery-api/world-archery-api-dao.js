import axios from 'axios';
import { URLSearchParams } from 'url';


export const searchWorldArcheryAPI = (params) => {
  queryParams = new URLSearchParams(params);
  queryParams.append('RBP', 100);
  queryParams.append('Page', 0);
  const queryURL = 'http://api.worldarchery.org/v3/COMPETITIONS/?' + queryParams.toString();
  try {
    let res = axios.get(queryURL);
    console.log(res.data);
    return res.data;
  } catch (err) {
    return {};
  }
}