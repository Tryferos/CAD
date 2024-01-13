package io.github.mixaniki.Repository;

import io.github.mixaniki.entity.TeamScorePerQuarter;
import io.github.mixaniki.entity.keys.TeamScorePerQuarterKey;
import org.springframework.data.repository.CrudRepository;

public interface TeamScorePerQuarterRepository extends CrudRepository<TeamScorePerQuarter, TeamScorePerQuarterKey> {
}
