package com.example.backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dto.LoginRequest;
import com.example.backend.model.PetOwner;
import com.example.backend.repository.PetOwnerRepository;
import com.example.backend.service.PetOwnerService;

@RestController
@RequestMapping("/api/petowners")
@CrossOrigin(origins = "*")
public class PetOwnerController {

    @Autowired
    private PetOwnerService petOwnerService;

    @Autowired
    private PetOwnerRepository petOwnerRepository;

    @GetMapping
    public ResponseEntity<List<PetOwner>> getAllPetOwners() {
        return ResponseEntity.ok(petOwnerService.getAllPetOwners());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PetOwner> getPetOwnerById(@PathVariable Long id) {
        return petOwnerService.getPetOwnerById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<PetOwner> getPetOwnerByEmail(@PathVariable String email) {
        return petOwnerService.getPetOwnerByEmail(email)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createPetOwner(@RequestBody PetOwner petOwner) {
        try {
            PetOwner createdPetOwner = petOwnerService.createPetOwner(petOwner);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdPetOwner);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updatePetOwner(@PathVariable Long id, @RequestBody PetOwner petOwnerDetails) {
        try {
            PetOwner updatedPetOwner = petOwnerService.updatePetOwner(id, petOwnerDetails);
            return ResponseEntity.ok(updatedPetOwner);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePetOwner(@PathVariable Long id) {
        try {
            petOwnerService.deletePetOwner(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/check-email/{email}")
    public ResponseEntity<Boolean> checkEmailExists(@PathVariable String email) {
        return ResponseEntity.ok(petOwnerService.existsByEmail(email));
    }

    @GetMapping("/check-phone/{phoneNumber}")
    public ResponseEntity<Boolean> checkPhoneExists(@PathVariable String phoneNumber) {
        return ResponseEntity.ok(petOwnerService.existsByPhoneNumber(phoneNumber));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Optional<PetOwner> owner = petOwnerRepository.findByEmail(request.getEmail());
        if (owner.isPresent() && request.getPassword().equals(owner.get().getPassword())) {
            return ResponseEntity.ok(owner.get());
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }
}
