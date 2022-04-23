import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { findEventByID } from '../../../services/world-archery-services';
import divisions from '../../../mapping/divisions'

const EventDetails = () => {
  const [error, setError] = useState(false)
  const [event, setEvent] = useState(undefined);
  const { eid } = useParams();

  useEffect(() => {
    findEventByID(eid)
      .then(response => setEvent(response))
      .catch(() => setError(true));
  })

  if (error) {
    return <div>Error: Something went wrong :(</div>
  }
  if (event) {
    return (
      <>
        <div>
          <div className="row">
            {/* implement back button */}
            <button type="button" className="btn btn-primary mb-5">Back</button>
          </div>
          <div className="row mb-4">
            <div>
              <h2>Event Details</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-9 wd-event-details-panel">
              <div className='row mt-2'>
                <div className='col-3'>
                  <i className="fas fa-heart fa-2x" style={{ color: 'red' }}></i>{/*TODO make it hearted based on smt */}
                </div>
                <div className='col-6'>
                  <h3>{event.Name}</h3>
                </div>
                <div className='col-3 text-right'>
                  {
                    event.IsLive &&
                    <b>LIVE PLACEHOLDER</b>
                  }
                  {
                    !event.IsLive &&
                    <b>NOT LIVE PLACEHOLDER</b>
                  }
                </div>
              </div>

              <div className='wd-flag'>
                FLAG
              </div>
              <div className='wd-details'>
                {event.Place}, {event.CountryName}<br />
                Dates: {event.DFrom} to {event.DTo}<br />
                {/* TODO: make divisions map work */}
                Divisions: {event.ComDivisions.map(comDiv => {
                  return (divisions[comDiv])
                })}

              </div>
            </div>
            <div className="col-3">
              <b>Archers interested in this event:</b><br />
              <ul>
                List of users who favourited
              </ul>
            </div>

          </div>

        </div>

      </>
    );
  }
  return <div>loading...</div>
}
export default EventDetails;
