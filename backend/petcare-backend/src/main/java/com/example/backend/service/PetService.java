package com.example.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.backend.model.Pet;
import com.example.backend.model.PetOwner;
import com.example.backend.repository.PetOwnerRepository;
import com.example.backend.repository.PetRepository;

@Service
public class PetService {

    private final PetRepository repository;
    private final PetOwnerRepository petOwnerRepository;
    


    public PetService(PetRepository repository, PetOwnerRepository petOwnerRepository) {
        this.repository = repository;
        this.petOwnerRepository = petOwnerRepository;
    }

    public Pet create(Pet pet) {
        if (pet.getPetOwner() != null && pet.getPetOwner().getId() != null) {
            PetOwner owner = petOwnerRepository.findById(pet.getPetOwner().getId())
                .orElseThrow(() -> new RuntimeException("Owner not found"));
            pet.setPetOwner(owner);
        }
        return repository.save(pet);
    }

    public List<Pet> getAll() {
        return repository.findAll();
    }

    public Optional<Pet> getById(Long id) {
        return repository.findById(id);
    }

    public Pet update(Long petId, Pet newData) {
    return repository.findById(petId)
        .map(existingPet -> {
            existingPet.setPetname(newData.getPetname());
            existingPet.setType(newData.getType());
            existingPet.setBreed(newData.getBreed());
            
            // If petOwner is included, validate it
            if (newData.getPetOwner() != null && newData.getPetOwner().getId() != null) {
                PetOwner owner = petOwnerRepository.findById(newData.getPetOwner().getId())
                    .orElseThrow(() -> new RuntimeException("Owner not found"));
                existingPet.setPetOwner(owner);
            }

            return repository.save(existingPet);
        })
        .orElseThrow(() -> new RuntimeException("Pet not found with ID: " + petId));
}

    public void delete(Long petId) {
        repository.deleteById(petId);
    }

    public List<Pet> getByOwnerId(Long id) {
        PetOwner owner = petOwnerRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Owner not found"));
        return repository.findByPetOwner(owner);
    }
}
