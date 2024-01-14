package io.github.mixaniki.entity.keys;


import io.github.mixaniki.entity.Round;
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
public class GameKey implements Serializable {

    @GeneratedValue(strategy = GenerationType.AUTO)
    @Null(groups = ValidationGroups.Create.class)
    @Column(name = "game_id")
    private Long id;

//    @Embedded
//    private RoundKey roundKey;

    @ManyToOne
    @JoinColumns({
            @JoinColumn(name = "round_id", referencedColumnName = "round_id"),
            @JoinColumn(name = "championship_id", referencedColumnName = "championship_id")
    })
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Round round;


    public void setCompositeId(Long id, Long roundId, Long championshipId){
        setId(id);

        RoundKey roundKey= new RoundKey();
        roundKey.setCompositeId(roundId, championshipId);

        Round round1 = new Round(roundKey);
        setRound(round1);
    }

}
