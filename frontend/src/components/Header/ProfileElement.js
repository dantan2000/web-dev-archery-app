import { Router, Link } from "react-router-dom"

const ProfileElement = () => {
    //TODO make a state variable for user
    const user={
        username: "Dan",
        bio: "I do too much",
        favorited_comps_by_id: []
    }
    if(user){
        return(
            <Link className="nav-link" to="/profile">{user.username}</Link>
        )
    }
    return(
        <Link className="nav-link" to="/signin">Sign In/ Sign Up</Link>
    )
}
export default ProfileElement;