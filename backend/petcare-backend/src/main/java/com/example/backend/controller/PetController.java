package com.example.backend.controller;

import java.util.List;

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

import com.example.backend.model.Pet;
import com.example.backend.service.PetService;

@RestController
@RequestMapping("/api/pets")
@CrossOrigin(origins = "*")
public class PetController {

    private final PetService service;

    public PetController(PetService service) {
        this.service = service;
    }

    @PostMapping
    public Pet create(@RequestBody Pet pet) {
        return service.create(pet);
    }

    @GetMapping
    public List<Pet> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pet> getById(@PathVariable Long id) {
        return service.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/owner/{id}")
    public List<Pet> getByOwner(@PathVariable Long id) {
        return service.getByOwnerId(id);
    }

    

    @PutMapping("/{id}")
    public Pet update(@PathVariable Long id, @RequestBody Pet pet) {
        return service.update(id, pet);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
