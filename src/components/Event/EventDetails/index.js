import ProfileElement from "./ProfileElement";
import { Link } from "react-router-dom";

//TODO NOTHING IS DONE HERE
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