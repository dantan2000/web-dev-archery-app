import React from "react";
import ScorecardListItem from "../Scorecard/ScorecardList/ScorecardListItem";

const Scorecards = ({ scorecards, error, loading, showArcher, showScore, showNote }) => {

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
                scorecard={scorecard}
                error={error}
                loading={loading}
                showArcher={showArcher}
                showScore={showScore}
                showNote={showNote} />)
          }
        </ul>
      }
      {error && !loading && <div>An unexpected error occured. Please try again later.</div>}
    </>
  )
}
export default Scorecards;