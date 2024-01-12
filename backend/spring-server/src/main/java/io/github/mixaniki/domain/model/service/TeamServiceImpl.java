package io.github.mixaniki.domain.model.service;

import io.github.mixaniki.Repository.TeamRepository;
import io.github.mixaniki.entity.Team;
import io.github.mixaniki.entity.validation.groups.ValidationGroups;
import io.github.mixaniki.exception.model.NotFoundException;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.groups.Default;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.util.List;
import java.util.Optional;

@Service
@Validated
public class TeamServiceImpl implements TeamService{
    private final TeamRepository teamRepository;

    public TeamServiceImpl(TeamRepository teamRepository) {
        this.teamRepository = teamRepository;
    }

    @Override
    public Team getById(Long id) throws NotFoundException {
        Optional<Team> optionalTeam = teamRepository.findById(id);
        if (optionalTeam.isEmpty()){
            throw new NotFoundException("Team with id "+ id +" does not exist");
        }

        return optionalTeam.get();
    }

    @Override
    public List<Team> getAll() throws NotFoundException {
        return (List<Team>) teamRepository.findAll();
    }

    @Override
    @Transactional
    @Validated(value = {ValidationGroups.Create.class, Default.class} )
    public Team create(@Valid @NotNull Team team) throws NotFoundException {
        return teamRepository.save(team);
    }

    @Override
    @Transactional
    public Team update(@Valid @NotNull Team team) throws NotFoundException {
        if(!teamRepository.existsById(team.getId())){
            throw new NotFoundException("Team with such id does not exist");
        }

        return teamRepository.save(team);
    }

    @Override
    public void delete(Long id) throws NotFoundException {
        Optional<Team> optionalTeam = teamRepository.findById(id);
        if(optionalTeam.isEmpty()){
            throw new NotFoundException("The team you want to delete with id "+ id +" does not exist");
        }

        teamRepository.delete(optionalTeam.get());
    }
}
