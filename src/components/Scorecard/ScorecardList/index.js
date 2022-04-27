import React, { useEffect, useState } from "react";
import { findAllScorecards } from "../../../services/scorecard-services";
import ScorecardListItem from "./ScorecardListItem";

const ScorecardList = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false)
    const [scorecards, setScorecards] = useState([]);

    useEffect(() => {
        if (scorecards.length == 0 && !error) {
            findAllScorecards()
                .then(response => setScorecards(response))
                .catch(() => setError(true))
                .finally(() => setLoading(false));
        }
    }, [])

    return (
        <>
            {loading && <div>Loading...</div>}
            {!error && !loading &&
                <ul className="list-group">
                    <li className="list-group-item list-group-item-info">
                        <div className="row">
                            <div className="col">
                                <b>Archer</b>
                            </div>
                            <div className="col">
                                Event
                            </div>
                            <div className="col">
                                Start - End Dates
                            </div>
                        </div>
                    </li>
                    {
                        scorecards.map(scorecard =>
                            <ScorecardListItem key={scorecard._id}
                                scorecard={scorecard} />)
                    }
                </ul>
            }
            {error && !loading && <div>An unexpected error occured. Please try again later.</div>}
        </>

    )
}

export default ScorecardList;