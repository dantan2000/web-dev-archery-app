import React from "react";
//import EventList from "../Event/EventList";
import ScorecardList from "../Scorecard/ScorecardList";

const HomePage = () => {
  return (
    <>
      <div>Home Page</div>
      <div>
        <h2>Upcoming Events</h2>
        {/* <EventList/> */}
      </div>
      <div>
        <h2>Featured Scorecards</h2>
        <ScorecardList/>
      </div>

    </>
  );
}
export default HomePage;