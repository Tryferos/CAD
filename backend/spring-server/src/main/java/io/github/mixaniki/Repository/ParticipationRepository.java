package io.github.mixaniki.Repository;

import io.github.mixaniki.entity.Championship;
import io.github.mixaniki.entity.Participation;
import io.github.mixaniki.entity.Team;
import io.github.mixaniki.entity.keys.ParticipationKey;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ParticipationRepository extends CrudRepository<Participation, ParticipationKey> {

    @Query("SELECT COUNT(p) FROM Participation p WHERE p.participationKey.championship.id = :championshipId")
    int countParticipationsBy(@Param("championshipId") Long championshipId);

    @Query("SELECT p.participationKey.team FROM Participation p WHERE p.participationKey.championship.id = :championshipId")
    List<Team> findTeamsByChampionshipId(@Param("championshipId") Long championshipId);

}
