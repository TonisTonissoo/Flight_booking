import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
    return (
        <div>
            <h1>Tere tulemast lennubroneeringu süsteemi!</h1>
            <p>Sirvi saadaval olevaid lende ja vali endale sobiv koht.</p>
            <Link to="/flights">
                <button>Vaata lende</button>
            </Link>
        </div>
    );
};

export default Home;
