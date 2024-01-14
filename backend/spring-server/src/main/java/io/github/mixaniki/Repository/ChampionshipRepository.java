package io.github.mixaniki.Repository;

import io.github.mixaniki.entity.Championship;
import org.springframework.data.repository.CrudRepository;

public interface ChampionshipRepository extends CrudRepository<Championship, Long> {

    boolean existsChampionshipByName(String name);

    Championship findChampionshipByName(String name);

}
