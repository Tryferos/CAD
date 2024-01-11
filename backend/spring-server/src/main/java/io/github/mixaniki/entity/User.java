package io.github.mixaniki.entity;

import io.github.mixaniki.entity.annotation.LowercaseConverter;
import io.github.mixaniki.entity.type.UserRole;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Builder
//@Getter
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    @Column(name = "id", nullable = false)
    private Long id;
    @NotBlank
    @Convert(converter = LowercaseConverter.class)
    @Column(name = "username", nullable = false)
    private String username;
    @NotBlank
//    @Convert(converter = LowercaseConverter.class)
    @Column(name = "password", nullable = false)
    private String password;
    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "role")
    private UserRole role;
    @Column(name = "registration_date", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP", updatable = false)
    private Timestamp registrationDate;


}
