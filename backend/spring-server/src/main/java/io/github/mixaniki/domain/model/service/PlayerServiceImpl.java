package io.github.mixaniki.domain.model.service;

import io.github.mixaniki.Repository.PlayerRepository;
import io.github.mixaniki.entity.Player;
import io.github.mixaniki.entity.validation.groups.PlayerValidationGroups;
import io.github.mixaniki.exception.model.NotFoundException;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.groups.Default;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.util.List;
import java.util.Optional;

@Service
public class PlayerServiceImpl implements PlayerService{

    private final PlayerRepository playerRepository;

    public PlayerServiceImpl(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
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
    public List<Player> getAll() throws NotFoundException {
        return (List<Player>) playerRepository.findAll();
    }

    @Override
    @Transactional
    @Validated(value = {PlayerValidationGroups.Create.class, Default.class} )
    public Player create(@Valid @NotNull Player player) throws NotFoundException {

        return playerRepository.save(player);
    }

    @Override
    @Transactional
    public Player update(@Valid @NotNull Player player) throws NotFoundException {
        if(!playerRepository.existsById(player.getId())){
            throw new NotFoundException("Player with such id does not exist");
        }

        return playerRepository.save(player);
    }

    @Override
    public String delete(Long id) throws NotFoundException {
        Optional<Player> optionalPlayer = playerRepository.findById(id);
        if(optionalPlayer.isEmpty()){
            throw new NotFoundException("The player you want to delete with id "+ id +" does not exist");
        }

        playerRepository.delete(optionalPlayer.get());
        return "Player with id "+ id +" removed successfully";
    }

}