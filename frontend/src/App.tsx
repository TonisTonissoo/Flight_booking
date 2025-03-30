import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import FlightList from "./components/FlightList";
import SeatSelection from "./components/SeatSelection";
import FlightDetails from "./pages/FlightDetails";


const App: React.FC = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/flights" element={<FlightList />} />
                <Route path="/seats" element={<SeatSelection />} />
                <Route path="/flights/:id" element={<FlightDetails />} />
            </Routes>
        </Router>
    );
};

export default App;
