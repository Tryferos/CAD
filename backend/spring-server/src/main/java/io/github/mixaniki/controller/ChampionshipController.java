package io.github.mixaniki.controller;

import io.github.mixaniki.domain.model.service.ChampionshipService;
import io.github.mixaniki.entity.Championship;
import io.github.mixaniki.entity.ChampionshipContainer;
import io.github.mixaniki.entity.Team;
import io.github.mixaniki.exception.model.NotFoundException;
import io.github.mixaniki.exception.model.ValidationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api")
public class ChampionshipController {

    private final ChampionshipService championshipService;
    @Autowired
    public ChampionshipController(ChampionshipService championshipService) {
        this.championshipService = championshipService;
    }

    @PostMapping(value = "/championships/add", produces = MediaType.APPLICATION_JSON_VALUE)
    ResponseEntity<Championship> createChampionship(@RequestBody Championship championship) {

        return ResponseEntity.status(HttpStatus.CREATED).body(championshipService.create(championship));
    }

    @PostMapping(value = "/championshipswithparticipations/add", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Championship> createChampionshipWithParticipations(@RequestBody ChampionshipContainer championshipContainer) throws NotFoundException, ValidationException {
        Championship championship = championshipContainer.getChampionship();
        List<Team> teams = championshipContainer.getTeams();

        return ResponseEntity.status(HttpStatus.CREATED).body(championshipService.createChampionshipWithParticipations(championship , teams));
    }

    @GetMapping(value = "/championships/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Championship> getChampionshipById(@PathVariable("id") Long id) throws NotFoundException {

        return ResponseEntity.ok(championshipService.getById(id));
    }

    @GetMapping(value = "/championships/name/{name}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Championship> getChampionshipByName(@PathVariable("name") String name) throws NotFoundException {

        return ResponseEntity.ok(championshipService.getByName(name));
    }

    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Championship>> getAllChampionship() {

        return ResponseEntity.ok(championshipService.getAll());
    }

    @PutMapping(value = "/championships/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Championship> updateChampionship(@PathVariable("id") Long id, @RequestBody Championship championship) throws NotFoundException {
        championship.setId(id);

        return ResponseEntity.status(HttpStatus.OK).body(championshipService.update(championship));
    }

    @DeleteMapping(value = "/championships/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> deleteChampionship(@PathVariable("id") Long id) throws NotFoundException {
        championshipService.delete(id);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

}
