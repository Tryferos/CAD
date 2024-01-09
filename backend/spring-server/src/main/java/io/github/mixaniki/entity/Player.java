package io.github.mixaniki.entity;

import io.github.mixaniki.entity.type.PlayerPositionType;
import io.github.mixaniki.entity.validation.groups.ValidationGroups;
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
    @Null(groups = ValidationGroups.Create.class)
    @Column(name = "id")
    private Long id;
    @NotNull
    @Column(name = "first_name", length = 30)
    private String firstName;
    @NotNull
    @Column(name = "last_name", length = 30)
    private String lastName;
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
    @Column(name = "position_type")
    private PlayerPositionType positionType;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "team_id", referencedColumnName = "id", nullable = false)
    private Team team;



}
