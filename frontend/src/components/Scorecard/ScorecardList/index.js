import React from "react";
import ScorecardListItem from "./ScorecardListItem";

const ScorecardList = ({scorecards, scError, scLoading, showArcher, showNote}) => {
    return (
        <>
            {scLoading && <div>Loading...</div>}
            {!scError && !scLoading &&
                <ul className="mb-5 list-group">
                    <li className="list-group-item list-group-item-info">
                        <div className="row">
                            {showArcher && <div className="col"><b>Archer</b></div>}
                            <div className="col">Event</div>
                            <div className="col">Score</div>
                            {showNote && <div className="col">Note</div>}
                            <div className="col">Date</div>
                        </div>
                    </li>
                    {
                        scorecards.map(scorecard =>
                            <ScorecardListItem
                                key={scorecard._id}
                                scorecard={scorecard}
                                showArcher={showArcher}
                                showNote={showNote}/>)
                    }
                </ul>
            }
            {scError && !scLoading && <div>An unexpected error occured. Please try again later.</div>}
        </>

    )
}

export default ScorecardList;