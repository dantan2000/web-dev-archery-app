import React from "react";
import {useDispatch} from "react-redux";

const ScorecardListItem = ({
    scorecard={
        "user_id": "12345",
        "comp_id": 14905,
        "date": "2020-08-28",
        "is_public": true,
        "arrow_score":[
            [9,8,7],
            [6,6,3],
            [4,3,2],
            [9,6,5],
            [10,7,4],
            [8,7,3],
            [8,7,6],
            [7,5,5],
            [9,7,2],
            [9,8,0],
        ],
        "note": "Test Scorecard",
    }}) => {
    const dispatch = useDispatch();

    //const comp = api.get(scorecard.comp_id);

    return(
        // TODO Link to individual scorecards
        <li className="list-group-item list-group-item-action">
            <div className="row">
                <div className="col">
                    <b>{scorecard.archer}</b>
                </div>
                <div className="col">
                    {/* {scorecard.comp} */}
                </div>
                <div className="col">
                    {scorecard.date}
                </div>
            </div>
        </li>
    )
}
export default ScorecardListItem;