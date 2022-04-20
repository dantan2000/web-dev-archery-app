import ProfileElement from "./ProfileElement";
import { Link } from "react-router-dom";


const Header = () => {
    return (
        <div className="row">
            <div className="col">
                <img src="/logo192.png"/>
                Among Lines
            </div>
            <div className="col">
                <Link to="/">Home</Link>
                {/* put search fontawesome */}
                <Link to="/search">Events</Link> 
                <ProfileElement/>
                
            </div>

        </div>
    )
}

export default Header;