package com.example.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.backend.model.Appointment;
import com.example.backend.model.Pet;
import com.example.backend.model.PetOwner;
import com.example.backend.model.Veterinarian;
import com.example.backend.repository.AppointmentRepository;
import com.example.backend.repository.PetOwnerRepository;
import com.example.backend.repository.PetRepository;
import com.example.backend.repository.VeterinarianRepository;

@Service
public class AppointmentService {

    private final AppointmentRepository repository;
    private final PetOwnerRepository petOwnerRepository;
    private final PetRepository petRepository;
    private final VeterinarianRepository veterinarianRepository;

    public AppointmentService(
        AppointmentRepository repository,
        PetOwnerRepository petOwnerRepository,
        PetRepository petRepository,
        VeterinarianRepository veterinarianRepository
    ) {
        this.repository = repository;
        this.petOwnerRepository = petOwnerRepository;
        this.petRepository = petRepository;
        this.veterinarianRepository = veterinarianRepository;
    }

    public Appointment create(Appointment appointment) {
        // ✅ Set Owner
        if (appointment.getOwner() != null && appointment.getOwner().getId() != null) {
            PetOwner owner = petOwnerRepository.findById(appointment.getOwner().getId())
                .orElseThrow(() -> new RuntimeException("Owner not found"));
            appointment.setOwner(owner);
        } else {
            throw new RuntimeException("Appointment must have a valid owner");
        }

        // ✅ Set Pet
        if (appointment.getPet() != null && appointment.getPet().getPetId() != null) {
            Pet pet = petRepository.findById(appointment.getPet().getPetId())
                .orElseThrow(() -> new RuntimeException("Pet not found"));
            appointment.setPet(pet);
            appointment.setPetName(pet.getPetname()); // optional: auto-fill petName
        }

        // ✅ Set Veterinarian
        if (appointment.getVeterinarian() != null && appointment.getVeterinarian().getId() != null) {
            Veterinarian vet = veterinarianRepository.findById(appointment.getVeterinarian().getId())
                .orElseThrow(() -> new RuntimeException("Veterinarian not found"));
            appointment.setVeterinarian(vet);
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

    public List<Appointment> getAppointmentsByVeterinarian(Long vetId) {
        return repository.findByVeterinarianId(vetId);
    }

    public Appointment update(Long id, Appointment appointment) {
        appointment.setId(id);
        return repository.save(appointment);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
