package io.github.mixaniki.controller;

import io.github.mixaniki.domain.model.service.RoundService;
import io.github.mixaniki.entity.Round;
import io.github.mixaniki.entity.keys.RoundKey;
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
@RequestMapping("/api/rounds")
public class RoundController {
    private final RoundService roundService;

    @Autowired
    public RoundController(RoundService roundService) {
        this.roundService = roundService;
    }


    @PostMapping(value = "/add", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Round> createRound(@RequestBody Round round) throws NotFoundException {

        return ResponseEntity.status(HttpStatus.CREATED).body(roundService.create(round));
    }
    @GetMapping(value = "/round", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Round> getRoundById(@RequestParam("roundId") Long roundId, @RequestParam("championshipId") Long championshipId) throws NotFoundException {
    //    /api/rounds/round?roundId=1&championshipId=2
        RoundKey roundKey = new RoundKey();
        roundKey.setCompositeId(roundId, championshipId);

        return ResponseEntity.ok(roundService.getById(roundKey));
    }

    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Round>> getAllRounds() throws NotFoundException {
        return ResponseEntity.ok(roundService.getAll());
    }

    @RolesAllowed({"ADMIN", "SECRETARY"})
    @PutMapping(value = "/round", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Round> updateRound(@RequestParam("roundId") Long roundId, @RequestParam("championshipId") Long championshipId, @RequestBody Round roundToUpdate) throws NotFoundException{
        return ResponseEntity.ok(roundService.update(roundId, championshipId, roundToUpdate));
    }

    @RolesAllowed({"ADMIN"})
    @DeleteMapping(value = "/round", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> deleteRound(@RequestParam("roundId") Long roundId, @RequestParam("championshipId") Long championshipId) throws NotFoundException{
        RoundKey roundKey = new RoundKey();
        roundKey.setCompositeId(roundId, championshipId);

        roundService.delete(roundKey);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }


}
