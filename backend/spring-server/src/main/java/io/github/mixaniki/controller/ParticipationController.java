package io.github.mixaniki.controller;

import io.github.mixaniki.domain.model.service.ChampionshipService;
import io.github.mixaniki.domain.model.service.ParticipationService;
import io.github.mixaniki.domain.model.service.TeamService;
import io.github.mixaniki.entity.*;
import io.github.mixaniki.exception.model.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api")
public class ParticipationController {

    private final ParticipationService participationService;
    private final TeamService teamService;
    private final ChampionshipService championshipService;

    @Autowired
    public ParticipationController(ParticipationService participationService, TeamService teamService, ChampionshipService championshipService) {
        this.participationService = participationService;
        this.teamService = teamService;
        this.championshipService = championshipService;
    }

    @PostMapping(value = "/participations/add", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Participation> createParticipation(@RequestBody Participation participation) throws NotFoundException{

        return ResponseEntity.status(HttpStatus.CREATED).body(participationService.create(participation));
    }

    @GetMapping(value = "/participations/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Participation> getParticipation(@RequestParam("team") Team team, @RequestParam("championship") Championship championship) throws NotFoundException {

        ParticipationKey participationKey = new ParticipationKey();
        participationKey.setTeam(team);
        participationKey.setChampionship(championship);

        return ResponseEntity.ok(participationService.getById(participationKey));
    }

    @GetMapping(value = "/participations", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Participation>> getAllParticipations() throws NotFoundException {

        return ResponseEntity.ok(participationService.getAll());
    }

// The update operation isn't useful for the table participation as in 12/01/2024 status
    @PutMapping(value = "/paticipations/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Participation> updateParticipation(@PathVariable("id") ParticipationKey participationKey, @RequestBody Participation participation) throws NotFoundException {
        participation.setParticipationKey(participationKey);

        return ResponseEntity.ok(participationService.update(participation));
    }

// The down bellow update operation is a way better than the above

    @PutMapping(value = "/participations/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Participation> updateParticipationBetterWay(@RequestParam("team") Team team, @RequestParam("championship") Championship championship, @RequestBody Participation participation) throws NotFoundException {

        return ResponseEntity.ok(participationService.update(team,championship,participation));
    }

    @DeleteMapping(value = "/participations/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> deleteParticipation(@RequestParam("team") Team team, @RequestParam("championship") Championship championship) throws NotFoundException{

        ParticipationKey participationKey = new ParticipationKey();
        participationKey.setTeam(team);
        participationKey.setChampionship(championship);

        participationService.delete(participationKey);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }



}
