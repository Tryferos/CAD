package io.github.mixaniki.Repository;


import io.github.mixaniki.entity.Game;
import io.github.mixaniki.entity.keys.GameKey;
import org.springframework.data.repository.CrudRepository;

public interface GameRepository extends CrudRepository<Game, GameKey> {
}
