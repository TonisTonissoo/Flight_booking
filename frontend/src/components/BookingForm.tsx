import React, { useState } from "react";

interface BookingFormProps {
    flightId: number;
    seatNumber: string;
}

const BookingForm: React.FC<BookingFormProps> = ({ flightId, seatNumber }) => {
    const [name, setName] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        console.log("Broneering kinnitatud:", { name, flightId, seatNumber });
        setIsSubmitted(true);
    };

    return (
        <div>
            <h2>Broneeri lend</h2>
            {isSubmitted ? (
                <p>Aitäh, {name}! Teie istekoht {seatNumber} on broneeritud.</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <label>
                        Nimi:
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </label>
                    <button type="submit">Kinnita broneering</button>
                </form>
            )}
        </div>
    );
};

export default BookingForm;
