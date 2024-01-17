package io.github.mixaniki.domain.model.service;

import io.github.mixaniki.entity.Game;
import io.github.mixaniki.entity.keys.GameKey;
import io.github.mixaniki.exception.model.NotFoundException;

import java.util.List;

public interface GameService extends ObjectService<Game, GameKey>{
    List<Game> getByRoundChampionshipId(Long roundId, Long champioshipId) throws NotFoundException;
}
