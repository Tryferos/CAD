package io.github.mixaniki.entity.keys;

import io.github.mixaniki.entity.Team;
import io.github.mixaniki.entity.type.QuarterType;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.io.Serializable;

@Data
@Embeddable
public class TeamScorePerQuarterKey implements Serializable {

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "quarter")
    private QuarterType quarterType;

    @Embedded
    private GameKey gameKey;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "team_id", referencedColumnName = "team_id", nullable = false)
    private Team team;

    public void setCompositeId(QuarterType quarter, Long gameId, Long roundId, Long championshipId, Long TeamId){
        setQuarterType(quarter);
        GameKey gamekeyFk = new GameKey();
        gamekeyFk.setCompositeId(gameId, roundId, championshipId);
        setGameKey(gamekeyFk);
        Team teamFk = new Team();
        teamFk.setId(TeamId);
        setTeam(teamFk);
    }

}
