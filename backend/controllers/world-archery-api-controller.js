import axios from 'axios';
import { URLSearchParams } from 'url';
const WORLD_ARCHERY_API = 'http://api.worldarchery.org/v3/COMPETITIONS/?';

// Given a query string, contact the World Archery API and make a request with that query string
// Query string is of the format 'CompId=_&EventTypeId=_&...'
export const findEvents = async(req, res) => {
  try {
    const response = await axios.get(WORLD_ARCHERY_API
      .concat(new URLSearchParams(req.query).toString()));
    res.json(response.data);
  } catch (err) {
    res.sendStatus(400);
  }
}


export default (app) => {
  app.get('/api/events/', findEvents);
}