import React, { useEffect, useState } from "react";
import { findAllScorecards } from "../../services/scorecard-services"
import {findEvents} from "../../services/world-archery-services"

import EventList from "../Event/EventList";
import ScorecardList from "../Scorecard/ScorecardList";

const HomePage = () => {
  const [scLoading, setSCLoading] = useState(true);
  const [scError, setSCError] = useState(false)
  const [scorecards, setScorecards] = useState([]);


  const [evLoading, setEVLoading] = useState(true);
  const [evError, setEVError] = useState(false)
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (scorecards.length == 0 && !scError) {
      findAllScorecards()
        .then(response => setScorecards(response))
        .catch(() => setSCError(true))
        .finally(() => setSCLoading(false));
    }
  }, [])

  useEffect(() => {
    if (events.length == 0 && !evError) {
      findEvents(document.location.search.substring(1))
        .then(response => setEvents(response))
        .catch(() => setEVError(true))
        .finally(() => setEVLoading(false));
    }
  }, [])


  return (
    <>
      <div>Home Page</div>
      <div>
        <h2>Upcoming Events</h2>
        <EventList
          events={events}
          error={evError}
          loading={evLoading} />
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