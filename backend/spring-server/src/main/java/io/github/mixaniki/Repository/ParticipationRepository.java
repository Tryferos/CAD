package io.github.mixaniki.Repository;

import io.github.mixaniki.entity.Participation;
import io.github.mixaniki.entity.keys.ParticipationKey;
import org.springframework.data.repository.CrudRepository;

public interface ParticipationRepository extends CrudRepository<Participation, ParticipationKey> {

}
