package io.github.mixaniki.entity;

import io.github.mixaniki.entity.validation.groups.PlayerValidationGroups;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Null;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "City")
public class City {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Null(groups = PlayerValidationGroups.Create.class)
    @Column(name = "id")
    private Long id;
    @NotNull
    @Column(name = "city_name", length = 30, nullable = false)
    private String city_name;

}
