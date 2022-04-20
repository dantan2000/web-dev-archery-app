import React from "react";
import {useDispatch} from "react-redux";

const EventListItem = ({event}) => {
    const dispatch = useDispatch();

    //not entirely sure how we're getting data
    //from/about events so i bullshitted this
    return (
        <li className="list-group-item">
            <div className="row">
                <div className="col">
                    <b>{event.eventName}</b>
                </div>
                <div className="col">
                    {event.location}
                </div>
                <div className="col">
                    {event.date}
                </div>
            </div>
        </li>
    );
}
export default EventListItem;