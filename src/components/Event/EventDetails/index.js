import React from 'react';
import { useParams } from 'react-router-dom';

import { findEventByID } from '../../../services/world-archery-services';

const EventDetails = async () => {

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
  
}
export default EventDetails;