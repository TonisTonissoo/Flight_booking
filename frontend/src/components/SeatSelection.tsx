import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/global.css";

interface Seat {
    id: number;
    seatNumber: string;
    seatType: string | null; // "WINDOW", "AISLE", "MIDDLE" või null
    isBooked: boolean;
}

const SeatSelection: React.FC = () => {
    const [seats, setSeats] = useState<Seat[]>([]);
    const [selectedSeat, setSelectedSeat] = useState<string | null>(null);
    const location = useLocation();
    const navigate = useNavigate();
    const flightId = new URLSearchParams(location.search).get("flightId");

    useEffect(() => {
        if (flightId) {
            const fetchSeats = async () => {
                try {
                    const response = await axios.get(
                        `http://localhost:9090/api/seats?flightId=${flightId}`
                    );
                    // ✅ Filtreeri ainult vabad kohad
                    const availableSeats = response.data.filter(
                        (seat: Seat) => !seat.isBooked
                    );
                    setSeats(availableSeats);
                } catch (error) {
                    console.error("Error loading seats:", error);
                }
            };
            fetchSeats();
        } else {
            alert("Flight selection failed!");
        }
    }, [flightId]);

    const handleSelect = (seatNumber: string) => {
        console.log("Selected seat:", seatNumber);
        setSelectedSeat(seatNumber);
    };

    const handleBooking = async () => {
        if (selectedSeat && flightId) {
            try {
                const seatToBook = seats.find(
                    (seat) => seat.seatNumber === selectedSeat
                );
                if (seatToBook && !seatToBook.isBooked) {
                    await axios.post(
                        `http://localhost:9090/api/seats/${seatToBook.id}/reserve`
                    );
                    alert("Seat reserved successfully!");

                    // ✅ Suuna avalehele
                    navigate("/");
                } else {
                    alert("This seat is already booked!");
                }
            } catch (error) {
                console.error("Error during booking:", error);
                alert("Reservation failed.");
            }
        }
    };

    return (
        <div>
            <h2>Select a seat</h2>

            {/* Legend */}
            <div className="legend">
                <span className="seat window"></span> Window
                <span className="seat aisle"></span> Aisle
                <span className="seat middle"></span> Middle
                <span className="seat unavailable"></span> Booked
            </div>

            {/* Seat grid */}
            <div className="seats">
                {seats.map((seat) => (
                    <button
                        key={seat.id}
                        className={`seat 
                            ${seat.seatType ? seat.seatType.toLowerCase() : "unknown"} 
                            ${selectedSeat === seat.seatNumber ? "selected" : ""}`}
                        onClick={() => handleSelect(seat.seatNumber)}
                        title={`Type: ${seat.seatType || "UNKNOWN"}`}
                    >
                        {seat.seatNumber || "?"}
                    </button>
                ))}
            </div>

            {/* Selected seat + booking button */}
            {selectedSeat && <p>Selected seat: {selectedSeat}</p>}

            {selectedSeat && (
                <button
                    onClick={handleBooking}
                    style={{
                        backgroundColor: "#007bff",
                        color: "white",
                        padding: "16px 32px",
                        fontSize: "18px",
                        fontWeight: "bold",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        marginTop: "20px",
                        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                        transition: "transform 0.2s"
                    }}
                    onMouseOver={(e) =>
                        (e.currentTarget.style.transform = "scale(1.05)")
                    }
                    onMouseOut={(e) =>
                        (e.currentTarget.style.transform = "scale(1)")
                    }
                >
                    Book seat
                </button>
            )}
        </div>
    );
};

export default SeatSelection;
