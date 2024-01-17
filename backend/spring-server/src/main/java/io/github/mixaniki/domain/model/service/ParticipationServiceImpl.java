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
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.groups.Default;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.util.List;
import java.util.Optional;

@Service
@Validated
public class ParticipationServiceImpl implements ParticipationService{

    private final ChampionshipRepository championshipRepository;
    private final TeamRepository teamRepository;
    private final ParticipationRepository participationRepository;


    public ParticipationServiceImpl(ChampionshipRepository championshipRepository, TeamRepository teamRepository, ParticipationRepository participationRepository) {
        this.championshipRepository = championshipRepository;
        this.teamRepository = teamRepository;
        this.participationRepository = participationRepository;
    }

    @Override
    @Transactional
    @Validated(value = {ValidationGroups.Create.class, Default.class})
    public Participation create(@Valid @NotNull Participation participation) throws NotFoundException {
        if (!teamRepository.existsById(participation.getParticipationKey().getTeam().getId())){
            throw new NotFoundException("The team with id "+ participation.getParticipationKey().getTeam().getId() + " does not exist");
        }

        if (!championshipRepository.existsById(participation.getParticipationKey().getChampionship().getId())){
            throw new NotFoundException("The championship with id "+ participation.getParticipationKey().getChampionship().getId() + " does not exist");
        }

        if (participationRepository.existsById(participation.getParticipationKey())){
            throw new DataIntegrityViolationException("Such participation:  "+ participation.getParticipationKey()+ " already exists");
        }

        return participationRepository.save(participation);
    }

    @Override
    public Participation getById(ParticipationKey key) throws NotFoundException {
        Optional<Participation> participationOpt = participationRepository.findById(key);
        if(participationOpt.isEmpty()){
            throw new NotFoundException("Such participation does not exist");
        }

        return participationOpt.get();
    }

    @Override
    public List<Participation> getAll() {
        Optional<List<Participation>> participationOpt = Optional.of((List<Participation>) participationRepository.findAll());

        return participationOpt.get();
    }

    @Override
    public boolean existsDrawById(@NotNull Championship championship) {

        return participationRepository.existsDrawById(championship.getId());
    }


// The update operation isn't useful for the table participation as in 12/01/2024 status
    @Override
    @Transactional
    @Validated(value = {ValidationGroups.Update.class, Default.class})
    public Participation update(@Valid @NotNull Participation participation) throws NotFoundException {

            throw new NotFoundException("update method. Uncomment the code below to run expectedly");

            //        if (!teamRepository.existsById(participation.getParticipationKey().getTeam().getId())) {
//            throw new NotFoundException("The team with id " + participation.getParticipationKey().getTeam().getId() + " does not exist");
//        }
//
//        if (!championshipRepository.existsById(participation.getParticipationKey().getChampionship().getId())) {
//            throw new NotFoundException("The championship with id " + participation.getParticipationKey().getChampionship().getId() + " does not exist");
//        }
//
//        if (participationRepository.existsById(participation.getParticipationKey())) {
//            throw new DataIntegrityViolationException("Such participation:  " + participation.getParticipationKey() + " already exists");
//        }

//        return participationRepository.save(participation);
    }

    @Override
    @Transactional
    @Validated(value = {ValidationGroups.Update.class, Default.class})
    public Participation update(Team team, Championship championship, Participation participation) throws NotFoundException {
        if (!teamRepository.existsById(participation.getParticipationKey().getTeam().getId())) {
            throw new NotFoundException("The team with id " + participation.getParticipationKey().getTeam().getId() + " does not exist");
        }

        if (!championshipRepository.existsById(participation.getParticipationKey().getChampionship().getId())) {
            throw new NotFoundException("The championship with id " + participation.getParticipationKey().getChampionship().getId() + " does not exist");
        }

        if (participationRepository.existsById(participation.getParticipationKey())) {
            throw new DataIntegrityViolationException("Such participation:  " + participation.getParticipationKey() + " already exists");
        }

        ParticipationKey participationKeyLast = new ParticipationKey();
        participationKeyLast.setTeam(team);
        participationKeyLast.setChampionship(championship);

        Participation participationToDelete = new Participation();
        participationToDelete.setParticipationKey(participationKeyLast);
        participationRepository.delete(participationToDelete);

        return participationRepository.save(participation);
    }

    @Override
    public void delete(ParticipationKey key) throws NotFoundException {
        Optional<Participation> participationOpt = participationRepository.findById(key);
        if(participationOpt.isEmpty()){
            throw new NotFoundException("The participation you want to delete does not exist");
        }

        participationRepository.delete(participationOpt.get());
    }

}
