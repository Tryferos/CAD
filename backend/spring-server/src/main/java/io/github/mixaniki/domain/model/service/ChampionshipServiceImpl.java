package io.github.mixaniki.domain.model.service;

import io.github.mixaniki.Repository.ChampionshipRepository;
import io.github.mixaniki.entity.Championship;
import io.github.mixaniki.entity.validation.groups.ValidationGroups;
import io.github.mixaniki.exception.model.NotFoundException;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.groups.Default;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.util.List;
import java.util.Optional;

@Service
@Validated
public class ChampionshipServiceImpl implements ChampionshipService {

    private final ChampionshipRepository championshipRepository;
    @Autowired
    public ChampionshipServiceImpl(ChampionshipRepository championshipRepository) {
        this.championshipRepository = championshipRepository;
    }

    @Override
    @Validated(value = {ValidationGroups.Create.class, Default.class})
    public Championship create(@Valid @NotNull Championship championship) {

        return championshipRepository.save(championship);
    }

    @Override
    public Championship getById(@NotNull Long id) throws NotFoundException {
        Optional<Championship> championshipOptional = championshipRepository.findById(id);
        if(championshipOptional.isEmpty()){
            throw new NotFoundException("The championship with id "+ id +" does not exist");
        }

        return championshipOptional.get();
    }

    @Override
    public List<Championship> getAll() {

        return (List<Championship>) championshipRepository.findAll();
    }

    @Override
    @Transactional
    @Validated(value = {ValidationGroups.Update.class, Default.class})
    public Championship update(Championship championship) throws NotFoundException {
        if(!championshipRepository.existsById(championship.getId())){
            throw new NotFoundException("Championship with such id does not exist");
        }

        return championshipRepository.save(championship);
    }

    @Override
    public void delete(Long id) throws NotFoundException {
        Optional<Championship> championshipOpt = championshipRepository.findById(id);
        if(championshipOpt.isEmpty()){
            throw new NotFoundException("The championship you want delete with id "+ id +" does not exist");
        }

        championshipRepository.delete(championshipOpt.get());
    }
}
