import React from 'react';
import './EventDetails.css';
import { useParams, useHistory } from 'react-router-dom';
import divisions from '../../../mapping/divisions';

import { findEventByID } from '../../../services/world-archery-services';

const EventDetails = ({
  event = {
    "ID": 14905,
    "Name": "Tokyo 2020 Paralympic Games World Ranking Event",
    "NameShort": "Tokyo 2020 Paralympics",
    "Venue": "",
    "Place": "Tokyo",
    "Country": "JPN",
    "CountryName": "Japan",
    "DFrom": "2020-08-28",
    "DTo": "2020-09-05",
    "WithRes": false,
    "ComEventType": 1,
    "ComLevel": 1,
    "ComSubLevel": 2,
    "ComDis": 1,
    "ComDivisions": [
      1,
      2
    ],
    "EventType": "Competition",
    "Level": "Olympic Games",
    "SubLevel": "Paralympic Games",
    "IsFeatured": true,
    "WorldRecordStatus": true,
    "WorldRankingEvent": true,
    "IsLive": false
  }
}) => {

  //   const { eid } = useParams();

  //   try {
  //     const event = await findEventByID(eid);
  //     console.log(event);
  //     const jsonString = JSON.stringify(event);
  //     console.log(jsonString);
  //     const str = 'hello world'
  //     return (<div>{str}</div>);
  //   } catch (err) {
  //     console.log("Errored");
  //     return (<div>{err.toString()}</div>);
  //   }


  return (
    <>
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

    </>

  )
}
export default EventDetails;
