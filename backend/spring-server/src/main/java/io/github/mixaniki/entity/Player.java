package io.github.mixaniki.entity;

import io.github.mixaniki.entity.annotation.LowercaseConverter;
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
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Players")
public class Player {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Null(groups = ValidationGroups.Create.class)
    @NotNull(groups = ValidationGroups.Update.class)
    @Column(name = "player_id")
    private Long id;
    @NotNull
    @Convert(converter = LowercaseConverter.class)
    @Column(name = "first_name", length = 30)
    private String firstName;
    @NotNull
    @Convert(converter = LowercaseConverter.class)
    @Column(name = "last_name", length = 30)
    private String lastName;
    @Min(value = 0)
    @Max(value = 270)
    @Column(name = "height")
    private int height; // height in cm
    @Column(name = "nationality")
    @Convert(converter = LowercaseConverter.class)
    private String nationality;
    @Column(name = "logo_path", length = 1024, nullable = true)
    private String logoPath;
    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "position_type")
    private PlayerPositionType positionType;

    @ManyToOne
    @JoinColumn(name = "team_id", referencedColumnName = "team_id", nullable = true)
    @OnDelete(action = OnDeleteAction.SET_NULL)
    private Team team;

}
