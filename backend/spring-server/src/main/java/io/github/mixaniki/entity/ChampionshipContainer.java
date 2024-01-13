package io.github.mixaniki.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChampionshipContainer {

    private Championship championship;
    private List<Team> teams;
}
