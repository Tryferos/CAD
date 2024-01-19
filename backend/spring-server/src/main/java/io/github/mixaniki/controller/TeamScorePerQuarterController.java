package io.github.mixaniki.controller;

import io.github.mixaniki.domain.model.service.TeamScorePerQuarterService;
import io.github.mixaniki.entity.TeamScorePerQuarter;
import io.github.mixaniki.entity.keys.TeamScorePerQuarterKey;
import io.github.mixaniki.entity.type.QuarterType;
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
@RequestMapping("/api/teamScorePerQuarters")
public class TeamScorePerQuarterController {
    private final TeamScorePerQuarterService teamScorePerQuarterService;

    @Autowired
    public TeamScorePerQuarterController(TeamScorePerQuarterService teamScorePerQuarterService) {
        this.teamScorePerQuarterService = teamScorePerQuarterService;
    }

    @RolesAllowed({"ADMIN", "SECRETARY"})
    @PostMapping(value = "/add", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<TeamScorePerQuarter> createTeamScorePerQuarter(@RequestBody TeamScorePerQuarter teamScorePerQuarter) throws NotFoundException {

        return ResponseEntity.status(HttpStatus.CREATED).body(teamScorePerQuarterService.create(teamScorePerQuarter));
    }

    @GetMapping(value = "/teamScorePerQuarter", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<TeamScorePerQuarter> getTeamScorePerQuarterById(
            @RequestParam("quarter") QuarterType quarterType, @RequestParam("gameId") Long gameId, @RequestParam("roundId") Long roundId,
            @RequestParam("championshipId") Long championshipId, @RequestParam("teamId") Long teamId) throws NotFoundException {

        TeamScorePerQuarterKey teamScorePerQuarterKey = new TeamScorePerQuarterKey();
        teamScorePerQuarterKey.setCompositeId(quarterType, gameId, roundId, championshipId, teamId);

        return ResponseEntity.ok(teamScorePerQuarterService.getById(teamScorePerQuarterKey));
    }

    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<TeamScorePerQuarter>> getAllTeamScorePerQuarters() throws NotFoundException {
        return ResponseEntity.ok(teamScorePerQuarterService.getAll());
    }

    @RolesAllowed({"ADMIN", "SECRETARY"})
    @PutMapping(value = "/teamScorePerQuarter", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<TeamScorePerQuarter> updateTeamScorePerQuarter(@RequestParam("quarter") QuarterType quarterType, @RequestParam("gameId") Long gameId, @RequestParam("roundId") Long roundId, @RequestParam("championshipId") Long championshipId, @RequestParam("teamId") Long teamId, @RequestBody TeamScorePerQuarter teamScorePerQuartergameToUpdate) throws NotFoundException{

        TeamScorePerQuarterKey teamScorePerQuarterKey = new TeamScorePerQuarterKey();
        teamScorePerQuarterKey.setCompositeId(quarterType, gameId, roundId, championshipId, teamId);

        teamScorePerQuartergameToUpdate.setId(teamScorePerQuarterKey);

        return ResponseEntity.ok(teamScorePerQuarterService.update(teamScorePerQuartergameToUpdate));
    }

    @RolesAllowed({"ADMIN", "SECRETARY"})
    @DeleteMapping(value = "/teamScorePerQuarter", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> deleteTeamScorePerQuarter(@RequestParam("quarter") QuarterType quarterType, @RequestParam("gameId") Long gameId, @RequestParam("roundId") Long roundId, @RequestParam("championshipId") Long championshipId, @RequestParam("teamId") Long teamId) throws NotFoundException{

        TeamScorePerQuarterKey teamScorePerQuarterKey = new TeamScorePerQuarterKey();
        teamScorePerQuarterKey.setCompositeId(quarterType, gameId, roundId, championshipId, teamId);

        teamScorePerQuarterService.delete(teamScorePerQuarterKey);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
