package io.github.mixaniki.domain.model.service;

import io.github.mixaniki.Repository.GameRepository;
import io.github.mixaniki.entity.Game;
import io.github.mixaniki.entity.keys.GameKey;
import io.github.mixaniki.entity.validation.groups.ValidationGroups;
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
@Validated
public class GameServiceImpl implements GameService{
    private final GameRepository gameRepository;

    public GameServiceImpl(GameRepository gameRepository) {
        this.gameRepository = gameRepository;
    }

    @Override
    @Transactional
    @Validated(value = {ValidationGroups.Create.class, Default.class} )
    public Game create(@Valid @NotNull Game game) throws NotFoundException {
        return gameRepository.save(game);
    }

    @Override
    public Game getById(GameKey id) throws NotFoundException {
        Optional<Game> optionalGame = gameRepository.findById(id);
        if (optionalGame.isEmpty()){
            throw new NotFoundException("Game with id "+ id.toString() +" does not exist");
        }

        return optionalGame.get();
    }

    @Override
    public List<Game> getAll() throws NotFoundException {
        return (List<Game>) gameRepository.findAll();
    }

    @Override
    @Transactional
    public Game update(@Valid @NotNull Game game) throws NotFoundException {
        if(!gameRepository.existsById(game.getId())){
            throw new NotFoundException("Game with such id does not exist");
        }

        return gameRepository.save(game);
    }

    @Override
    public void delete(GameKey id) throws NotFoundException {
        Optional<Game> optionalGame = gameRepository.findById(id);
        if(optionalGame.isEmpty()){
            throw new NotFoundException("The game you want to delete with id "+ id.toString() +" does not exist");
        }

        gameRepository.delete(optionalGame.get());
    }


}
