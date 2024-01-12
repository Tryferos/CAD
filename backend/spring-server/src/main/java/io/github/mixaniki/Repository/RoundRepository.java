package io.github.mixaniki.Repository;

import io.github.mixaniki.entity.Round;
import io.github.mixaniki.entity.keys.RoundKey;
import org.springframework.data.repository.CrudRepository;

public interface RoundRepository extends CrudRepository<Round, RoundKey> {
}
