import { Link } from "react-router-dom";
import Events from "./Events";
import Scorecards from "./Scorecards";
import PrivacyPolicy from "../PrivacyPolicy";
import "./ProfilePage.css"

const ProfilePage = () => {
  const user = {
    username: "Dan",
    bio: "I do too much",
    favorited_comps_by_id: []
  }
  return (
    <>
      {/* <div>Profile Page</div> */}
      <img
          className="wd-pp-image wd-container"
          src="/images/profile.png"/>
      <ul class="nav nav-tabs wd-lmargin">
        <li class="nav-item">
          <Link to="#profile" class="nav-link" data-bs-toggle="tab">{user.username}</Link>
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
          {user.bio}
      </div>

      <div class="wd-tmargin tab-content">
        
        <div class="tab-pane fade" id="profile">
          profile test
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