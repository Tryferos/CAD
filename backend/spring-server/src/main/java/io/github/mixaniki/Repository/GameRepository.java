package io.github.mixaniki.Repository;


import io.github.mixaniki.entity.Championship;
import io.github.mixaniki.entity.Game;
import io.github.mixaniki.entity.Round;
import io.github.mixaniki.entity.Team;
import io.github.mixaniki.entity.keys.GameKey;
import io.github.mixaniki.entity.keys.RoundKey;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface GameRepository extends CrudRepository<Game, GameKey> {

    List<Game> findGamesById_Round(Round round);

    @Query("SELECT g FROM Game g WHERE g.id.round.id.id = :roundId AND g.id.round.id.championship.id = :championshipId")
    List<Game> findGamesByRoundChampionshipID(@Param("roundId") Long roundId, @Param("championshipId")Long championshipId);

//    List<Game> findGamesById_Round_Id(RoundKey roundKey);

//    @Query("SELECT g.homeTeam FROM Game g WHERE g.id = :gameKey")
//    Team findHomeTeamByGameId(@Param("gameKey") Long gameKey);
//
//    @Query("SELECT g.awayTeam FROM Game g WHERE g.id = :gameKey")
//    Team findAwayTeamByGameId(@Param("gameKey") Long gameKey);
}
