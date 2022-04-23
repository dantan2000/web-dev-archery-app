import ProfileElement from "./ProfileElement";
import { Link } from "react-router-dom";
import "./Header.css"


const Header = () => {
    return (
        <>
            <nav className="navbar">
                <div className="container-fluid">
                    <span className="navbad-brand">
                        <img
                            className="wd-header-logo"
                            src="/images/logo_noBG.png" />
                        Among Lines
                    </span>
                    <ul className="navbar-nav">
                        <li class="nav-item">
                            <Link class="nav-link" to="/">Home</Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" to="/search"><i className="fas fa-search"></i> Events</Link>
                        </li>
                        <li class="nav-item">
                            <ProfileElement class="nav-link"/>
                        </li>

                    </ul>

                </div>

            </nav>



        </>
    )
}

export default Header;