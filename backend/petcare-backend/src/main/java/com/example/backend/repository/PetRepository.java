package com.example.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.model.Pet;
import com.example.backend.model.PetOwner;

public interface PetRepository extends JpaRepository<Pet,Long> {
    List<Pet> findByPetOwner(PetOwner owner);
}
