package io.github.mixaniki.controller;

import io.github.mixaniki.domain.model.service.PlayerService;
import io.github.mixaniki.entity.Player;
import io.github.mixaniki.exception.model.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class PlayerController {

    private final PlayerService playerService;

    public PlayerController(PlayerService playerService) {
        this.playerService = playerService;
    }

    // ResponseEntity.status( ... ).body( ... )  when successfully return happens without entity content response
    // ResponseEntity.ok( ... )  when successfully return happens with entity content response - corresponds to; (HttpStatus.OK)

    @PostMapping(value = "/players/add", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Player> createPlayer(@RequestBody Player player) throws NotFoundException {

        return ResponseEntity.status(HttpStatus.CREATED).body(playerService.create(player));
    }
    @GetMapping(value = "/players/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Player> getPlayerById(@PathVariable("id") Long id) throws NotFoundException {

        return ResponseEntity.ok(playerService.getById(id));
    }

    @GetMapping(value = "/players", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Player>> getAllPlayers() throws NotFoundException {
        return ResponseEntity.ok(playerService.getAll());
    }

    @PutMapping(value = "/players/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Player> updatePlayer(@PathVariable("id") Long id, @RequestBody Player playerToUpdate) throws NotFoundException{
        playerToUpdate.setId(id);
        return ResponseEntity.ok(playerService.update(playerToUpdate));
    }

    @DeleteMapping(value = "/players/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> deletePlayer(@PathVariable("id") Long id) throws NotFoundException{
        playerService.delete(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }


}
