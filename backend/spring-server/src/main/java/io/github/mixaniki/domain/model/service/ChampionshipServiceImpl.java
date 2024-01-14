package io.github.mixaniki.domain.model.service;

import io.github.mixaniki.Repository.ChampionshipRepository;
import io.github.mixaniki.Repository.ParticipationRepository;
import io.github.mixaniki.Repository.TeamRepository;
import io.github.mixaniki.entity.Championship;
import io.github.mixaniki.entity.Participation;
import io.github.mixaniki.entity.keys.ParticipationKey;
import io.github.mixaniki.entity.Team;
import io.github.mixaniki.entity.validation.groups.ValidationGroups;
import io.github.mixaniki.exception.model.NotFoundException;
import io.github.mixaniki.exception.model.ValidationException;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.groups.Default;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.util.List;
import java.util.Optional;

@Service
@Validated
public class ChampionshipServiceImpl implements ChampionshipService {

    private final ChampionshipRepository championshipRepository;
    private final TeamRepository teamRepository;
    private final ParticipationRepository participationRepository;

    @Autowired
    public ChampionshipServiceImpl(ChampionshipRepository championshipRepository, TeamRepository teamRepository, ParticipationRepository participationRepository) {
        this.championshipRepository = championshipRepository;
        this.teamRepository = teamRepository;
        this.participationRepository = participationRepository;
    }

    @Override
    @Validated(value = {ValidationGroups.Create.class, Default.class})
    public Championship create(@Valid @NotNull Championship championship) {
        if (championshipRepository.existsChampionshipByName(championship.getName())){
            throw new DataIntegrityViolationException("Unique constraint violation. The championship name '"+ championship.getName() +"' already exists.");
        }

        return championshipRepository.save(championship);
    }

    @Override
    @Transactional
    @Validated(value = {ValidationGroups.Create.class, Default.class})
    public Championship createChampionshipWithParticipations(@Valid @NotNull Championship championship, @NotNull List<Team> teams) throws NotFoundException, ValidationException {

        for(Team team: teams) {
            if (!teamRepository.existsById(team.getId())) {
                throw new NotFoundException("The team with id " + team.getId() + " does not exist");
            }
        }

        int numberOfParticipations = teams.size();

    //        In the final operation should be; if(numberOfParticipations < 4 || numberOfParticipations > 18)
        if (numberOfParticipations < 1 || numberOfParticipations > 18) {
            throw new ValidationException("The number of teams must be at least 1 or max 18");
        }

        championship.setName(championship.getName());
        create(championship);

        Participation participation;

        for (Team team : teams) {

            ParticipationKey participationKey = new ParticipationKey();
            participationKey.setChampionship(championship);
            participationKey.setTeam(team);

            participation = new Participation(participationKey);
            participationRepository.save(participation);
        }

            return championship;
    }

    @Override
    public Championship getById(Long id) throws NotFoundException {
        Optional<Championship> championshipOptional = championshipRepository.findById(id);
        if(championshipOptional.isEmpty()){
            throw new NotFoundException("The championship with id "+ id +" does not exist");
        }

        return championshipOptional.get();
    }

    @Override
    public Championship getByName(String name) throws NotFoundException {
        Optional<Championship> championshipOptional = Optional.ofNullable(championshipRepository.findChampionshipByName(name));
        if(championshipOptional.isEmpty()){
            throw new NotFoundException("The championship with name "+ name +" does not exist");
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
