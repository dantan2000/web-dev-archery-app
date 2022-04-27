import React, { useEffect, useState } from "react";

import ScorecardListItem from "./ScorecardListItem";
import { findAllScorecards } from "../../../services/scorecard-services";

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
            <ul className="list-group">
                {
                    scorecards.map(scorecard =>
                        <ScorecardListItem key={scorecard._id}
                            scorecard={scorecard} />)
                }
            </ul>
            <h2>Featured Scorecards</h2>
            {loading && <div>Loading...</div>}
            {!error && !loading && JSON.stringify(scorecards)}
            {error && !loading && <div>An unexpected error occured. Please try again later.</div>}
        </>

    )
}

export default ScorecardList;