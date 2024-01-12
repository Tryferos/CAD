package io.github.mixaniki.controller;

import io.github.mixaniki.domain.model.service.ObjectService;
import io.github.mixaniki.domain.model.service.RoundService;
import io.github.mixaniki.entity.Round;
import io.github.mixaniki.entity.keys.RoundKey;
import io.github.mixaniki.exception.model.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class RoundController {
    private final RoundService roundService;

    @Autowired
    public RoundController(RoundService roundService) {
        this.roundService = roundService;
    }


    @PostMapping(value = "/rounds/add", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Round> createRound(@RequestBody Round round) throws NotFoundException {

        return ResponseEntity.status(HttpStatus.CREATED).body(roundService.create(round));
    }
    @GetMapping(value = "/rounds/round", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Round> getRoundById(@RequestParam("roundId") Long roundId, @RequestParam("championshipId") Long championshipId) throws NotFoundException {

        RoundKey roundKey = new RoundKey();
        roundKey.setCompositeId(roundId, championshipId);

        return ResponseEntity.ok(roundService.getById(roundKey));
    }

    @GetMapping(value = "/rounds", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Round>> getAllRounds() throws NotFoundException {
        return ResponseEntity.ok(roundService.getAll());
    }

    @PutMapping(value = "/rounds/round", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Round> updateRound(@RequestParam("roundId") Long roundId, @RequestParam("championshipId") Long championshipId, @RequestBody Round roundToUpdate) throws NotFoundException{
        return ResponseEntity.ok(roundService.update(roundId, championshipId, roundToUpdate));
    }
    @DeleteMapping(value = "/rounds/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> deleteRound(@PathVariable("id") RoundKey id) throws NotFoundException{
        roundService.delete(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }


}
