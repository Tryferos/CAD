package io.github.mixaniki.domain.model.service;

import io.github.mixaniki.entity.Championship;
import io.github.mixaniki.entity.Team;
import io.github.mixaniki.entity.validation.groups.ValidationGroups;
import io.github.mixaniki.exception.model.NotFoundException;
import io.github.mixaniki.exception.model.ValidationException;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.groups.Default;
import org.springframework.validation.annotation.Validated;

import java.time.LocalDate;
import java.util.List;

public interface ChampionshipService extends ObjectService<Championship, Long>{

    /**
     * Creates a championship with provided values
     *
     * @param championship The championship to create
     * @return             The created/saved championship
     */
    Championship create(@Valid @NotNull Championship championship);


    /**
     * Creates a new championship including the teams that are part of it.
     *
     * @param championship  The championship to create
     * @param teams         The teams that participate in the championship
     * @return              The created/saved championship
     * @throws NotFoundException  In case a team does not exist
     * @throws ValidationException In case the number of teams is invalid
     */
    @Validated(value = {ValidationGroups.Create.class, Default.class})
    Championship createChampionshipWithParticipations(@Valid @NotNull Championship championship, @NotNull List<Team> teams) throws NotFoundException, ValidationException;

    /**
     * Retrieves championship by id.
     *
     * @param id    The id of the championship to retrieve
     * @return      The championship with the provided id
     * @throws NotFoundException    In case a championship with the provided id does not exist
     */
    Championship getById(Long id) throws NotFoundException;

    /**
     * Retrieves championship by name.
     *
     * @param name   The name of the championship to retrieve
     * @return       The championship with the provided name
     * @throws NotFoundException  In case a championship with the provided name does not exist
     */
    Championship getByName(String name) throws NotFoundException;

    /**
     * Retrieves all championships.
     *
     * @return  A list of all championships.
     */
    List<Championship> getAll() ;

    /**
     * Updates a championship
     *
     * @param championship The championship to update
     * @return             The updated championship
     * @throws NotFoundException In case the championship to be updated does not exist
     */
    Championship update(@Valid @NotNull Championship championship) throws NotFoundException;

    /**
     * Deletes a championship
     *
     * @param id  The id of the championship to delete permanently
     * @throws NotFoundException In case the championship with the provided id does not exist
     */
    void delete(Long id) throws NotFoundException;


    /**
     * Creates the draw for the championship
     *
     * @param championshipId The championship to create the draw
     * @param date           The date to start the first round of championship
     * @throws NotFoundException In case the championship with the provided id does not exist
     * @throws ValidationException In case the championship with the provided id does not obey in the existing validations
     */
    void generateRoundRobinSchedule(Long championshipId, LocalDate date) throws NotFoundException, ValidationException;

}
