package io.github.mixaniki;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "player")
public class Player {

    @Column
    private String name;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
}
