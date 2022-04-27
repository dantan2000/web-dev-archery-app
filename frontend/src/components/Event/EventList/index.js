import React, { useEffect, useState } from "react";
import { findEvents } from "../../../services/world-archery-services";
import EventListItem from "./EventListItem";


const EventList = () => {
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

    return (
        <>
            {loading && <div>Loading...</div>}
            {!error && !loading &&
                <ul className="list-group">
                    <li className="list-group-item list-group-item-info">
                        <div className="row">
                            <div className="col">
                                <b>Event</b>
                            </div>
                            <div className="col">
                                Location
                            </div>
                            <div className="col">
                                Start - End Dates
                            </div>
                        </div>
                    </li>
                    {
                        events.map(event =>
                            <EventListItem key={event.ID}
                                event={event} />)
                    }
                </ul>}
            {error && !loading && <div>An unexpected error occured. Please try again later.</div>}
        </>

    )
}

export default EventList;