package io.github.mixaniki.domain.model.service;

import io.github.mixaniki.Repository.CityRepository;
import io.github.mixaniki.entity.City;
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
public class CityServiceImpl implements ObjectService<City, Long>{
    private final CityRepository cityRepository;

    @Autowired
    public CityServiceImpl(CityRepository cityRepository) {
        this.cityRepository = cityRepository;
    }

    @Override
    public City getById(Long id) throws NotFoundException {
        Optional<City> optionalCity = cityRepository.findById(id);

        return optionalCity.orElseThrow(() -> new NotFoundException("City with id " + id + " does not exist"));
    }

    @Override
    public List<City> getAll() throws NotFoundException {
        return (List<City>) cityRepository.findAll();
    }

    @Override
    @Transactional
    @Validated(value = {ValidationGroups.Create.class, Default.class} )
    public City create(@Valid @NotNull City city) throws NotFoundException {
        return cityRepository.save(city);
    }

    @Override
    @Transactional
    public City update(@Valid @NotNull City city) throws NotFoundException {
        if(!cityRepository.existsById(city.getId())){
            throw new NotFoundException("City with such id does not exist");
        }

        return cityRepository.save(city);
    }

    @Override
    public void delete(Long id) throws NotFoundException {

        Optional<City> optionalCity = cityRepository.findById(id);

        if(optionalCity.isEmpty()){
            throw new NotFoundException("The city you want to delete with id "+ id +" does not exist");
        }

        cityRepository.delete(optionalCity.get());
    }
}
