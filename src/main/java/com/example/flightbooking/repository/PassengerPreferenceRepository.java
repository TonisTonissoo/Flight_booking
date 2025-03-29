package com.example.flightbooking.repository;

import com.example.flightbooking.model.PassengerPreference;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PassengerPreferenceRepository extends JpaRepository<PassengerPreference, Long> {
}
