package io.github.mixaniki.controller;

import io.github.mixaniki.domain.model.service.PlayerService;
import io.github.mixaniki.entity.Player;
import io.github.mixaniki.exception.model.NotFoundException;
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


    @PostMapping(value = "/players/add", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Player> createPlayer(@RequestBody Player player) throws NotFoundException {

        return ResponseEntity.ok(playerService.create(player));
    }
    @GetMapping(value = "/players/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Player> getPlayerById(@PathVariable("id") Long id) throws NotFoundException {

        // Ean kanoyme 'localhost:****/players/*' , ean to column position_code einai null , den tha mas emfanisei to dothen player
        // Ofeiletai sto oti to field positionCode ehei annotation '@NotNull'
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
    public ResponseEntity<String> deletePlayer(@PathVariable("id") Long id) throws NotFoundException{
        return ResponseEntity.ok(playerService.delete(id));
    }


}
