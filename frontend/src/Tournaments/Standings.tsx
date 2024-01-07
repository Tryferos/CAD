import React from "react";
import { UpcomingMatch } from "./Matches";

type Standings = {
    teams: Array<Team>;
    name: string;
}

export type Team = {
    team_id: string;
    team_name: string;
    logo_path: string;
    games: Array<Game>
    gamesWon?: number;
    gamesLost?: number;
    totalGames?: number;
    points?: number;
}

type Game = {
    game_id: string;
    quarter: Array<Quarter>
    win?: boolean;
}

type Quarter = {
    quarter: number;
    quarter_score: number;
    quarter_score_against: number;
}

function getGame(): Game {
    return {
        game_id: '1',
        quarter: new Array(4).fill(1).map((item, i) => ({
            quarter: i + 1,
            quarter_score: Math.floor(Math.random() * 120),
            quarter_score_against: Math.floor(Math.random() * 120)
        }))
    }
}

export default function Standings() {
    const standings: Standings = {
        name: 'Τουρνουά Ευρώπης',
        teams: [
            ...['PAOK', 'ARIS', 'AEK', 'PROMITHEAS', 'OLYMPIACOS', 'PANATHINAIKOS', 'LARISA', 'MAROUSI', 'LAVRIO', 'APOLLON P.', 'KOLOSSOS RODOU',
                'PERISTERI'].map((item, i) => (
                {
                    games: [...new Array(10).fill(1).map(item => getGame())],
                    team_name: item,
                    team_id: `${i + 1}`,
                    logo_path: '/paok.png'
                })).map((team, i) => {
                    const gamesWon = team.games.filter((game, i) =>
                        game.quarter.reduce((p, c, i) => p + c.quarter_score, 0) > game.quarter.reduce((p, c, i) => p + c.quarter_score_against, 0)).length;
                    const totalGames = team.games.length;
                    const gamesLost = totalGames - gamesWon;
                    const points = (gamesWon * 2) + (gamesLost * 1);
                    return (
                        {
                            ...team,
                            gamesWon: gamesWon,
                            gamesLost: gamesLost,
                            totalGames: totalGames,
                            points: points
                        }
                    )
                })
        ]
    }
    return (
        <section className="flex w-full h-full flex-1 justify-between">
            <ul className="flex basis-[66%] flex-col *:px-4 *:py-2 *:items-center group [&>*:nth-child(even)]:bg-slate-100">
                <li className="flex justify-between border-b-[1px] pt-0 mb-4 font-medium text-slate-500 border-b-slate-300 pb-2">
                    <div className="flex gap-x-4">
                        <p className="w-6 flex justify-center">#</p>
                        <p>Ομάδα</p>
                    </div>
                    <div className="flex gap-x-2 *:w-[30%] *:min-w-[60px] *:text-center">
                        <p>Αγώνες</p>
                        <p>Νίκες</p>
                        <p>Ήττες</p>
                        <p>Βαθμοί</p>
                    </div>

                </li>
                {
                    standings.teams.sort((a, b) => b.points - a.points).map((team, i) => {
                        return (
                            <li key={i} className="flex justify-between">
                                <div className="flex gap-x-4 items-center">
                                    <div className={`size-6 rounded-md flex items-center justify-center ${i>=6 ? 'bg-sec' : 'bg-amber-500'} text-white`}>
                                        <p>{i + 1}</p>
                                    </div>
                                    <img src={team.logo_path} className="size-8" style={{ objectFit: 'contain' }} />
                                    <p className="-ml-2">{team.team_name}</p>
                                </div>
                                <div className="flex gap-x-2 *:w-[30%] *:min-w-[60px] *:text-center">
                                    <p>{team.totalGames}</p>
                                    <p>{team.gamesWon}</p>
                                    <p>{team.gamesLost}</p>
                                    <p>{team.points}</p>
                                </div>

                            </li>
                        )
                    })
                }
            </ul>
            <ul className="justify-center flex flex-col h-full basis-[30%] gap-y-5">
                <p className="text-center font-medium mt-2">Ανερχόμενα παιχνίδια</p>
                <UpcomingMatch away_team={{logo_path: '/paok.png',team_id: '1',team_name: 'Olympiacos'}} 
                home_team={{logo_path: '/paok.png', team_id: '2', team_name: 'Paok'}} date="7/1/2024 - 18:08" round={11} tournament_name="Τουρνουά Ευρώπης"
                />
                <UpcomingMatch away_team={{logo_path: '/paok.png',team_id: '1',team_name: 'Olympiacos'}} 
                home_team={{logo_path: '/paok.png', team_id: '2', team_name: 'Paok'}} date="7/1/2024 - 18:08" round={11} tournament_name="Τουρνουά Ευρώπης"
                />
                <UpcomingMatch away_team={{logo_path: '/paok.png',team_id: '1',team_name: 'Olympiacos'}} 
                home_team={{logo_path: '/paok.png', team_id: '2', team_name: 'Paok'}} date="7/1/2024 - 18:08" round={11} tournament_name="Τουρνουά Ευρώπης"
                />
                <UpcomingMatch away_team={{logo_path: '/paok.png',team_id: '1',team_name: 'Olympiacos'}} 
                home_team={{logo_path: '/paok.png', team_id: '2', team_name: 'Paok'}} date="7/1/2024 - 18:08" round={11} tournament_name="Τουρνουά Ευρώπης"
                />
                

            </ul>
        </section>
    )
}