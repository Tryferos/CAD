package io.github.mixaniki.domain.model.service;

import io.github.mixaniki.Repository.ChampionshipRepository;
import io.github.mixaniki.Repository.RoundRepository;
import io.github.mixaniki.entity.Round;
import io.github.mixaniki.entity.keys.RoundKey;
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
public class RoundServiceImpl implements RoundService{

    private final RoundRepository roundRepository;
    private final ChampionshipRepository championshipRepository;

    public RoundServiceImpl(RoundRepository roundRepository, ChampionshipRepository championshipRepository) {
        this.roundRepository = roundRepository;
        this.championshipRepository = championshipRepository;
    }

    @Override
    @Transactional
    @Validated(value = {ValidationGroups.Create.class, Default.class} )
    public Round create(@Valid @NotNull Round round) throws NotFoundException {
        return roundRepository.save(round);
    }

    @Override
    public Round getById(RoundKey id) throws NotFoundException {
        Optional<Round> optionalRound = roundRepository.findById(id);
        if (optionalRound.isEmpty()){
            throw new NotFoundException("Round with id "+ id.toString() +" does not exist");
        }

        return optionalRound.get();
    }

    @Override
    public List<Round> getAll() throws NotFoundException {
        return (List<Round>) roundRepository.findAll();
    }

    @Override
    @Transactional
    public Round update(@Valid @NotNull Round round) throws NotFoundException {
        if(!roundRepository.existsById(round.getId())){
            throw new NotFoundException("Round with such id does not exist");
        }

        return roundRepository.save(round);
    }

    @Override
    @Transactional
    public Round update(@Valid @NotNull Long roundId, @Valid @NotNull Long championshipId, @Valid @NotNull Round round) throws NotFoundException{
        RoundKey roundKey = new RoundKey();
        roundKey.setCompositeId(roundId, championshipId);
        Round roundToUpdate = new Round();
        roundToUpdate.setId(roundKey);

        if(!roundRepository.existsById(roundToUpdate.getId()) && championshipRepository.existsById(championshipId)){
            throw new NotFoundException("Round with such id or championshipId does not exist");
        }

        roundRepository.delete(roundToUpdate);

        return roundRepository.save(round);

    }

    @Override
    public void delete(RoundKey id) throws NotFoundException {
        Optional<Round> optionalRound = roundRepository.findById(id);
        if(optionalRound.isEmpty()){
            throw new NotFoundException("The round you want to delete with id "+ id.toString() +" does not exist");
        }

        roundRepository.delete(optionalRound.get());
    }

}
