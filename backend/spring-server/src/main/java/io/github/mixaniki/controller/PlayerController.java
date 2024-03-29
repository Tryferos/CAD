package io.github.mixaniki.controller;

import io.github.mixaniki.domain.model.service.PlayerService;
import io.github.mixaniki.domain.model.service.PlayerServiceImpl;
import io.github.mixaniki.domain.model.service.TeamService;
import io.github.mixaniki.entity.Player;
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
@CrossOrigin(origins = "http://localhost:3000",maxAge = 3600)
@RequestMapping(value = "/api/players")
public class PlayerController {

    private final PlayerService playerService;
    private final TeamService teamService;

    @Autowired
    public PlayerController(PlayerServiceImpl playerService, TeamService teamService) {

        this.playerService = playerService;
        this.teamService = teamService;
    }

    // ResponseEntity.status( ... ).body( ... )  when successfully return happens and to define the response status code
    // ResponseEntity.ok( ... )                  when successfully return happens with entity content response - corresponds to; (HttpStatus.OK) - response status code is 200

    @RolesAllowed({"ADMIN", "SECRETARY"})
    @PostMapping(value = "/add", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Player> createPlayer(@RequestBody Player player) throws NotFoundException{

        return ResponseEntity.status(HttpStatus.CREATED).body(playerService.create(player));
    }

    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Player> getPlayerById(@PathVariable("id") Long id) throws NotFoundException {

        return ResponseEntity.ok(playerService.getById(id));
    }

    @GetMapping(value = "/team/{teamId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Player>> getPlayersByTeam(@PathVariable("teamId") Long teamId) throws NotFoundException {
        Team team = teamService.getById(teamId);
        return ResponseEntity.ok(playerService.getByTeam(team));
    }

    @GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Player>> getAllPlayers() {
        return ResponseEntity.ok(playerService.getAll());
    }

    @GetMapping(value = "/team/{teamId}/teamsize", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Long> getNumberOfPlayersOfTeam(@PathVariable("teamId") Long teamId) throws NotFoundException {
        Team team = teamService.getById(teamId);
        return ResponseEntity.ok(playerService.getCountOfPlayersOfTeam(team));
    }

    @RolesAllowed({"ADMIN", "SECRETARY"})
    @PutMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Player> updatePlayer(@PathVariable("id") Long id, @RequestBody Player playerToUpdate) throws NotFoundException{
        playerToUpdate.setId(id);
        return ResponseEntity.ok(playerService.update(playerToUpdate));
    }

    @RolesAllowed({"ADMIN", "SECRETARY"})
    @DeleteMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> deletePlayer(@PathVariable("id") Long id) throws NotFoundException{
        playerService.delete(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }


}