package io.github.mixaniki.Repository;

import io.github.mixaniki.entity.Player;
import org.springframework.data.repository.CrudRepository;

public interface PlayerRepository extends CrudRepository<Player, Long> {

}
