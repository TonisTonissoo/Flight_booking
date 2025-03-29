package com.example.flightbooking.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Seat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String seatNumber;
    private String seatType; // "window", "aisle", "exit-row"
    private boolean isBooked;

    @ManyToOne
    @JoinColumn(name = "flight_id")
    private Flight flight;
}
