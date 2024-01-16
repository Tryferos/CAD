package io.github.mixaniki.controller;

import io.github.mixaniki.Repository.RoundRepository;
import io.github.mixaniki.domain.model.service.ParticipationService;
import io.github.mixaniki.entity.Championship;
import io.github.mixaniki.entity.Participation;
import io.github.mixaniki.entity.Team;
import io.github.mixaniki.entity.keys.ParticipationKey;
import io.github.mixaniki.exception.model.NotFoundException;
import jakarta.annotation.security.RolesAllowed;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping(value = "/api/participations")
public class ParticipationController {

    private final ParticipationService participationService;
    private final RoundRepository roundRepository;

    @Autowired
    public ParticipationController(ParticipationService participationService, RoundRepository roundRepository) {
        this.participationService = participationService;
        this.roundRepository = roundRepository;
    }

//    public ParticipationController(ParticipationService participationService) {
//        this.participationService = participationService;
//    }

    @RolesAllowed({"ADMIN", "SECRETARY"})
    @PostMapping(value = "/add", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Participation> createParticipation(@RequestBody Participation participation) throws NotFoundException{

        if(participationService.existsDrawById(participation.getParticipationKey().getChampionship())){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Championship with id "+ participation.getParticipationKey().getChampionship() + " has already been draw.");
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(participationService.create(participation));
    }

    @GetMapping(value = "/participation", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Participation> getParticipation(@RequestParam("team") Team team, @RequestParam("championship") Championship championship) throws NotFoundException {

        ParticipationKey participationKey = new ParticipationKey();
        participationKey.setTeam(team);
        participationKey.setChampionship(championship);

        return ResponseEntity.ok(participationService.getById(participationKey));
    }

    @GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Participation>> getAllParticipations() throws NotFoundException {

        return ResponseEntity.ok(participationService.getAll());
    }

// The update operation isn't useful for the table participation as in 12/01/2024 status
    @PutMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Participation> updateParticipation(@PathVariable("id") ParticipationKey participationKey, @RequestBody Participation participation) throws NotFoundException {
        participation.setParticipationKey(participationKey);

        return ResponseEntity.ok(participationService.update(participation));
    }

// The bellow update operation is a way better than the above
    @PutMapping(value = "/participation", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Participation> updateParticipationBetterWay(@RequestParam("team") Team team, @RequestParam("championship") Championship championship, @RequestBody Participation participation) throws NotFoundException {

        return ResponseEntity.ok(participationService.update(team,championship,participation));
    }

    @RolesAllowed({"ADMIN"})
    @DeleteMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> deleteParticipation(@RequestParam("team") Team team, @RequestParam("championship") Championship championship) throws NotFoundException{

        if(participationService.existsDrawById(championship)){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Championship with id "+ championship.getId() + " has already been draw.");
        }

        ParticipationKey participationKey = new ParticipationKey();
        participationKey.setTeam(team);
        participationKey.setChampionship(championship);

        participationService.delete(participationKey);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }


}
