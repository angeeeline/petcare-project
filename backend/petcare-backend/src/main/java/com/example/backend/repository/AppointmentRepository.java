package com.example.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import com.example.backend.model.Appointment;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
List<Appointment> findByOwnerId(@Param("ownerId") Long ownerId);
List<Appointment> findByVeterinarianId(Long veterinarianId);

}
