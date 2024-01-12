package io.github.mixaniki.entity;


import io.github.mixaniki.entity.validation.groups.ValidationGroups;
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
    @Null(groups = ValidationGroups.Create.class)
    @Column(name = "team_id")
    private Long id;
    @NotNull
    @Column(name = "team_name", length = 30)
    private String teamName;
    @NotNull
    @Column(name = "short_name", length = 30)
    private String shortName;
    @Column(name = "stadium_name")
    private String stadiumName;
    @Column(name = "logo_path")
    private String logoPath;
    @Column(name = "coach_name")
    private String coachName;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "city_id", referencedColumnName = "city_id", nullable = false)
    private City city;

}
