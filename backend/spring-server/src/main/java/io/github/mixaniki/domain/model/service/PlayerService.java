package io.github.mixaniki.domain.model.service;

import io.github.mixaniki.entity.Player;
import io.github.mixaniki.entity.validation.groups.ValidationGroups;
import io.github.mixaniki.exception.model.NotFoundException;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.groups.Default;
import org.springframework.validation.annotation.Validated;

import java.util.List;

public interface PlayerService extends ObjectService<Player, Long>{

    /**
     * Creates player with provided values.
     *
     * @param player    The player to create
     * @return          The created/saved player
     */
    @Validated(value = {ValidationGroups.Create.class, Default.class} )
    Player create(@Valid @NotNull Player player);

    /**
     * Retrieves player by id.
     *
     * @param id    The id of the player to retrieve
     * @return      The player with the provided id
     * @throws NotFoundException    In case a player with the provided id does not exist
     */
    Player getById(Long id) throws NotFoundException;

    /**
     * Retrieves all players.
     *
     * @return  A list of all players.
     */
    List<Player> getAll();

    /**
     * Updates a player
     *
     * @param player The player to update
     * @return       The updated player
     * @throws NotFoundException In case the player to be updated does not exist
     */
    Player update(@Valid @NotNull Player player) throws NotFoundException;

    /**
     * Deletes a player
     *
     * @param id     The id of the player to delete permanently
     * @throws NotFoundException  In case a player with the provided id does not exist
     */
    void  delete(Long id) throws NotFoundException;

}
