import React from "react";

const ScorecardListItem = ({
    scorecard={
        "username": "12345",
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
    }, showArcher, showScore, showNote}) => {

    //const comp = api.get(scorecard.comp_id);

    return(
        // TODO Link to individual scorecards
        <li className="list-group-item list-group-item-action">
            <div className="row">
                {showArcher && <div className="col"><b>{scorecard.username}</b></div>}
                <div className="col"><b>{/* {scorecard.comp} */}</b></div>
                {showScore && <div className="col">{scorecard.arrow_score}</div>}
                {showNote && <div className="col">{scorecard.note}</div>}
                <div className="col">{scorecard.date}</div>
            </div>
        </li>
    )
}
export default ScorecardListItem;