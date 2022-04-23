import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { findEventByID } from '../../../services/world-archery-services';

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
        <div className="row">
          <div>
            back button
          </div>
        </div>
        <div className="row">
          <div>
            Event Details
          </div>
        </div>
        <div className="row">
          <div className="col">
            <span>
              heart :) {/* get fontawesome heart and make it hearted based on smt */}
              {event.Name}
              live {/* go remember how to make an if statement in html stuff */}

            </span>
            <div>
              FLAG
            </div>
            <div>
              this is where the infor goes
            </div>
          </div>
          <div className="col">
            List of people who favourited
          </div>

        </div>

      </>
    );
  }
  return <div>loading...</div>
}
export default EventDetails;
