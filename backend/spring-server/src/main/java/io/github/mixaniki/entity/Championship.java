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
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "championships")
public class Championship {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Null(groups = ValidationGroups.Create.class)
    @NotNull(groups = ValidationGroups.Update.class)
    @Column(name = "id", nullable = false)
    private Long id;
    @NotBlank
    @Convert(converter = LowercaseConverter.class)
    @Column(name = "name", unique = true)
    private String name;

}
