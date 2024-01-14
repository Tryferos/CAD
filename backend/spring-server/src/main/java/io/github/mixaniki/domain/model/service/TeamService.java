package io.github.mixaniki.domain.model.service;

import io.github.mixaniki.entity.Championship;
import io.github.mixaniki.entity.Team;

import java.util.List;

public interface TeamService extends ObjectService<Team, Long>{

    List<Team> getByChampionship(Championship championship);
}
