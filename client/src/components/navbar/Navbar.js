import logo from './flag.png'
import {Link} from "react-router-dom";

const Navbar = ({user, setUser}) => {
   const logout = () => {
        setUser(null);
    };

    return (
        <>
            <nav className="topnavbar">
                <ul>
                    <li>
                        <img className="logo" src={logo} alt={"Ukraine flag"}/>
                    </li>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                </ul>
                <ul className="authorizeMenu">
                    {user ? (
                        <>
                            <li className="right-border">
                                <Link to="/myaccount">
                                    My account
                                </Link>
                            </li>
                            <li>
                                <Link to="/" onClick={logout}>
                                    Log out
                                </Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="right-border">
                                <Link to="/login">
                                    Log in
                                </Link>
                            </li>
                            <li>
                                <Link to="/signup">
                                    Sign up
                                </Link>
                            </li>
                        </>)}
                </ul>
            </nav>
        </>
    );
}

export default Navbar;