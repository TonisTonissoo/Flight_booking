package com.example.flightbooking.controller;

import com.example.flightbooking.model.Seat;
import com.example.flightbooking.repository.SeatRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/seats")
public class SeatController {

    private final SeatRepository seatRepository;

    public SeatController(SeatRepository seatRepository) {
        this.seatRepository = seatRepository;
    }

    @GetMapping
    public List<Seat> getSeatsByFlightId(@RequestParam(required = false) Long flightId) {
        if (flightId != null) {
            return seatRepository.findByFlightId(flightId);
        } else {
            return seatRepository.findAll();
        }
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
            seat.set_booked(seatDetails.is_booked());
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

    @PostMapping("/{id}/reserve")
    public ResponseEntity<?> reserveSeat(@PathVariable Long id) {
        return seatRepository.findById(id).map(seat -> {
            if (!seat.is_booked()) {
                seat.set_booked(true);
                seatRepository.save(seat);
                return ResponseEntity.ok().build();
            } else {
                return ResponseEntity.badRequest().body("Seat is already booked");
            }
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }
}
