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

    @Column(name = "seatNumber")
    private String seatNumber;

    @Column(name = "seatType")
    private String seatType;

    @Column(name = "is_booked", nullable = false)
    private boolean is_booked;

    @ManyToOne
    @JoinColumn(name = "flight_id", nullable = false)
    private Flight flight;
}
