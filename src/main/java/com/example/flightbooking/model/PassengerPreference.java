package com.example.flightbooking.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class PassengerPreference {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String preferredSeatType; // "window", "aisle", etc.

    @OneToOne
    @JoinColumn(name = "seat_id")
    private Seat seat;
}
