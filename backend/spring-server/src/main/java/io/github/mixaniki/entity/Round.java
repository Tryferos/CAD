package io.github.mixaniki.entity;

import io.github.mixaniki.entity.keys.RoundKey;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Rounds")
public class Round {
    @EmbeddedId
    private RoundKey id;
}
