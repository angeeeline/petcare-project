package com.example.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.model.Veterinarian;
import com.example.backend.repository.PetOwnerRepository;
import com.example.backend.repository.VeterinarianRepository;

@Service
public class VeterinarianService {

    @Autowired
    private VeterinarianRepository veterinarianRepository;
    @Autowired
    private PetOwnerRepository petOwnerRepository;

    public List<Veterinarian> getAllVeterinarians() {
        return veterinarianRepository.findAll();
    }

    public Optional<Veterinarian> getByEmail(String email) {
        return veterinarianRepository.findByEmail(email);
    }

    public Veterinarian createVeterinarian(Veterinarian vet) {
    if (veterinarianRepository.existsByEmail(vet.getEmail()) || petOwnerRepository.existsByEmail(vet.getEmail())) {
        throw new RuntimeException("Email already in use by another account.");
    }
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

    

   


    
    

}
