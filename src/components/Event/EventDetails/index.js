import React from 'react';
import { useParams } from 'react-router-dom';

import { findEventByID } from '../../../services/world-archery-services';

const EventDetails = () => {

  const { eid } = useParams();

  try {
    const event = await findEventByID(eid);
    console.log(event);
    const jsonString = JSON.stringify(event);
    console.log(jsonString);
    const str = 'hello world'
    return (<div>{str}</div>);
  } catch (err) {
    console.log("Errored");
    return (<div>{err.toString()}</div>);
  }


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

  )
}
export default EventDetails;
