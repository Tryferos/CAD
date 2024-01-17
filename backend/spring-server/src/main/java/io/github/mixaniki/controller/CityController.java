package io.github.mixaniki.controller;

import io.github.mixaniki.domain.model.service.ObjectService;
import io.github.mixaniki.entity.City;
import io.github.mixaniki.exception.model.NotFoundException;
import jakarta.annotation.security.RolesAllowed;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/cities")
public class CityController {
    private final ObjectService<City, Long> cityService;

    @Autowired
    public CityController(ObjectService<City, Long> cityService){this.cityService = cityService; }


    @RolesAllowed({"ADMIN", "SECRETARY"})
    @PostMapping(value = "/add", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<City> createCity(@RequestBody City city) throws NotFoundException {
        return ResponseEntity.status(HttpStatus.CREATED).body(cityService.create(city));
    }

    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<City> getCityById(@PathVariable("id") Long id) throws NotFoundException {
        return ResponseEntity.ok(cityService.getById(id));
    }

    @GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<City>> getAllCities() throws NotFoundException {
        return ResponseEntity.ok(cityService.getAll());
    }

    @RolesAllowed({"ADMIN", "SECRETARY"})
    @PutMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<City> updateCity(@PathVariable("id") Long id, @RequestBody City cityToUpdate) throws NotFoundException{
        cityToUpdate.setId(id);
        return ResponseEntity.ok(cityService.update(cityToUpdate));
    }

    @RolesAllowed({"ADMIN", "SECRETARY"})
    @DeleteMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> deleteCity(@PathVariable("id") Long id) throws NotFoundException{
        cityService.delete(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }


}