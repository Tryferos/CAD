package io.github.mixaniki.controller;

import io.github.mixaniki.controller.player.dto.*;
import io.github.mixaniki.domain.model.service.PlayerService;
import io.github.mixaniki.entity.Player;
import io.github.mixaniki.exception.model.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class PlayerController {

    private final PlayerService playerService;

    @Autowired
    public PlayerController(PlayerService playerService) {
        this.playerService = playerService;
    }

    // ResponseEntity.status( ... ).body( ... )  when successfully return happens and to define the response status code
    // ResponseEntity.ok( ... )                  when successfully return happens with entity content response - corresponds to; (HttpStatus.OK) - response status code is 200

    @PostMapping(value = "/players/add", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<CreatePlayerResponseDto> createPlayer(@RequestBody CreatePlayerRequestDto playerRequestDto) {

        Player player =
                new Player(playerRequestDto.id(),
                        playerRequestDto.firstName(),
                        playerRequestDto.lastName(),
                        playerRequestDto.height(),
                        playerRequestDto.nationality(),
                        playerRequestDto.logo(),
                        playerRequestDto.positionType());

        Player createdPlayer = playerService.create((player));

        CreatePlayerResponseDto createPlayerResponseDto = new CreatePlayerResponseDto(
                createdPlayer.getId(),
                createdPlayer.getFirstName(),
                createdPlayer.getLastName(),
                createdPlayer.getHeight(),
                createdPlayer.getNationality(),
                createdPlayer.getLogo(),
                createdPlayer.getPositionType());

        return ResponseEntity.status(HttpStatus.CREATED).body(createPlayerResponseDto);
    }

    @GetMapping(value = "/players/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<GetResponseDto> getPlayerById(@PathVariable("id") Long id) throws NotFoundException {

        Player retrievePlayer = playerService.getById(id);

        GetResponseDto getResponseDto = new GetResponseDto(retrievePlayer.getId(),
                retrievePlayer.getFirstName(),
                retrievePlayer.getLastName(),
                retrievePlayer.getHeight(),
                retrievePlayer.getNationality(),
                retrievePlayer.getLogo(),
                retrievePlayer.getPositionType());

        return ResponseEntity.ok(getResponseDto);
    }

    @GetMapping(value = "/players", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<GetResponseDto>> getAllPlayers() throws NotFoundException {

        List<Player> players = playerService.getAll();

        List<GetResponseDto> playerR = players.stream()
                .map(player -> new GetResponseDto(player.getId(),
                        player.getFirstName(),
                        player.getLastName(),
                        player.getHeight(),
                        player.getNationality(),
                        player.getLogo(),
                        player.getPositionType()))
                .collect(Collectors.toList());

        return ResponseEntity.ok(playerR);
    }

    @PutMapping(value = "/players/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<UpdatePlayerResponseDto> updatePlayer(@PathVariable("id") Long id, @RequestBody UpdatePlayerRequestDto playerRequestDto) throws NotFoundException{

        Player playerToUpdate =
                new Player( id,
                        playerRequestDto.firstName(),
                        playerRequestDto.lastName(),
                        playerRequestDto.height(),
                        playerRequestDto.nationality(),
                        playerRequestDto.logo(),
                        playerRequestDto.positionType());

        Player updatedPlayer = playerService.update(playerToUpdate);

        return ResponseEntity.ok(new UpdatePlayerResponseDto(updatedPlayer.getId(), updatedPlayer.getFirstName(), updatedPlayer.getLastName(), updatedPlayer.getHeight(), updatedPlayer.getNationality(), updatedPlayer.getLogo(), updatedPlayer.getPositionType()));
    }

    @DeleteMapping(value = "/players/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> deletePlayer(@PathVariable("id") Long id) throws NotFoundException{
        playerService.delete(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }


}