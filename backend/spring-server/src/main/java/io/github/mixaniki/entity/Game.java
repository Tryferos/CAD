package io.github.mixaniki.entity;

import io.github.mixaniki.entity.keys.GameKey;
import io.github.mixaniki.entity.validation.groups.ValidationGroups;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Null;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Games")
public class Game {
    @EmbeddedId
    private GameKey id;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "home_team_id", referencedColumnName = "team_id", nullable = false)
    private Team homeTeam;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "away_team_id", referencedColumnName = "team_id", nullable = false)
    private Team awayTeam;

    @Column(name = "match_date")
    private Date matchDate;


}
