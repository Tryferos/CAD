package io.github.mixaniki.domain.model.service;

import io.github.mixaniki.entity.Championship;
import io.github.mixaniki.entity.Participation;
import io.github.mixaniki.entity.keys.ParticipationKey;
import io.github.mixaniki.entity.Team;
import io.github.mixaniki.entity.validation.groups.ValidationGroups;
import io.github.mixaniki.exception.model.NotFoundException;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.groups.Default;
import org.springframework.validation.annotation.Validated;

public interface ParticipationService extends ObjectService<Participation, ParticipationKey> {

    /**
     * Creates a new participation
     *
     * @param participation  The participation to create
     * @return               The created participation
     * @throws NotFoundException In case team or championship do not exist or participation already exists
     */
    Participation create(@Valid @NotNull Participation participation) throws NotFoundException;

    /**
     * Creates a new participation without deleting the existing one. It's not exactly an update operation
     *
     * @param participation  The participation to create
     * @return               The created participation
     * @throws NotFoundException In case team or championship do not exist or participation already exists
     */
    Participation update(@Valid @NotNull Participation participation) throws NotFoundException;

    /**
     * Updates a record by deleting the team and championship given as parameters and creating a new participation given in requestBody
     * It's a better approach for update.
     *
     * @param team           The team to delete
     * @param championship   The championship to delete
     * @param participation  The participation to create
     * @return               The created participation
     * @throws NotFoundException In case team or championship do not exist or participation already exists
     */
    @Validated(value = {ValidationGroups.Update.class, Default.class} )
    Participation update(@Valid @NotNull Team team, @Valid @NotNull Championship championship,
                         @Valid @NotNull Participation participation) throws NotFoundException;

    boolean existsDrawById(@Valid @NotNull Championship championship);

}
