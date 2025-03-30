import React from "react";
import { Link } from "react-router-dom";
import "../styles/global.css";

const Navbar: React.FC = () => {
    return (
        <nav className="navbar">
            <h1>Flight Booking</h1>
            <ul>
                <li><Link to="/">Avaleht</Link></li>
                <li><Link to="/flights">Lennud</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
