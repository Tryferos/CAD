package io.github.mixaniki.entity;

import io.github.mixaniki.entity.keys.TeamScorePerQuarterKey;
import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Team_Score_Per_Quarter")
public class TeamScorePerQuarter {

    @EmbeddedId
    private TeamScorePerQuarterKey id;

    @Column(name = "quarter_score")
    private int quarter_score;

}
