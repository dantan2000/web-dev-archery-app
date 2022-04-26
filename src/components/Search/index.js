import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import disciplines from "../../mapping/disciplines";
import { findEvents } from "../../services/world-archery-services";

const SearchPage = () => {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false)
  const [events, setEvents] = useState([]);


  useEffect(() => {
    if (events.length == 0 && !error) {
      findEvents(document.location.search)
        .then(response => setEvents(response))
        .catch(() => setError(true))
        .finally(() => setLoading(false));
    }
  }, [])

  return <div>
    <h3>Search Events</h3>
    <form name='search'>
      <label for='CompId'>Competition Id: </label>
      <input type='number' name='CompId' />
      <label for='StartDate'>Start Date: </label>
      <input type="date" id='StartDate' />
      <label for='EndDate'>End Date: </label>
      <input type='date' id='EndDate' />
      <label for='DisciplineId'>Discipline: </label>
      <select name='DisciplineId' defaultValue={-1}>
        <option value={-1}> -- select an option -- </option>
        {
          Object.keys(disciplines).map(key => (<option value={key}>{disciplines[key]}</option>))
        }
      </select>
      <input type='submit'/>
    </form>
    <h1>Events</h1>
    {loading && <div>Loading...</div>}
    {!error && !loading &&  JSON.stringify(events)}
    {error && !loading && <div>An unexpected error occured. Please try again later.</div>}
  </div>;
}
export default SearchPage;