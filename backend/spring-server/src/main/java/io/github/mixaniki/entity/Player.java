package io.github.mixaniki.entity;

import io.github.mixaniki.entity.type.PlayerPositionType;
import io.github.mixaniki.entity.validation.groups.PlayerValidationGroups;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Null;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "players")
public class Player {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Null(groups = PlayerValidationGroups.Create.class)
    @Column(name = "player_id")
    private Long id;
    @NotNull
    @Column(name = "player_first_name", length = 30)
    private String first_name;
    @NotNull
    @Column(name = "player_last_name", length = 30)
    private String last_name;
    @Min(value = 0)
    @Max(value = 270)
    @Column(name = "height")
    private int height; // height in cm
    @Column(name = "nationality")
    private String nationality;
    @Column(name = "logo_path", length = 1024, nullable = true)
    private String logo;
    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "PlayerPositionType")
    private PlayerPositionType positionType;

//    @ManyToOne
//    @JoinColumn(name = "position_code", referencedColumnName = "id")
//    private PlayerPosition playerPosition;



//    private Long playerPosition;

}
