package io.github.mixaniki.controller;

import io.github.mixaniki.domain.model.service.ChampionshipService;
import io.github.mixaniki.entity.Championship;
import io.github.mixaniki.entity.ChampionshipContainer;
import io.github.mixaniki.entity.Team;
import io.github.mixaniki.exception.model.NotFoundException;
import io.github.mixaniki.exception.model.ValidationException;
import jakarta.annotation.security.RolesAllowed;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping(value = "/api/championships")
public class ChampionshipController {

    private final ChampionshipService championshipService;
    @Autowired
    public ChampionshipController(ChampionshipService championshipService) {
        this.championshipService = championshipService;
    }

    @RolesAllowed({"ADMIN"})
    @PostMapping(value = "/add", produces = MediaType.APPLICATION_JSON_VALUE)
    ResponseEntity<Championship> createChampionship(@RequestBody Championship championship) {

        return ResponseEntity.status(HttpStatus.CREATED).body(championshipService.create(championship));
    }

    @RolesAllowed({"ADMIN"})
    @PostMapping(value = "/championshipswithparticipations/add", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Championship> createChampionshipWithParticipations(@RequestBody ChampionshipContainer championshipContainer) throws NotFoundException, ValidationException {
        Championship championship = championshipContainer.getChampionship();
        List<Team> teams = championshipContainer.getTeams();

        return ResponseEntity.status(HttpStatus.CREATED).body(championshipService.createChampionshipWithParticipations(championship , teams));
    }

    @RolesAllowed({"ADMIN", "SECRETARY"})
    @PostMapping("/createLeague/{championshipId}")
    public ResponseEntity<String> createLeague(@PathVariable("championshipId") Long championshipId, @RequestParam("date") LocalDate date) throws NotFoundException, ValidationException {

        championshipService.generateRoundRobinSchedule(championshipId, date);
        return ResponseEntity.ok("League created successfully");
    }

    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Championship> getChampionshipById(@PathVariable("id") Long id) throws NotFoundException {

        return ResponseEntity.ok(championshipService.getById(id));
    }

    @GetMapping(value = "/championship/{name}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Championship> getChampionshipByName(@PathVariable("name") String name) throws NotFoundException {

        return ResponseEntity.ok(championshipService.getByName(name));
    }

    @GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Championship>> getAllChampionship() {

        return ResponseEntity.ok(championshipService.getAll());
    }

    @RolesAllowed({"ADMIN"})
    @PutMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Championship> updateChampionship(@PathVariable("id") Long id, @RequestBody Championship championship) throws NotFoundException {
        championship.setId(id);

        return ResponseEntity.status(HttpStatus.OK).body(championshipService.update(championship));
    }

    @RolesAllowed({"ADMIN"})
    @DeleteMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> deleteChampionship(@PathVariable("id") Long id) throws NotFoundException {
        championshipService.delete(id);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

}
