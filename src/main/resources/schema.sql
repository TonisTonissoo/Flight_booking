-- Lennu tabel
CREATE TABLE IF NOT EXISTS flight (
                                      id BIGINT AUTO_INCREMENT PRIMARY KEY,
                                      airline VARCHAR(255) NOT NULL,
    departure VARCHAR(255) NOT NULL,
    destination VARCHAR(255) NOT NULL,
    departure_time TIMESTAMP NOT NULL,
    price DOUBLE NOT NULL
    );

-- Istekohtade tabel (seotud lennuga)
CREATE TABLE IF NOT EXISTS seat (
                                    id BIGINT AUTO_INCREMENT PRIMARY KEY,
                                    seat_number VARCHAR(10) NOT NULL,
    seat_type VARCHAR(20) CHECK (seat_type IN ('WINDOW', 'AISLE', 'MIDDLE')),
    is_booked BOOLEAN NOT NULL,
    flight_id BIGINT NOT NULL,
    FOREIGN KEY (flight_id) REFERENCES flight(id) ON DELETE CASCADE
    );

-- Reisija eelistuste tabel (seotud istmetega)
CREATE TABLE IF NOT EXISTS passenger_preference (
                                                    id BIGINT AUTO_INCREMENT PRIMARY KEY,
                                                    preferred_seat_type VARCHAR(20) CHECK (preferred_seat_type IN ('WINDOW', 'AISLE', 'MIDDLE')),
    seat_id BIGINT NOT NULL,
    FOREIGN KEY (seat_id) REFERENCES seat(id) ON DELETE CASCADE
    );
