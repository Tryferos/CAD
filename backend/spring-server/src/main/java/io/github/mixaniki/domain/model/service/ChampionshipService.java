package io.github.mixaniki.domain.model.service;

import io.github.mixaniki.entity.Championship;
import io.github.mixaniki.exception.model.NotFoundException;
import io.github.mixaniki.exception.model.ValidationException;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

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
     * Retrieves championship by id.
     *
     * @param id    The id of the championship to retrieve
     * @return      The championship with the provided id
     * @throws NotFoundException    In case a championship with the provided id does not exist
     */
    Championship getById(@NotNull Long id) throws NotFoundException;


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
     * @throws ValidationException In case the new name of the championship to be updated already exists
     */
    Championship update(@Valid @NotNull Championship championship) throws NotFoundException;

    /**
     *
     * @param id  The id of the championship to delete permanently
     * @throws NotFoundException In case the championship with the provided id does not exist
     */
    void delete(Long id) throws NotFoundException;

}
