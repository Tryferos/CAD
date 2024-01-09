package io.github.mixaniki.domain.model.service;

import io.github.mixaniki.entity.validation.groups.ValidationGroups;
import io.github.mixaniki.exception.model.NotFoundException;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.groups.Default;
import org.springframework.validation.annotation.Validated;

import java.util.List;

public interface ObjectService<T> {
    @Validated(value = {ValidationGroups.Create.class, Default.class} )
    T create(@Valid @NotNull T object) throws NotFoundException;

    T getById(Long id) throws NotFoundException;

    List<T> getAll() throws NotFoundException;

    T update(@Valid @NotNull T object) throws NotFoundException;

    String  delete(Long id) throws NotFoundException;
}
