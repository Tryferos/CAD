package io.github.mixaniki.Repository;

import io.github.mixaniki.entity.Championship;
import io.github.mixaniki.entity.Team;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface TeamRepository extends CrudRepository<Team, Long> {

    @Query("SELECT p.participationKey.team from Participation p where p.participationKey.championship = :championship ")
    List<Team> findByChampionship(Championship championship);

}
