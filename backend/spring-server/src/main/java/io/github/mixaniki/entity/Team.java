package io.github.mixaniki.entity;


import io.github.mixaniki.entity.validation.groups.PlayerValidationGroups;
import jakarta.annotation.Nullable;
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
@Table(name = "Teams")
public class Team {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Null(groups = PlayerValidationGroups.Create.class)
    @Column(name = "id")
    private Long id;
    @NotNull
    @Column(name = "team_name", length = 30)
    private String team_name;
    @NotNull
    @Column(name = "short_name", length = 30)
    private String short_name;
    @Column(name = "stadium_name")
    private String stadium_name;
    @Column(name = "logo_path")
    private String logo_path;
    @Column(name = "coach_name")
    private String coach_name;

    @NotNull
    @ManyToOne //(targetEntity = PlayerPosition.class)
    @JoinColumn(name = "city_id", referencedColumnName = "id", nullable = false)
    private City city;

}
