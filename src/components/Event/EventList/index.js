import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import EventListItem from "./EventListItem";

const EventList = ({events=[]}) => {
    const events = useSelector(state => state.events);
    const dispatch = useDipatch();

    //TODO implement findAllEvents
    useEffect(() => findAllEvents(dispatch, []));

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