import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import CurrUserContext from '../../contexts/CurrUserContext'
import EventList from "../Event/EventList";
import ScorecardList from "../Scorecard/ScorecardList";
import { findFavEventsByUsername, logoutUser, findUserByCookie, findUserByUsername } from "../../services/user-services";
import { findScorecardsByUsername } from "../../services/scorecard-services";
import "./ProfilePage.css"
import EditProfilePage from "./EditProfilePage";

const ProfilePage = () => {

  const { currUser, setCurrUser } = useContext(CurrUserContext);
  const [currentUser, setCurrentUser] = useState()


  const navigate = useNavigate();

  const { username } = useParams();

  const [evLoading, setEVLoading] = useState(true);
  const [evError, setEVError] = useState(false)
  const [events, setEvents] = useState([]);

  const [scLoading, setSCLoading] = useState(true);
  const [scError, setSCError] = useState(false)
  const [scorecards, setScorecards] = useState([]);

  const [errMsg, setErrMsg] = useState();

  useEffect(() => {
    // console.log(currUser);
    // console.log(username && currUser && username === currUser.username)
    if (username && currUser && username === currUser.username) {
      navigate('/profile');
    }
  }, [username, currUser])

  useEffect(() => {
    if (username) {
      findUserByUsername(username).then(res => setCurrentUser(res)).catch(err => setErrMsg(err.toString()))
    } else {
      findUserByCookie().then(res => setCurrentUser(res)).catch(() => navigate('/signin'))
    }
  }, [username])

  useEffect(() => {
    if (events.length == 0 && currentUser && !evError) {
      findFavEventsByUsername(currentUser.username)
        .then(response => setEvents(response))
        .catch(() => setEVError(true))
        .finally(() => setEVLoading(false));
    }
  }, [currentUser])

  useEffect(() => {
    if (scorecards.length == 0 && currentUser && !scError) {
      findScorecardsByUsername(currentUser.username)
        .then(response => setScorecards(response))
        .catch(() => setSCError(true))
        .finally(() => setSCLoading(false));
    }
  }, [currentUser])

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
          <Link to="#profile" class="nav-link" data-bs-toggle="tab">{currentUser && currentUser.username}</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" data-bs-toggle="tab" to="#scorecards" >Scorecards</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" data-bs-toggle="tab" to="#events">Events</Link>
        </li>
        {!username &&
          <li class="nav-item">
            <Link class="nav-link" data-bs-toggle="tab" to="#edit" >Edit Profile</Link>
          </li>
        }
      </ul>

      {/* TODO: if able, make it only on username tab */}
      <div class="wd-lmargin">
        {currentUser && currentUser.bio}
      </div>

      <div class="wd-tmargin tab-content">
        {
          !username &&
          <div class="tab-pane fade show active" id="profile">
            <button onClick={logOut} class="btn btn-primary">Logout</button><br />
          </div>
        }

        <div class="tab-pane fade" id="scorecards">
          <h2>Scorecards</h2>
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

        {!username &&
          <div class="tab-pane fade" id="edit">
            <EditProfilePage setCurrentUser={setCurrentUser} />
          </div>
        }

      </div>

    </>
  );
}
export default ProfilePage;