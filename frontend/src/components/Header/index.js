import ProfileElement from "./ProfileElement";
import { Link } from "react-router-dom";
import "./Header.css"


const Header = () => {
    return (
        <>
            <nav className="navbar navbar-expand navbar-dark bg-secondary mb-4">
                <div className="container-fluid">
                    <span className="navbad-brand">
                        <img
                            className="wd-header-logo"
                            src="/images/logo_noBG.png" />
                        Among Lines
                    </span>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/search"><i className="fas fa-search"></i> Events</Link>
                        </li>
                        <li className="nav-item nav-link">
                            <ProfileElement/>
                        </li>

                    </ul>

                </div>

            </nav>



        </>
    )
}

export default Header;