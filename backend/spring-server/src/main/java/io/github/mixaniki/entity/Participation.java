package io.github.mixaniki.entity;

import io.github.mixaniki.entity.keys.ParticipationKey;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "participations")
public class Participation {

    @EmbeddedId
//    @AttributeOverrides({
//            @AttributeOverride( name = "team_id", column = @Column(name = "team_id")),
//            @AttributeOverride( name = "championship_id", column = @Column(name = "championship_id")),
//    })
    private ParticipationKey participationKey;

}
