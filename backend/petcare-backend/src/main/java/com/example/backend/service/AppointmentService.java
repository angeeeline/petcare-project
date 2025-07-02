package com.example.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.backend.model.Appointment;
import com.example.backend.model.PetOwner;
import com.example.backend.repository.AppointmentRepository;
import com.example.backend.repository.PetOwnerRepository;

@Service
public class AppointmentService {

    private final AppointmentRepository repository;
    private final PetOwnerRepository petOwnerRepository; // ✅ declare it

    public AppointmentService(AppointmentRepository repository, PetOwnerRepository petOwnerRepository) {
        this.repository = repository;
        this.petOwnerRepository = petOwnerRepository; // ✅ inject it
    }

    public Appointment create(Appointment appointment) {
        if (appointment.getOwner() != null && appointment.getOwner().getId() != null) {
            PetOwner owner = petOwnerRepository.findById(appointment.getOwner().getId())
                                  .orElseThrow(() -> new RuntimeException("Owner not found"));
            appointment.setOwner(owner);
        } else {
            throw new RuntimeException("Appointment must have a valid owner");
        }

        return repository.save(appointment);
    }

    public List<Appointment> getAll() {
        return repository.findAll();
    }

    public Optional<Appointment> getById(Long id) {
        return repository.findById(id);
    }

    public List<Appointment> getAppointmentsByOwner(Long ownerId) {
        return repository.findByOwnerId(ownerId);
    }

    public Appointment update(Long id, Appointment appointment) {
        appointment.setId(id);
        return repository.save(appointment);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
