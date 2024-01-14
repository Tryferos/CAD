package io.github.mixaniki.entity.keys;

import io.github.mixaniki.entity.Game;
import io.github.mixaniki.entity.Team;
import io.github.mixaniki.entity.annotation.LowercaseConverter;
import io.github.mixaniki.entity.type.QuarterType;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.io.Serializable;

@Data
@Embeddable
public class TeamScorePerQuarterKey implements Serializable {

    @NotNull
    @Enumerated(EnumType.STRING)
    @Convert(converter = LowercaseConverter.class)
    @Column(name = "quarter")
    private QuarterType quarterType;

//    @Embedded
//    private GameKey gameKey;


    @ManyToOne
    @JoinColumns({
            @JoinColumn(name = "game_id", referencedColumnName = "game_id"),
            @JoinColumn(name = "round_id", referencedColumnName = "round_id"),
            @JoinColumn(name = "championship_id", referencedColumnName = "championship_id")
    })
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Game game;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "team_id", referencedColumnName = "team_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Team team;

    public void setCompositeId(QuarterType quarter, Long gameId, Long roundId, Long championshipId, Long TeamId){
        setQuarterType(quarter);
        GameKey gamekeyFk = new GameKey();
        gamekeyFk.setCompositeId(gameId, roundId, championshipId);
        Game gameFk = new Game();
        gameFk.setId(gamekeyFk);
        setGame(gameFk);
        Team teamFk = new Team();
        teamFk.setId(TeamId);
        setTeam(teamFk);
    }

}
