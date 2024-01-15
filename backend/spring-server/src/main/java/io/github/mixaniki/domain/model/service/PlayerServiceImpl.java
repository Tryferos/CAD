package io.github.mixaniki.domain.model.service;

import io.github.mixaniki.Repository.PlayerRepository;
import io.github.mixaniki.Repository.TeamRepository;
import io.github.mixaniki.entity.Player;
import io.github.mixaniki.entity.Team;
import io.github.mixaniki.entity.validation.groups.ValidationGroups;
import io.github.mixaniki.exception.model.NotFoundException;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.groups.Default;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.util.List;
import java.util.Optional;

@Service
@Validated
public class PlayerServiceImpl implements PlayerService{

    private final PlayerRepository playerRepository;
    private final TeamRepository teamRepository;

    @Autowired
    public PlayerServiceImpl(PlayerRepository playerRepository, TeamRepository teamRepository) {
        this.playerRepository = playerRepository;
        this.teamRepository = teamRepository;
    }

    @Override
    public Player getById(Long id) throws NotFoundException {
        Optional<Player> optionalPlayer = playerRepository.findById(id);
        if (optionalPlayer.isEmpty()){
            throw new NotFoundException("Player with id "+ id +" does not exist");
        }

        return optionalPlayer.get();
    }

    @Override
    public List<Player> getAll() {
        return (List<Player>) playerRepository.findAll();
    }


    public List<Player> getByTeam(Team team) throws NotFoundException {
        return playerRepository.findByTeam(team);
    }

    @Override
    public long getCountOfPlayersOfTeam(@Valid @NotNull Team team) {
       return playerRepository.countPlayersByTeam(team);
    }

    @Override
    @Transactional
    @Validated(value = {ValidationGroups.Create.class, Default.class} )
    public Player create(@Valid @NotNull Player player) throws NotFoundException{
        if(!teamRepository.existsById(player.getTeam().getId())){
            throw new NotFoundException("Team with id "+ player.getTeam().getId() +" does not exist");
        }

        return playerRepository.save(player);
    }

    @Override
    @Transactional
    @Validated(value = {ValidationGroups.Update.class, Default.class})
    public Player update(@Valid @NotNull Player player) throws NotFoundException {
        if(!playerRepository.existsById(player.getId())){
            throw new NotFoundException("Player with id "+ player.getId() +" does not exist");
        }

        if(!teamRepository.existsById(player.getTeam().getId())){
            throw new NotFoundException("Team with id "+ player.getTeam().getId() +" does not exist");
        }

        return playerRepository.save(player);
    }

    @Override
    public void delete(Long id) throws NotFoundException {
        Optional<Player> optionalPlayer = playerRepository.findById(id);
        if(optionalPlayer.isEmpty()){
            throw new NotFoundException("The player you want to delete with id "+ id +" does not exist");
        }

        playerRepository.delete(optionalPlayer.get());
    }

}