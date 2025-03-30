-- Lisa mõned testlennud
INSERT INTO flight (id, airline, departure, destination, departure_time, price)
VALUES
    (1, 'CGI Airlines', 'Tallinn', 'Helsinki', '2025-07-01 08:00:00', 99.99),
    (2, 'CGI Airlines', 'Tallinn', 'Stockholm', '2025-07-02 09:30:00', 129.50),
    (3, 'CGI Airlines', 'Tallinn', 'London', '2025-07-03 12:00:00', 199.00),
    (4, 'Nordic Flights', 'Tallinn', 'Oslo', '2025-07-04 07:00:00', 150.00),
    (5, 'Skyline Air', 'Tallinn', 'Paris', '2025-07-05 10:30:00', 179.99);

-- Lisa mõned testistekohad
INSERT INTO seat (id, seat_number, seat_type, is_booked, flight_id)
VALUES
    (1, '1A', 'WINDOW', false, 1),
    (2, '1B', 'AISLE', false, 1),
    (3, '2A', 'WINDOW', true, 2),
    (4, '2B', 'AISLE', false, 2),
    (5, '3A', 'WINDOW', false, 3),
    (6, '3B', 'AISLE', true, 3),
    (7, '1A', 'WINDOW', false, 4),
    (8, '1B', 'AISLE', false, 4),
    (9, '2A', 'WINDOW', false, 5),
    (10, '2B', 'AISLE', false, 5),
    (11, '3A', 'WINDOW', false, 1),
    (12, '3B', 'AISLE', false, 1),
    (13, '4A', 'WINDOW', true, 4),
    (14, '4B', 'AISLE', false, 4);

-- Lisa mõned testreisijate eelistused
INSERT INTO passenger_preference (id, preferred_seat_type, seat_id)
VALUES
    (1, 'WINDOW', 1),
    (2, 'AISLE', 2),
    (3, 'WINDOW', 5),
    (4, 'AISLE', 6),
    (5, 'WINDOW', 9),
    (6, 'AISLE', 10),
    (7, 'WINDOW', 11),
    (8, 'AISLE', 12),
    (9, 'AISLE', 13),
    (10, 'WINDOW', 14);
