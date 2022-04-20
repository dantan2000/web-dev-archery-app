import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import EventListItem from "./EventListItem";

const EventList = () => {
    const events = useSelector(state => state.events);
    const dispatch = useDipatch();

    //TODO implement findAllEvents
    useEffect(() => findAllEvents(dispatch, []));

    //return pretty much copy pasted so idk if it makes sense, probably need
    //to mess around with the arguments based on our schema
    return (
        <ul className="list-group">
            {
                events.map(event =>
                    <EventListItem key={event._id}
                                  event={event}/>)
            }
        </ul>
    )
}

export default EventList;