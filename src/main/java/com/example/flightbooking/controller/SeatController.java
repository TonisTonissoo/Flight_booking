package com.example.flightbooking.controller;

import com.example.flightbooking.model.Seat;
import com.example.flightbooking.repository.SeatRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/seats")
public class SeatController {

    private final SeatRepository seatRepository;

    public SeatController(SeatRepository seatRepository) {
        this.seatRepository = seatRepository;
    }

    @GetMapping
    public List<Seat> getAllSeats() {
        return seatRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Seat> getSeatById(@PathVariable Long id) {
        Optional<Seat> seat = seatRepository.findById(id);
        return seat.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Seat createSeat(@RequestBody Seat seat) {
        return seatRepository.save(seat);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Seat> updateSeat(@PathVariable Long id, @RequestBody Seat seatDetails) {
        return seatRepository.findById(id).map(seat -> {
            seat.setSeatNumber(seatDetails.getSeatNumber());
            seat.setSeatType(seatDetails.getSeatType());
            seat.setBooked(seatDetails.isBooked());
            seatRepository.save(seat);
            return ResponseEntity.ok(seat);
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSeat(@PathVariable Long id) {
        if (seatRepository.existsById(id)) {
            seatRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
