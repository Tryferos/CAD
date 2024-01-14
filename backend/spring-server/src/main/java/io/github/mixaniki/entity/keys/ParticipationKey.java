package io.github.mixaniki.entity.keys;

//import io.github.mixaniki.entity.Championship;
//import io.github.mixaniki.entity.Team;

import io.github.mixaniki.entity.Championship;
import io.github.mixaniki.entity.Team;
import io.github.mixaniki.entity.validation.groups.ValidationGroups;
import jakarta.persistence.Embeddable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.io.Serializable;

@Data
@Embeddable
public class ParticipationKey implements Serializable {

    @NotNull(groups = ValidationGroups.Create.class)
    @ManyToOne
    @JoinColumn(name = "championship_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Championship championship;
    @NotNull(groups = ValidationGroups.Create.class)
    @ManyToOne
    @JoinColumn(name = "team_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Team team;

}
