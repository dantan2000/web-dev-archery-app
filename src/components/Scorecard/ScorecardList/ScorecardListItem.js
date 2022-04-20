import React from "react";
import {useDispatch} from "react-redux";

const ScorecardListItem = ({scorecard}) => {
    const dispatch = useDispatch();

    //const comp = api.get(scorecard.comp_id);

    return(
        <li className="list-group-item">
            <div className="row">
                <div className="col">
                    <b>{scorecard.archer}</b>
                </div>
                <div className="col">
                    {scorecard.comp}
                </div>
                <div className="col">
                    {scorecard.date}
                </div>
            </div>
        </li>
    )
}