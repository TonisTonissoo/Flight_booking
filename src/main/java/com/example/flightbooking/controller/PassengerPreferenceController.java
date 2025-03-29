package com.example.flightbooking.controller;

import com.example.flightbooking.model.PassengerPreference;
import com.example.flightbooking.repository.PassengerPreferenceRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/preferences")
public class PassengerPreferenceController {

    private final PassengerPreferenceRepository preferenceRepository;

    public PassengerPreferenceController(PassengerPreferenceRepository preferenceRepository) {
        this.preferenceRepository = preferenceRepository;
    }

    @GetMapping
    public List<PassengerPreference> getAllPreferences() {
        return preferenceRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<PassengerPreference> getPreferenceById(@PathVariable Long id) {
        Optional<PassengerPreference> preference = preferenceRepository.findById(id);
        return preference.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public PassengerPreference createPreference(@RequestBody PassengerPreference preference) {
        return preferenceRepository.save(preference);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PassengerPreference> updatePreference(@PathVariable Long id, @RequestBody PassengerPreference preferenceDetails) {
        return preferenceRepository.findById(id).map(preference -> {
            preference.setPreferredSeatType(preferenceDetails.getPreferredSeatType());
            preference.setSeat(preferenceDetails.getSeat());
            preferenceRepository.save(preference);
            return ResponseEntity.ok(preference);
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePreference(@PathVariable Long id) {
        if (preferenceRepository.existsById(id)) {
            preferenceRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
