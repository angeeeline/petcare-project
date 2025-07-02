package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.model.Pet;

public interface PetRepository extends JpaRepository<Pet,Long> {

}
