package io.github.mixaniki.domain.model.service;

import io.github.mixaniki.Repository.*;
import io.github.mixaniki.entity.*;
import io.github.mixaniki.entity.keys.GameKey;
import io.github.mixaniki.entity.keys.ParticipationKey;
import io.github.mixaniki.entity.keys.RoundKey;
import io.github.mixaniki.entity.validation.groups.ValidationGroups;
import io.github.mixaniki.exception.model.NotFoundException;
import io.github.mixaniki.exception.model.ValidationException;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.groups.Default;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.server.ResponseStatusException;

import java.lang.reflect.InvocationTargetException;
import java.time.*;
import java.time.temporal.TemporalAdjusters;
import java.util.*;
import java.util.concurrent.ThreadLocalRandom;

@Service
@Validated
public class ChampionshipServiceImpl implements ChampionshipService {

    private final RoundRepository roundRepository;
    private final ChampionshipRepository championshipRepository;
    private final TeamRepository teamRepository;
    private final ParticipationRepository participationRepository;
    private final GameRepository gameRepository;

    @Autowired
    public ChampionshipServiceImpl(RoundRepository roundRepository, ChampionshipRepository championshipRepository, TeamRepository teamRepository, ParticipationRepository participationRepository, GameRepository gameRepository) {
        this.roundRepository = roundRepository;
        this.championshipRepository = championshipRepository;
        this.teamRepository = teamRepository;
        this.participationRepository = participationRepository;
        this.gameRepository = gameRepository;
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




    public void generateRoundRobinSchedule(Long championshipId, LocalDate date) {

        List<Team> teams = participationRepository.findTeamsByChampionshipId(championshipId);
        Collections.shuffle(teams);
        List<Game> schedule = new ArrayList<>();

        if (teams.size() % 2 != 0) {
            System.out.println("Even number of participations required!");
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "403 Forbidden - Even number of participations required to create league!");

//            // Add a bye (or dummy team) if the number of teams is odd
//            Team byeTeam = new Team();
//            byeTeam.setName("Bye Team");
//            teams.add(byeTeam);
        }

        int numRounds = teams.size() - 1;
        int gamesPerRound = teams.size() / 2;

        List<Team> rotatingTeams = new ArrayList<>(teams.subList(1, teams.size()));
        rotatingTeams.addAll(teams.subList(0, 1));

        for (long roundNumber = 0L; roundNumber < numRounds; roundNumber++) {

            Round round = new Round();
            RoundKey roundKey = new RoundKey();
            roundKey.setCompositeId(roundNumber,championshipId);
            round.setId(roundKey);
            date = date.with(TemporalAdjusters.nextOrSame(DayOfWeek.MONDAY));
            round.setStartDate(date.plusWeeks(roundNumber-1));
            roundRepository.save(round);

            List<Game> roundGames = new ArrayList<>();

            for (int i = 0; i < gamesPerRound; i++) {

                Game game = new Game();
                GameKey gameKey = new GameKey();
                gameKey.setRound(round);

                game.setId(gameKey);
                game.setHomeTeam(rotatingTeams.get(i));
                game.setAwayTeam(rotatingTeams.get(teams.size() - 1 - i));

                int randomHour = ThreadLocalRandom.current().nextInt(16, 21 + 1);
                LocalTime randomTime = LocalTime.of(randomHour, 0);
                // Combine LocalDate and random time to create a LocalDateTime
                LocalDateTime matchDateTime = game.getId().getRound().getStartDate().atTime(randomTime);

                game.setMatchDate(matchDateTime.plusDays(new Random().nextInt(7)));

                roundGames.add(game);

                gameRepository.save(game);

            }

            schedule.addAll(roundGames);

            // Rotate the teams for the next round
            rotatingTeams.add(rotatingTeams.remove(1));
        }

        //gameRepository.saveAll(schedule);
        //return schedule;
    }



    public void generateSchedule(Long championshipId, LocalDate date){

//        int numparticipations = participationRepository.countParticipationsBy(championshipId);

        List<Team> teams = participationRepository.findTeamsByChampionshipId(championshipId);

//        for(Team team : teams){
//            System.out.println(team);
//        }
//        System.out.println("Participations: " + numparticipations);
//        System.out.println("Participations: " + teams.size());

        if(!(teams.size()%2 == 0)){
            System.out.println("Even number of participations required!");
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "403 Forbidden - Even number of participations required to create league!");
        }

        int numTeams = teams.size();
        int numRounds = numTeams - 1;
        int gamesPerRound = teams.size()/2;

        // Generate combinations of teams and shuffle them
        List<List<Team>> combinations = generateCombinations(teams);
        Collections.shuffle(combinations);

        System.out.println("Number of Combinations: " + combinations.size());

//        // Iterate through the outer list
//        for (List<Team> teamList : combinations) {
//            System.out.println("Combination:");
//
//            // Iterate through the inner list
//            for (Team team : teamList) {
//                System.out.println(team); // Assuming Team has a proper toString method
//            }
//
//            System.out.println(); // Separate each combination
//        }


        // Create rounds
        for (long roundNumber = 1L; roundNumber <= numRounds; roundNumber++) {
            Round round = new Round();
            RoundKey roundKey = new RoundKey();
            roundKey.setCompositeId(roundNumber,championshipId);
            round.setId(roundKey);
            date = date.with(TemporalAdjusters.nextOrSame(DayOfWeek.MONDAY));
            round.setStartDate(date.plusWeeks(roundNumber-1));
            roundRepository.save(round);

//      2nd Try
            int gameInserted = 0;
            // Create games for each combination in the round
            Iterator<List<Team>> iterator = combinations.iterator();
            while (gameInserted != gamesPerRound) {

                    List<Team> combination = iterator.next();

                    // Ensure each team participates only once in a round
                    if (!isTeamParticipatingInRound(round, combination.get(0)) & !isTeamParticipatingInRound(round, combination.get(1))) {
                        Game game = new Game();
                        GameKey gameKey = new GameKey();
                        gameKey.setRound(round);

                        game.setId(gameKey);
                        game.setHomeTeam(combination.get(0));
                        game.setAwayTeam(combination.get(1));

                        int randomHour = ThreadLocalRandom.current().nextInt(16, 21 + 1);
                        LocalTime randomTime = LocalTime.of(randomHour, 0);
                        // Combine LocalDate and random time to create a LocalDateTime
                        LocalDateTime matchDateTime = game.getId().getRound().getStartDate().atTime(randomTime);

                        game.setMatchDate(matchDateTime.plusDays(new Random().nextInt(7)));

                        gameRepository.save(game);
                        gameInserted++;

                        // Remove the combination from the list
                        iterator.remove();
                    }
            }

//      1st try
//            // Create a list to keep track of scheduled combinations
//            List<List<Team>> scheduledCombinations = new ArrayList<>();
//
//            // Create games for each combination in the round
//            for (List<Team> combination : combinations) {
//                // Ensure each team participates only once in a round
//                if (!isTeamParticipatingInRound(round, combination.get(0)) &
//                        !isTeamParticipatingInRound(round, combination.get(1))) {
//                    Game game = new Game();
//                    GameKey gameKey = new GameKey();
//                    gameKey.setRound(round);
//
//                    game.setId(gameKey);
//
//                    game.setHomeTeam(combination.get(0));
//                    game.setAwayTeam(combination.get(1));
//                    gameRepository.save(game);
//
//                    // Add the scheduled combination to the list
//                    scheduledCombinations.add(combination);
//
//                    //System.out.println("Game: " + game);
//                    //break; // Move to the next round after scheduling a game
//                }
//            }
//
//            // Remove the scheduled combinations from the original list
//            combinations.removeAll(scheduledCombinations);

        }
    }

    private List<List<Team>> generateCombinations(List<Team> teams) {
        List<List<Team>> combinations = new ArrayList<>();
        for (int i = 0; i < teams.size(); i++) {
            for (int j = i + 1; j < teams.size(); j++) {
                List<Team> combination = new ArrayList<>();
                combination.add(teams.get(i));
                combination.add(teams.get(j));
                combinations.add(combination);
            }
        }
        return combinations;
    }

    private boolean isTeamParticipatingInRound(Round round, Team team) {

        for (Game game : gameRepository.findGamesById_Round(round)) {
            if (game.getHomeTeam().equals(team) || game.getAwayTeam().equals(team)) {
                return true;
            }
        }
        return false;
    }

}
