import React, {useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux'
import EventListItem from "./EventListItem";


const EventList = () => {
    const events = useSelector(state => state.events);
    const dispatch = useDispatch();

    //TODO implement findAllEvents
    //useEffect(() => findAllEvents(dispatch, []));

    return (
        <ul className="list-group">
            {
                events.map(event =>
                    <EventListItem key={event.ID}
                                  event={event}/>)
            }
        </ul>
    )
}

export default EventList;