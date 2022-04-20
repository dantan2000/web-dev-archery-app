import React from "react";
import {useDispatch} from "react-redux";

const ScorecardListItem = ({scorecard}) => {
    const dispatch = useDispatch();

    //again, mostly guessing on stuff here
    //i think we need to get the archer by going through the userid?
    //also do we want to show score?
    return(
        <li className="list-group-item">
            <div className="row">
                <div className="col">
                    <b>{scorecard.archer}</b>
                </div>
                <div className="col">
                    {scorecard.type}
                </div>
                <div className="col">
                    {scorecard.date}
                </div>
            </div>
        </li>
    )
}