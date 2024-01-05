package io.github.mixaniki.domain.model.service;

import io.github.mixaniki.entity.Player;
import io.github.mixaniki.entity.validation.groups.PlayerValidationGroups;
import io.github.mixaniki.exception.model.NotFoundException;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.groups.Default;
import org.springframework.validation.annotation.Validated;

import java.util.List;

public interface PlayerService {
    @Validated(value = {PlayerValidationGroups.Create.class, Default.class} )
    Player create(@Valid @NotNull Player player) throws NotFoundException;

    Player getById(Long id) throws NotFoundException;

    List<Player> getAll() throws NotFoundException;

    Player update(@Valid @NotNull Player player) throws NotFoundException;

    String  delete(Long id) throws NotFoundException;

}
