-- Lennu tabel
CREATE TABLE IF NOT EXISTS flight (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    airline VARCHAR(255) NOT NULL,
    departure VARCHAR(255) NOT NULL,
    destination VARCHAR(255) NOT NULL,
    departureTime TIMESTAMP NOT NULL,
    price DOUBLE NOT NULL
    );

-- Istekohtade tabel (seotud lennuga)
CREATE TABLE IF NOT EXISTS seat (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    seatNumber VARCHAR(10) NOT NULL,
    seatType VARCHAR(20) CHECK (seatType IN ('WINDOW', 'AISLE', 'MIDDLE')),
    isBooked BOOLEAN NOT NULL,
    flight_id BIGINT NOT NULL,
    FOREIGN KEY (flight_id) REFERENCES flight(id) ON DELETE CASCADE
    );

-- Reisija eelistuste tabel (seotud istmetega)
CREATE TABLE IF NOT EXISTS passenger_preference (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    preferredSeatType VARCHAR(20) CHECK (preferredSeatType IN ('WINDOW', 'AISLE', 'MIDDLE')),
    seat_id BIGINT NOT NULL,
    FOREIGN KEY (seat_id) REFERENCES seat(id) ON DELETE CASCADE
    );
