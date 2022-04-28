import React from "react";
import { Link } from 'react-router-dom';

const EventListItem = ({
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

    return (
        <Link className="text-decoration-none" to={`/events/${event.ID}`}>
        
            <li className="list-group-item list-group-item-action">
                <div className="row">
                    <div className="col">
                        <b>{event.Name}</b>
                    </div>
                    <div className="col">
                        {event.Place}, {event.CountryName}
                    </div>
                    <div className="col">
                        {event.DFrom} - {event.DTo}
                    </div>
                </div>
            </li>
        </Link>
    );
}
export default EventListItem;