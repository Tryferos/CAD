package io.github.mixaniki.domain.model.service;

import io.github.mixaniki.Repository.TeamScorePerQuarterRepository;
import io.github.mixaniki.entity.TeamScorePerQuarter;
import io.github.mixaniki.entity.keys.TeamScorePerQuarterKey;
import io.github.mixaniki.entity.validation.groups.ValidationGroups;
import io.github.mixaniki.exception.model.NotFoundException;
import jakarta.transaction.Transactional;
import jakarta.validation.groups.Default;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.util.List;
import java.util.Optional;

@Service
@Validated
public class TeamScorePerQuarterServiceImpl implements TeamScorePerQuarterService{

    private final TeamScorePerQuarterRepository teamScorePerQuarterRepository;

    @Autowired
    public TeamScorePerQuarterServiceImpl(TeamScorePerQuarterRepository teamScorePerQuarterRepository) {
        this.teamScorePerQuarterRepository = teamScorePerQuarterRepository;
    }

    @Override
    @Transactional
    @Validated(value = {ValidationGroups.Create.class, Default.class} )
    public TeamScorePerQuarter create(TeamScorePerQuarter teamScorePerQuarter) throws NotFoundException {
        return teamScorePerQuarterRepository.save(teamScorePerQuarter);
    }

    @Override
    public TeamScorePerQuarter getById(TeamScorePerQuarterKey id) throws NotFoundException {
        Optional<TeamScorePerQuarter> optionalTeamScorePerQuarter = teamScorePerQuarterRepository.findById(id);
        if (optionalTeamScorePerQuarter.isEmpty()){
            throw new NotFoundException("TeamScorePerQuarter with id "+ id.toString() +" does not exist");
        }

        return optionalTeamScorePerQuarter.get();
    }

    @Override
    public List<TeamScorePerQuarter> getAll() throws NotFoundException {
        return (List<TeamScorePerQuarter>) teamScorePerQuarterRepository.findAll();
    }

    @Override
    @Transactional
    @Validated(value = {ValidationGroups.Update.class, Default.class})
    public TeamScorePerQuarter update(TeamScorePerQuarter teamScorePerQuarter) throws NotFoundException {
        if(!teamScorePerQuarterRepository.existsById(teamScorePerQuarter.getId())){
            throw new NotFoundException("TeamScorePerQuarter with such id does not exist");
        }

        return teamScorePerQuarterRepository.save(teamScorePerQuarter);
    }

    @Override
    public void delete(TeamScorePerQuarterKey id) throws NotFoundException {
        Optional<TeamScorePerQuarter> optionalTeamScorePerQuarter = teamScorePerQuarterRepository.findById(id);
        if(optionalTeamScorePerQuarter.isEmpty()){
            throw new NotFoundException("The TeamScorePerQuarter you want to delete with id "+ id.toString() +" does not exist");
        }

        teamScorePerQuarterRepository.delete(optionalTeamScorePerQuarter.get());

    }
}
