package io.github.mixaniki.domain.model.service;

import io.github.mixaniki.entity.Team;
import io.github.mixaniki.entity.validation.groups.ValidationGroups;
import io.github.mixaniki.exception.model.NotFoundException;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.groups.Default;
import org.springframework.validation.annotation.Validated;

import java.util.List;

public interface TeamService {
    @Validated(value = {ValidationGroups.Create.class, Default.class} )
    Team create(@Valid @NotNull Team team) throws NotFoundException;

    Team getById(Long id) throws NotFoundException;

    List<Team> getAll() throws NotFoundException;

    Team update(@Valid @NotNull Team team) throws NotFoundException;

    String  delete(Long id) throws NotFoundException;

}
