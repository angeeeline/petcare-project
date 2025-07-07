package com.example.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.model.Veterinarian;
import com.example.backend.repository.VeterinarianRepository;

@Service
public class VeterinarianService {

    @Autowired
    private VeterinarianRepository veterinarianRepository;

    public List<Veterinarian> getAllVeterinarians() {
        return veterinarianRepository.findAll();
    }

    public Optional<Veterinarian> getByEmail(String email) {
        return veterinarianRepository.findByEmail(email);
    }

    public Veterinarian createVeterinarian(Veterinarian vet) {
        return veterinarianRepository.save(vet);
    }

    public boolean emailExists(String email) {
        return veterinarianRepository.existsByEmail(email);
    }

    public boolean phoneExists(String phoneNumber) {
        return veterinarianRepository.existsByPhoneNumber(phoneNumber);
    }

    public boolean verifyCredentials(String email, String password) {
    Optional<Veterinarian> vet = veterinarianRepository.findByEmail(email);
        return vet.isPresent() && vet.get().getPassword().equals(password);
    }

    public Veterinarian updateVeterinarian(Long id, Veterinarian updatedVet) {
    Veterinarian existingVet = veterinarianRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Veterinarian not found"));

    existingVet.setFirstname(updatedVet.getFirstname());
    existingVet.setLastname(updatedVet.getLastname());
    existingVet.setPhoneNumber(updatedVet.getPhoneNumber());
    existingVet.setSpecialization(updatedVet.getSpecialization());
    
    

    return veterinarianRepository.save(existingVet);
}


   


    
    

}
