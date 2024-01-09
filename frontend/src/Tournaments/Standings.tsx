import React from "react";
import { UpcomingMatch } from "./Matches";
import { Team } from "../Teams";

type Standings = {
    teams: Array<StandingsTeam>;
    name: string;
}

export type StandingsTeam = {
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

export function getRandomGame(): Game {
    return {
        game_id: '1',
        quarter: new Array(4).fill(1).map((item, i) => ({
            quarter: i + 1,
            quarter_score: Math.floor(Math.random() * 120),
            quarter_score_against: Math.floor(Math.random() * 120)
        }))
    }
}

export function calculateGame(team: Team) {
    const gamesWon = team.games.filter((game, i) =>
        game.quarter.reduce((p, c, i) => p + c.quarter_score, 0) > game.quarter.reduce((p, c, i) => p + c.quarter_score_against, 0)).length;
    const totalGames = team.games.length;
    const gamesLost = totalGames - gamesWon;
    const points = (gamesWon * 2) + (gamesLost * 1);
    return {
        gamesWon: gamesWon,
        gamesLost: gamesLost,
        totalGames: totalGames,
        points: points,
    }
}

export default function Standings() {
    const standings: Standings = {
        name: 'Τουρνουά Ευρώπης',
        teams: [
            ...['PAOK', 'ARIS', 'AEK', 'PROMITHEAS', 'OLYMPIACOS', 'PANATHINAIKOS', 'LARISA', 'MAROUSI', 'LAVRIO', 'APOLLON P.', 'KOLOSSOS RODOU',
                'PERISTERI'].map((item, i) => (
                    {
                        games: [...new Array(10).fill(1).map(item => getRandomGame())],
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
                                points: points,
                                games: team.games.map((game, i) => {
                                    const gameWon = game.quarter.reduce((p, c, i) => p + c.quarter_score, 0) > game.quarter.reduce((p, c, i) => p + c.quarter_score_against, 0);
                                    return {
                                        ...game,
                                        win: gameWon
                                    }
                                })
                            }
                        )
                    })
        ]
    }
    return (
        <section className="flex w-full h-full flex-1 justify-between flex-col pc:flex-row gap-y-10">
            <ul className="flex basis-[66%] laptop:basis-[100%] flex-col *:px-4 *:py-2 *:items-center group [&>*:nth-child(even)]:bg-slate-100">
                <li className="flex justify-between border-b-[1px] pt-0 mb-4 font-medium text-slate-500 border-b-slate-300 pb-2">
                    <div className="flex gap-x-4">
                        <p className="w-6 flex justify-center">#</p>
                        <p>Ομάδα</p>
                    </div>
                    <div className="flex w-[40%] min-w-[300px] *:truncate wireless:min-w-[150px]">
                        <ul className="w-[75%] flex *:truncate *:w-[25%] *:text-center *:font-semibold">
                            <p>Α</p>
                            <p className="text-green-700">Ν</p>
                            <p className="text-red-700">Ή</p>
                            <p>Β</p>
                        </ul>
                        <p className="text-center w-[25%]">Σερί</p>
                    </div>

                </li>
                {
                    standings.teams.sort((a, b) => b.points - a.points).map((team, i) => {
                        return (
                            <li key={i} className="flex justify-between duration-[50ms] transition-[transform] cursor-pointer hover:scale-[1.01] hover:shadow-[0px_4px_8px_0px_rgba(0,0,0,0.2)] last:pb-4 last:border-b-[1px] last:border-b-slate-300">
                                <div className="flex gap-x-4 items-center">
                                    <div className={`size-6 shrink-0 rounded-md flex items-center justify-center ${i >= 6 ? 'bg-sec' : 'bg-amber-500'} text-white`}>
                                        <p>{i + 1}</p>
                                    </div>
                                    <img src={team.logo_path} className="size-8" style={{ objectFit: 'contain' }} />
                                    <p className="-ml-2">{team.team_name}</p>
                                </div>
                                <div className="flex w-[40%] min-w-[300px] wireless:min-w-[150px]">
                                    <ul className="flex w-[75%] *:w-[25%] *:text-center">
                                        <p>{team.totalGames}</p>
                                        <p>{team.gamesWon}</p>
                                        <p>{team.gamesLost}</p>
                                        <p>{team.points}</p>
                                    </ul>
                                    <ul className="flex w-[25%]  group [&>*:nth-child(n+4)]:wireless:hidden [&>*:nth-child(n+3)]:wireless:rounded-r">
                                        {team.games.slice(0, 5).map((item, index) => {
                                            return (
                                                <li key={index} className={`text-white font-wotfard-md px-1 first:rounded-l last:rounded-r 
                                                ${item.win ? 'bg-green-600' : 'bg-red-600'}`}>
                                                    {item.win ? 'N' : 'H'}
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>

                            </li>
                        )
                    })
                }
            </ul>
            <section className="h-full basis-[30%] flex flex-col gap-y-5">
                <div className="flex justify-center items-center gap-x-2 mt-2">
                    <div className="size-4 bg-yellow-400 rounded-full"></div>
                    <p className="font-medium">Ανερχόμενα παιχνίδια</p>
                    <div className="size-4 bg-yellow-400 rounded-full"></div>
                </div>
                <ul className="justify-center grid pc:grid-cols-1 mobile:grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-4">
                    <UpcomingMatch away_team={{ logo_path: '/paok.png', team_id: '1', team_name: 'Olympiacos' }}
                        home_team={{ logo_path: '/paok.png', team_id: '2', team_name: 'Paok' }} date="7/1/2024 - 18:08" round={11} tournament_name="Τουρνουά Ευρώπης"
                    />
                    <UpcomingMatch away_team={{ logo_path: '/paok.png', team_id: '1', team_name: 'Olympiacos' }}
                        home_team={{ logo_path: '/paok.png', team_id: '2', team_name: 'Paok' }} date="7/1/2024 - 18:08" round={11} tournament_name="Τουρνουά Ευρώπης"
                    />
                    <UpcomingMatch away_team={{ logo_path: '/paok.png', team_id: '1', team_name: 'Olympiacos' }}
                        home_team={{ logo_path: '/paok.png', team_id: '2', team_name: 'Paok' }} date="7/1/2024 - 18:08" round={11} tournament_name="Τουρνουά Ευρώπης"
                    />
                    <UpcomingMatch away_team={{ logo_path: '/paok.png', team_id: '1', team_name: 'Olympiacos' }}
                        home_team={{ logo_path: '/paok.png', team_id: '2', team_name: 'Paok' }} date="7/1/2024 - 18:08" round={11} tournament_name="Τουρνουά Ευρώπης"
                    />


                </ul>
            </section>
        </section>
    )
}