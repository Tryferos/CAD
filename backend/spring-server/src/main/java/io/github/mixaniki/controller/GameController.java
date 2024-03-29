package io.github.mixaniki.controller;

import io.github.mixaniki.domain.model.service.GameService;
import io.github.mixaniki.entity.Game;
import io.github.mixaniki.entity.keys.GameKey;
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
@RequestMapping("/api/games")
public class GameController {
    private final GameService gameService;

    @Autowired
    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    @PostMapping(value = "/add", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Game> createGame(@RequestBody Game game) throws NotFoundException {

        return ResponseEntity.status(HttpStatus.CREATED).body(gameService.create(game));
    }

    @GetMapping(value = "/game", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Game> getGameById(@RequestParam("gameId") Long gameId, @RequestParam("roundId") Long roundId, @RequestParam("championshipId") Long championshipId) throws NotFoundException {

        GameKey gameKey = new GameKey();
        gameKey.setCompositeId(gameId, roundId, championshipId);

        return ResponseEntity.ok(gameService.getById(gameKey));
    }

    @GetMapping(value = "/games", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Game>> getGameByRoundChampionshipId(@RequestParam("roundId") Long roundId, @RequestParam("championshipId") Long championshipId) throws NotFoundException {
        return ResponseEntity.ok(gameService.getByRoundChampionshipId(roundId, championshipId));
    }

    @GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Game>> getAllGames() throws NotFoundException {
        return ResponseEntity.ok(gameService.getAll());
    }

    @RolesAllowed({"ADMIN", "SECRETARY"})
    @PutMapping(value = "/game", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Game> updateGame(@RequestParam("gameId") Long gameId, @RequestParam("roundId") Long roundId, @RequestParam("championshipId") Long championshipId, @RequestBody Game gameToUpdate) throws NotFoundException{

        GameKey gameKey = new GameKey();
        gameKey.setCompositeId(gameId, roundId, championshipId);

        gameToUpdate.setId(gameKey);

        return ResponseEntity.ok(gameService.update(gameToUpdate));
    }

    @RolesAllowed({"ADMIN"})
    @DeleteMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> deleteGame(@RequestParam("gameId") Long gameId, @RequestParam("roundId") Long roundId, @RequestParam("championshipId") Long championshipId) throws NotFoundException{
        GameKey gameKey = new GameKey();
        gameKey.setCompositeId(gameId, roundId, championshipId);

        gameService.delete(gameKey);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
