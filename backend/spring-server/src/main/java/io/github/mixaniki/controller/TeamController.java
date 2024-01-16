package io.github.mixaniki.controller;

import io.github.mixaniki.domain.model.service.ChampionshipService;
import io.github.mixaniki.domain.model.service.TeamService;
import io.github.mixaniki.entity.Championship;
import io.github.mixaniki.entity.Team;
import io.github.mixaniki.exception.model.NotFoundException;
import jakarta.annotation.security.RolesAllowed;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

@RequestMapping(value = "/api/teams")
public class TeamController {
    private final TeamService teamService;
    private final ChampionshipService championshipService;

    @Autowired
    public TeamController(TeamService teamService, ChampionshipService championshipService) {
        this.teamService = teamService;
        this.championshipService = championshipService;
    }

    @RolesAllowed({"ADMIN", "SECRETARY"})
    @PostMapping(value = "/add", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Team> createTeam(@RequestBody Team team) throws NotFoundException {

        return ResponseEntity.status(HttpStatus.CREATED).body(teamService.create(team));
    }

    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Team> getTeamById(@PathVariable("id") Long id) throws NotFoundException {
        return ResponseEntity.ok(teamService.getById(id));
    }

    @GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Team>> getAllTeams() throws NotFoundException {
        return ResponseEntity.ok(teamService.getAll());
    }

    @GetMapping(value = "/championship/{championshipId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Team>> getTeamsByChampionship(@PathVariable("championshipId") Long championshipId) throws NotFoundException {
        Championship championship = championshipService.getById(championshipId);
        return ResponseEntity.ok(teamService.getByChampionship(championship));
    }

    @RolesAllowed({"ADMIN", "SECRETARY"})
    @PutMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Team> updateTeam(@PathVariable("id") Long id, @RequestBody Team teamToUpdate) throws NotFoundException{
        teamToUpdate.setId(id);
        return ResponseEntity.ok(teamService.update(teamToUpdate));
    }
    @RolesAllowed({"ADMIN", "SECRETARY"})
    @DeleteMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> deleteTeam(@PathVariable("id") Long id) throws NotFoundException{
        teamService.delete(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }


}
