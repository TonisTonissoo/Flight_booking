import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../config";

interface Flight {
    id: number;
    destination: string;
    date: string;
    price: number;
}

const FlightDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [flight, setFlight] = useState<Flight | null>(null);

    useEffect(() => {
        fetch(`${API_URL}/flights/${id}`)
            .then((res) => res.json())
            .then((data) => setFlight(data))
            .catch((error) => console.error("Viga lennu detailidega:", error));
    }, [id]);

    if (!flight) {
        return <p>Laadimine...</p>;
    }

    return (
        <div>
            <h2>Lennu detailid</h2>
            <p>Sihtkoht: {flight.destination}</p>
            <p>Kuupäev: {flight.date}</p>
            <p>Hind: {flight.price}€</p>
        </div>
    );
};

export default FlightDetails;
