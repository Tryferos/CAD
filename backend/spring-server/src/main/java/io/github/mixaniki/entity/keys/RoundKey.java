package io.github.mixaniki.entity.keys;

import io.github.mixaniki.entity.Championship;
import io.github.mixaniki.entity.validation.groups.ValidationGroups;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Null;

import java.io.Serializable;

@Embeddable
public class RoundKey implements Serializable {

    @Column(name = "round_id")
    private Long id;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "championship_id", referencedColumnName = "championship_id", nullable = false)
    private Championship championship;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Championship getChampionship() {
        return championship;
    }

    public void setChampionship(Championship championship) {
        this.championship = championship;
    }

    public void setCompositeId(Long id, Long championshipId){
        setId(id);
        Championship championship = new Championship();
        championship.setId(championshipId);
        setChampionship(championship);
    }

    @Override
    public String toString() {
        return "RoundKey{" +
                "id=" + id +
                ", championship=" + championship +
                '}';
    }
}
