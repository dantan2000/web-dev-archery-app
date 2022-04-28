import React, { useEffect, useState } from "react";
import {findAllScorecards} from "../../services/scorecard-services"

import EventList from "../Event/EventList";
import ScorecardList from "../Scorecard/ScorecardList";

const HomePage = () => {
  const [scLoading, setSCLoading] = useState(true);
  const [scError, setSCError] = useState(false)
  const [scorecards, setScorecards] = useState([]);

  useEffect(() => {
    if (scorecards.length == 0 && !scError) {
      findAllScorecards()
        .then(response => setScorecards(response))
        .catch(() => setSCError(true))
        .finally(() => setSCLoading(false));
    }
  }, [])
  return (
    <>
      <div>Home Page</div>
      <div>
        <h2>Upcoming Events</h2>
        <EventList />
      </div>
      <div>
        <h2>Featured Scorecards</h2>
        <ScorecardList
          scorecards={scorecards}
          scError={scError}
          scLoading={scLoading}
          showArcher="true"
          showScore="false"
          showNote="false" />
      </div>

    </>
  );
}
export default HomePage;