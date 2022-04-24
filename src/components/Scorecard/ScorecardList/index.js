import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import ScorecardListItem from "./ScorecardListItem";

const ScorecardList = ({scorecards=[]}) => {
    const scorecards = useSelector(state => state.scorecards);
    const dispatch = useDipatch();

    //TODO implement findAllScorecards
    useEffect(() => findAllScorecards(dispatch, []));

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