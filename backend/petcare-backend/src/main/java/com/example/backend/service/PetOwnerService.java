package com.example.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.model.PetOwner;
import com.example.backend.repository.PetOwnerRepository;

@Service
public class PetOwnerService {

    @Autowired
    private PetOwnerRepository petOwnerRepository;

    public List<PetOwner> getAllPetOwners() {
        return petOwnerRepository.findAll();
    }

    public Optional<PetOwner> getPetOwnerById(Long id) {
        return petOwnerRepository.findById(id);
    }

    public Optional<PetOwner> getPetOwnerByEmail(String email) {
        return petOwnerRepository.findByEmail(email);
    }

    public PetOwner createPetOwner(PetOwner petOwner) {
        if (petOwnerRepository.existsByEmail(petOwner.getEmail())) {
            throw new RuntimeException("Email already exists: " + petOwner.getEmail());
        }

        if (petOwnerRepository.existsByPhoneNumber(petOwner.getPhoneNumber())) {
            throw new RuntimeException("Phone number already exists: " + petOwner.getPhoneNumber());
        }

        return petOwnerRepository.save(petOwner);
    }

    public PetOwner updatePetOwner(Long id, PetOwner petOwnerDetails) {
        PetOwner petOwner = petOwnerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("PetOwner not found with id: " + id));

        if (!petOwner.getEmail().equals(petOwnerDetails.getEmail()) &&
                petOwnerRepository.existsByEmail(petOwnerDetails.getEmail())) {
            throw new RuntimeException("Email already exists: " + petOwnerDetails.getEmail());
        }

        if (!petOwner.getPhoneNumber().equals(petOwnerDetails.getPhoneNumber()) &&
                petOwnerRepository.existsByPhoneNumber(petOwnerDetails.getPhoneNumber())) {
            throw new RuntimeException("Phone number already exists: " + petOwnerDetails.getPhoneNumber());
        }

        petOwner.setFirstname(petOwnerDetails.getFirstname());
        petOwner.setLastname(petOwnerDetails.getLastname());
        petOwner.setEmail(petOwnerDetails.getEmail());
        petOwner.setPhoneNumber(petOwnerDetails.getPhoneNumber());
        petOwner.setAddress(petOwnerDetails.getAddress());
        petOwner.setPassword(petOwnerDetails.getPassword());

        return petOwnerRepository.save(petOwner);
    }

    public void deletePetOwner(Long id) {
        PetOwner petOwner = petOwnerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("PetOwner not found with id: " + id));
        petOwnerRepository.delete(petOwner);
    }

    public boolean existsByEmail(String email) {
        return petOwnerRepository.existsByEmail(email);
    }

    public boolean existsByPhoneNumber(String phoneNumber) {
        return petOwnerRepository.existsByPhoneNumber(phoneNumber);
    }
}
