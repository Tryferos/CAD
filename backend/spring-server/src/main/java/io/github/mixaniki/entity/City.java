package io.github.mixaniki.entity;

import io.github.mixaniki.entity.annotation.LowercaseConverter;
import io.github.mixaniki.entity.validation.groups.ValidationGroups;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Null;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Cities")

public class City {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Null(groups = ValidationGroups.Create.class)
    @Column(name = "city_id")
    @NotNull(groups = ValidationGroups.Update.class)
    private Long id;
    @NotBlank
    @Convert(converter = LowercaseConverter.class)
    @Column(name = "city_name", length = 30, nullable = false)
    private String cityName;

}