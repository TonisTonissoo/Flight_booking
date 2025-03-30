import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Kasutame useNavigate suunamiseks
import { API_URL } from "../config";


interface Flight {
    id: number;
    destination: string;
    date: string;
    price: number;
}

const FlightList: React.FC = () => {
    const [flights, setFlights] = useState<Flight[]>([]); // Saadud lennud
    const [selectedFlight, setSelectedFlight] = useState<number | null>(null); // Valitud lend
    const [userName, setUserName] = useState<string>(''); // Kasutaja nimi
    const [isBooking, setIsBooking] = useState<boolean>(false); // Kas broneerimisvorm on aktiivne
    const navigate = useNavigate(); // Kasutame navigate suunamiseks

    useEffect(() => {
        fetch(`${API_URL}/flights`)
            .then((res) => res.json())
            .then((data) => setFlights(data))
            .catch((error) => console.error("Viga lennu andmetega:", error));
    }, []);

    // Kui kasutaja klikib broneerimise nuppu
    const handleBookingClick = (flightId: number) => {
        setSelectedFlight(flightId);
        setIsBooking(true); // Näitame nime sisestamise vormi
    };

    // Kui kasutaja sisestab oma nime ja esitab vormi
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (userName && selectedFlight) {
            // Kui nimi on sisestatud, suuname kasutaja istmete valimise lehele
            navigate(`/seats?flightId=${selectedFlight}`); // Kasutame `navigate`-i
        } else {
            alert("Palun sisestage oma nimi ja valige lend.");
        }
    };

    return (
        <div>
            <h2>Saadaval lennud</h2>
            <ul>
                {flights.map((flight) => (
                    <li key={flight.id}>
                        {flight.destination} - {flight.date} - {flight.price}€
                        <button onClick={() => handleBookingClick(flight.id)}>
                            Broneeri
                        </button>
                    </li>
                ))}
            </ul>

            {/* Kui valitud lend, siis kuvatakse vorm nime sisestamiseks */}
            {isBooking && selectedFlight && (
                <div>
                    <h3>Broneeri lend</h3>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Sisesta oma nimi:
                            <input
                                type="text"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                required
                            />
                        </label>
                        <button type="submit">Mine istekohti valima</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default FlightList;
