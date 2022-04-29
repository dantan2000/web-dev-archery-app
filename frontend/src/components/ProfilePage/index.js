import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";

import CurrUserContext from '../../contexts/CurrUserContext'
import Events from "./Events";
import Scorecards from "./Scorecards";
import { findEvents } from "../../services/world-archery-services";
import { findScorecardsByUsername } from "../../services/scorecard-services";
import PrivacyPolicy from "../PrivacyPolicy";
import "./ProfilePage.css"

const ProfilePage = () => {
  const { currUser, setCurrUser } = useContext(CurrUserContext)

  const [evLoading, setEVLoading] = useState(true);
  const [evError, setEVError] = useState(false)
  const [events, setEvents] = useState([]);

  const [scLoading, setSCLoading] = useState(true);
  const [scError, setSCError] = useState(false)
  const [scorecards, setScorecards] = useState([]);

  useEffect(() => {
      if (events.length == 0 && !evError) {
          findEvents(document.location.search.substring(1))
              .then(response => setEvents(response))
              .catch(() => setEVError(true))
              .finally(() => setEVLoading(false));
      }
  }, [])

  useEffect(() => {
    if (scorecards.length == 0 && currUser && !scError) {
      findScorecardsByUsername(currUser.username)
        .then(response => setScorecards(response))
        .catch(() => setSCError(true))
        .finally(() => setSCLoading(false));
    }
  }, [currUser])

  
  return (
    <>
      <img
          className="wd-pp-image wd-container"
          src="/images/profile.png"/>
      <ul class="nav nav-tabs wd-lmargin">
        <li class="nav-item active">
          <Link to="#profile" class="nav-link" data-bs-toggle="tab">{currUser && currUser.username}</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" data-bs-toggle="tab" to="#scorecards" >Scorecards</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" data-bs-toggle="tab" to="#events">Events</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" data-bs-toggle="tab" to="#privacy" >Privacy Policy</Link>
        </li>
      </ul>
      <div class="wd-lmargin">
          {currUser && currUser.bio}
      </div>

      <div class="wd-tmargin tab-content">
        
        <div class="tab-pane fade show active" id="profile">
        {/* how do i add the user's id here? */}
          <Link to="/edit_profile/" class="btn mr-3 btn-primary">Edit Profile</Link>
          <Link to="/edit_profile/" class="btn btn-primary">Logout</Link><br/>
        </div>
        <div class="tab-pane fade" id="scorecards">
          scorecard test
          <Scorecards
          scorecards={scorecards}
          error={scError}
          loading={scLoading}
          showArcher="false"
          showScore="true"
          showNote="true"/>
        </div>
        <div class="tab-pane fade" id="events">
          events test
          <Events
          events={events}
          error={evError}
          loading={evLoading}/>
        </div>
        <div class="tab-pane fade" id="privacy">
          privacy test
          <PrivacyPolicy/>
        </div>

      </div>

    </>
  );
}
export default ProfilePage;