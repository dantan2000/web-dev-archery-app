import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import ScorecardListItem from "./ScorecardListItem";

const ScorecardList = () => {
    const scorecards = useSelector(state => state.scorecards);
    const dispatch = useDipatch();

    //TODO implement findAllScorecards
    useEffect(() => findAllScorecards(dispatch, []));

    //return pretty much copy pasted so idk if it makes sense, probably need
    //to mess around with the arguments based on our schema
    return (
        <ul className="list-group">
            {
                scorecards.map(scorecard =>
                    <ScorecardListItem key={scorecard._id}
                                  scorecard={scorecard}/>)
            }
        </ul>
    )
}

export default ScorecardList;