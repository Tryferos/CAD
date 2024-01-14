import React, { FC, Fragment, useState } from 'react'
import { Player } from '../Teams';

import { teams } from '../Teams/index';
import { AddIcon } from '../icons';
import { ItemHeader } from './Admin';

type PlayerData = {
    team_name: string;
    players: Player[];
}

const data = teams.map((team) => {
    return {
        team_name: team.team_name,
        players: team.players
    }
});

const Players: FC = (props) => {
    const [players, setPlayers] = useState<PlayerData[]>(data);
    return (
        <section className='w-full flex flex-col items-center'>
            <ItemHeader
                onClick={() => { }}
                btnText='Προσθήκη'
                length={players.length}
                title='Παίκτες που συμμετέχουν στα Τουρνουά: '
                backgroundImageClass='bg-basketball-player'
            />
        </section>
    )
}

export default Players