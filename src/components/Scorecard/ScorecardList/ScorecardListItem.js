import React from "react";
import {useDispatch} from "react-redux";

const ScorecardListItem = ({
    scorecard={
        "user_id": "12345",
        "comp_id": 456,
        "date": "2020-08-28",
        "is_public": true,
        "arrow_score":[
            [9,8,7],
            [6,6,3],
            [4,3,2]
        ],
        "note": "Test Scorecard",
    }}) => {
    const dispatch = useDispatch();

    //const comp = api.get(scorecard.comp_id);

    return(
        <li className="list-group-item">
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