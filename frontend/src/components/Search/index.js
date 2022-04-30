import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import disciplines from "../../mapping/disciplines";
import EventList from '../Event/EventList';
import { findEvents } from "../../services/world-archery-services";

const SearchPage = () => {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false)
  const [events, setEvents] = useState([]);


  useEffect(() => {
    if (events.length == 0 && !error) {
      findEvents(document.location.search.substring(1))
        .then(response => setEvents(response))
        .catch(() => setError(true))
        .finally(() => setLoading(false));
    }
  }, [])

  return <div>
    <h4>Search Events</h4>
    <form name='search'>
      <table className='table-sm'>
        <tbody>
          <tr>
            <td><label for='CompId'>Competition Id:</label></td>
            <td><input type='number' name='CompId' /></td>
          </tr>
          <tr>
            <td><label for='StartDate'>Start Date: </label></td>
            <td><input type="date" id='StartDate' /></td>

          </tr>
          <tr>
            <td><label for='EndDate'>End Date: </label></td>
            <td><input type='date' id='EndDate' /></td>


          </tr>
          <tr>
            <td><label for='DisciplineId'>Discipline: </label></td>
            <td><select name='DisciplineId' defaultValue={-1}>
              <option value=''> -- select an option -- </option>
              {
                Object.keys(disciplines).map(key => (<option value={key}>{disciplines[key]}</option>))
              }
            </select></td>

          </tr>
        </tbody>
      </table>
      <input className='my-3 btn-primary' type='submit' />
    </form>
    <h2>Events</h2>
    {loading && <div>Loading...</div>}
    {!error && !loading && <EventList events={events} error={error} />}
    {error && !loading && <div>An unexpected error occured. Please try again later.</div>}
  </div>;
}
export default SearchPage;