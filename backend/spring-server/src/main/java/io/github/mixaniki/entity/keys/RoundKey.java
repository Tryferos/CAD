package io.github.mixaniki.entity.keys;

import io.github.mixaniki.entity.Championship;
import io.github.mixaniki.entity.validation.groups.ValidationGroups;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Null;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.io.Serializable;

@Data
@Embeddable
public class RoundKey implements Serializable {

    @Column(name = "round_id")
    private Long id;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "championship_id", referencedColumnName = "championship_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Championship championship;

    public void setCompositeId(Long id, Long championshipId){
        setId(id);
        Championship championship = new Championship();
        championship.setId(championshipId);
        setChampionship(championship);
    }
}
