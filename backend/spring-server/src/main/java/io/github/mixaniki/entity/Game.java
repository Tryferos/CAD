package io.github.mixaniki.entity;

import io.github.mixaniki.entity.keys.GameKey;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDateTime;
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
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Team homeTeam;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "away_team_id", referencedColumnName = "team_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Team awayTeam;

    @Column(name = "match_date")
    private LocalDateTime matchDate;


}
