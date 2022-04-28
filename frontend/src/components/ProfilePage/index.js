import { Link } from "react-router-dom";
import { useContext } from "react";

import CurrUserContext from '../../contexts/CurrUserContext'
import Events from "./Events";
import Scorecards from "./Scorecards";
import PrivacyPolicy from "../PrivacyPolicy";
import "./ProfilePage.css"

const ProfilePage = () => {
  const { currUser, setCurrUser } = useContext(CurrUserContext)
  
  return (
    <>
      {/* <div>Profile Page</div> */}
      <img
          className="wd-pp-image wd-container"
          src="/images/profile.png"/>
      <ul class="nav nav-tabs wd-lmargin">
        <li class="nav-item active">
          <Link to="#profile" class="nav-link" data-bs-toggle="tab">{currUser.username}</Link>
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
          {currUser.bio}
      </div>

      <div class="wd-tmargin tab-content">
        
        <div class="tab-pane fade show active" id="profile">
        {/* how do i add the user's id here? */}
          <Link to="/edit_profile/:uid" class="btn btn-primary">Edit Profile</Link><br/>
          <Link to="/edit_profile/:uid" class="btn mt-3 btn-primary">Logout</Link><br/>
        </div>
        <div class="tab-pane fade" id="scorecards">
          scorecard test
          <Scorecards/>
        </div>
        <div class="tab-pane fade" id="events">
          events test
          <Events/>
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