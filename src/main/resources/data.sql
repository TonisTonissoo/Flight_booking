-- Lisa mõned testlennud
INSERT INTO flight (id, airline, departure, destination, departureTime, price)
VALUES (1, 'CGI Airlines', 'Tallinn', 'Helsinki', '2025-07-01 08:00:00', 99.99),
       (2, 'CGI Airlines', 'Tallinn', 'Stockholm', '2025-07-02 09:30:00', 129.50),
       (3, 'CGI Airlines', 'Tallinn', 'London', '2025-07-03 12:00:00', 199.00);

-- Lisa mõned testistekohad
INSERT INTO seat (id, seatNumber, seatType, isBooked, flight_id)
VALUES (1, '1A', 'WINDOW', false, 1),
       (2, '1B', 'AISLE', false, 1),
       (3, '2A', 'WINDOW', true, 2),
       (4, '2B', 'AISLE', false, 2),
       (5, '3A', 'WINDOW', false, 3),
       (6, '3B', 'AISLE', true, 3);

-- Lisa mõned testreisijate eelistused
INSERT INTO passenger_preference (id, preferredSeatType, seat_id)
VALUES (1, 'WINDOW', 1),
       (2, 'AISLE', 2),
       (3, 'WINDOW', 5);
