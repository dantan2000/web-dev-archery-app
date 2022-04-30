import React, { useEffect, useState } from "react";
import { findEventByID } from "../../../services/world-archery-services";
import { Link } from "react-router-dom";

const ScorecardListItem = ({
    scorecard = {
        "username": "12345",
        "comp_id": 14905,
        "date": "2020-08-28",
        "is_public": true,
        "arrow_score": [
            [9, 8, 7],
            [6, 6, 3],
            [4, 3, 2],
            [9, 6, 5],
            [10, 7, 4],
            [8, 7, 3],
            [8, 7, 6],
            [7, 5, 5],
            [9, 7, 2],
            [9, 8, 0],
            [9, 8, 7],
            [6, 6, 3],
            [4, 3, 2],
            [9, 6, 5],
            [10, 7, 4],
            [8, 7, 3],
            [8, 7, 6],
            [7, 5, 5],
            [9, 7, 2],
            [9, 8, 0],
        ],
        "note": "Test Scorecard",
    }, showArcher, showNote }) => {

    const [events, setEvents] = useState([]);

    useEffect(() => {
        if (events.length == 0 && scorecard.comp_id) {
            findEventByID(scorecard.comp_id)
                .then(response => setEvents(response))
        }
    }, [])
    

    return (
        <Link className="text-decoration-none" to={`/scorecard/${scorecard._id}`}>
            <li className="list-group-item list-group-item-action">
                <div className="row">
                    {showArcher && <div className="col"><b>{scorecard.username}</b></div>}
                    <div className="col"><b>{events.Name ? events.Name : 'N/A'}</b></div>
                    <div className="col">{scorecard.arrow_score}</div>
                    {showNote && <div className="col">{scorecard.note}</div>}
                    <div className="col">{scorecard.date}</div>
                </div>
            </li>
        </Link>

    )
}
export default ScorecardListItem;