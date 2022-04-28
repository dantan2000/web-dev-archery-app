import React from "react";
import EventListItem from "./EventListItem";

const EventList = ({events, error, loading}) => {
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