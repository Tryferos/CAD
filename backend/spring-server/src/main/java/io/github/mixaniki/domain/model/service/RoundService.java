package io.github.mixaniki.domain.model.service;

import io.github.mixaniki.entity.Round;
import io.github.mixaniki.entity.keys.RoundKey;
import io.github.mixaniki.exception.model.NotFoundException;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

public interface RoundService extends ObjectService<Round, RoundKey>{
    Round update(@Valid @NotNull Long roundId, @Valid @NotNull Long championshipId, @Valid @NotNull Round round) throws NotFoundException;
}
