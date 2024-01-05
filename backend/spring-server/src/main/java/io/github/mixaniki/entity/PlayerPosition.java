package io.github.mixaniki.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "player_position")
public class PlayerPosition {

    @Id
//    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(length = 20, name = "position_name" )
    private String name;

}
