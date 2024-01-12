package io.github.mixaniki.entity.keys;


import io.github.mixaniki.entity.Championship;
import io.github.mixaniki.entity.Round;
import io.github.mixaniki.entity.validation.groups.ValidationGroups;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Null;
import java.io.Serializable;

@Embeddable
public class GameKey implements Serializable {

    @GeneratedValue(strategy = GenerationType.AUTO)
    @Null(groups = ValidationGroups.Create.class)
    @Column(name = "game_id")
    private Long id;

    @Embedded
    private RoundKey roundKey;


    public RoundKey getRoundKey() {
        return roundKey;
    }

    public void setRoundKey(RoundKey roundKey) {
        this.roundKey = roundKey;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setCompositeId(Long id, Long roundId, Long championshipId){
        setId(id);
        RoundKey roundKey= new RoundKey();
        roundKey.setCompositeId(roundId, championshipId);
        setRoundKey(roundKey);
    }

    @Override
    public String toString() {
        return "GameKey{" +
                "id=" + id +
                ", roundKey=" + roundKey +
                '}';
    }
}
