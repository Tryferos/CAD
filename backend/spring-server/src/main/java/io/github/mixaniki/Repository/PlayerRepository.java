package io.github.mixaniki.Repository;

import io.github.mixaniki.entity.Player;
import io.github.mixaniki.entity.Team;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface PlayerRepository extends CrudRepository<Player, Long> {
    List<Player> findByTeam(Team team);

    long countPlayersByTeam(@NotNull Team team);
}
