import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import CurrUserContext from '../../contexts/CurrUserContext'
import EventList from "../Event/EventList";
import ScorecardList from "../Scorecard/ScorecardList";
import { findFavEventsByUsername, logoutUser, findUserByCookie } from "../../services/user-services";
import { findScorecardsByUsername } from "../../services/scorecard-services";
import "./ProfilePage.css"
import EditProfilePage from "./EditProfilePage";

const ProfilePage = () => {
  const { currUser, setCurrUser } = useContext(CurrUserContext)

  const navigate = useNavigate();

  const [evLoading, setEVLoading] = useState(true);
  const [evError, setEVError] = useState(false)
  const [events, setEvents] = useState([]);

  const [scLoading, setSCLoading] = useState(true);
  const [scError, setSCError] = useState(false)
  const [scorecards, setScorecards] = useState([]);

  useEffect(() => {
    if (events.length == 0 && currUser && !evError) {
      findFavEventsByUsername(currUser.username)
        .then(response => setEvents(response))
        .catch(() => setEVError(true))
        .finally(() => setEVLoading(false));
    }
  }, [currUser])

  useEffect(() => {
    if (scorecards.length == 0 && currUser && !scError) {
      findScorecardsByUsername(currUser.username)
        .then(response => setScorecards(response))
        .catch(() => setSCError(true))
        .finally(() => setSCLoading(false));
    }
  }, [currUser])

  useEffect(() => {
    findUserByCookie().catch(() => navigate('/signin'));
  })


  const logOut = async () => {
    setCurrUser(undefined);
    await logoutUser();
    navigate("/");
  }

  return (
    <>
      <img
        className="wd-pp-image wd-container"
        src="/images/profile.png" />
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
        <li class="nav-item">
          <Link class="nav-link" data-bs-toggle="tab" to="#edit" >Edit Profile</Link>
        </li>
      </ul>

      {/* TODO: if able, make it only on username tab */}
      <div class="wd-lmargin">
        {currUser && currUser.bio}
      </div>

      <div class="wd-tmargin tab-content">
        <div class="tab-pane fade show active" id="profile">
          <Link to="/edit_profile/" class="btn mr-3 btn-primary">Edit Profile</Link>
          <button onClick={logOut} class="btn btn-primary">Logout</button><br />
        </div>

        <div class="tab-pane fade" id="scorecards">
          scorecard test
          <ScorecardList
            scorecards={scorecards}
            error={scError}
            loading={scLoading}
            showArcher={false}
            showNote={true} />
        </div>
        <div class="tab-pane fade" id="events">
          events test
          <EventList
            events={events}
            error={evError}
            loading={evLoading} />
        </div>

        <div class="tab-pane fade" id="edit">
          <EditProfilePage />
        </div>

      </div>

    </>
  );
}
export default ProfilePage;