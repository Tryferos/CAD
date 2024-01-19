import React, { useEffect, useState } from "react";
import { Match, UpcomingMatch, formatDateHour } from "./Matches";
import { Team } from "../Teams";
import { useParams } from "react-router-dom";

type Standings = {
    teams: Array<StandingsTeam>;
    name: string;
}

export type StandingsTeam = {
    id: string;
    teamName: string;
    logoPath: string;
    games: Array<Game>
    gamesWon?: number;
    gamesLost?: number;
    totalGames?: number;
    points?: number;
}

export type Game = {
    game_id: string;
    quarter: Array<Quarter>
    win?: boolean;
    gamePlayed?: boolean;
}

export type Quarter = {
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
    const [standings, setStandings] = useState<Standings>({ name: '', teams: [] });
    const { tourid } = useParams();
    useEffect(() => {
        (async () => {
            process.env.NODE_ENV == 'development' && console.log('fetching teams');
            const res = await fetch(`${process.env.NODE_ENV == 'development' ? `http://localhost:${process.env.REACT_APP_SERVER_PORT}` : ''}/api/teams/championship/${tourid}`)
            const teamsData = await res.json();
            const teams: StandingsTeam[] = await Promise.all(
                teamsData.map(async (item: Team, i) => {
                    //* FOR EVERY TEAM
                    let games: Game[] = [];
                    for (let i = 0; i < (teamsData.length - 1); i++) {
                        //* FOR EVERY ROUND
                        const res2 = await fetch(`${process.env.NODE_ENV == 'development' ? `http://localhost:${process.env.REACT_APP_SERVER_PORT}` : ''}/api/games/games?roundId=${i}&championshipId=${tourid}`)
                        const data = await res2.json();
                        if (!data || data.length == 0 || res2.status > 399) continue;
                        const isTeamRound = data.some(vitem => vitem.awayTeam.id == item.id || vitem.homeTeam.id == item.id);
                        if (!isTeamRound) continue;
                        for (let j = 0; j < data.length; j++) {
                            //* FOR EVERY GAME
                            const element = data[j];
                            const opponentId = element.homeTeam.id == item.id ? element.awayTeam.id : element.homeTeam.id;
                            let quarters: Quarter[] = [];
                            for (let q = 0; q < 5; q++) {
                                const quarterType = q == 0 ? 'FIRST' : q == 1 ? 'SECOND' : q == 2 ? 'THIRD' : q == 3 ? 'FOURTH' : 'OVERTIME';
                                const quarterRes = await fetch(
                                    `${process.env.NODE_ENV == 'development' ? `http://localhost:${process.env.REACT_APP_SERVER_PORT}` : ''}/api/teamScorePerQuarters/teamScorePerQuarter?quarter=${quarterType}&gameId=${element.id.id}&roundId=${i}&championshipId=${tourid}&teamId=${item.id}`)
                                const quarterResAgainst = await fetch(
                                    `${process.env.NODE_ENV == 'development' ? `http://localhost:${process.env.REACT_APP_SERVER_PORT}` : ''}/api/teamScorePerQuarters/teamScorePerQuarter?quarter=${quarterType}&gameId=${element.id.id}&roundId=${i}&championshipId=${tourid}&teamId=${opponentId}`)
                                const quarterData = await quarterRes.json();
                                const quarterDataAgainst = await quarterResAgainst.json();
                                if (quarterRes.status > 399 || quarterResAgainst.status > 399) continue;
                                quarters.push({
                                    quarter: q + 1,
                                    quarter_score: quarterData.quarter_score,
                                    quarter_score_against: quarterDataAgainst.quarter_score
                                })

                            }
                            games = [...games, { game_id: element.id.id, quarter: quarters }];
                        }
                    }
                    return {
                        ...item,
                        games: [...games],
                        id: item.id,
                    }
                })
            )
            setStandings({
                name: '',
                teams: mapStandings(teams).teams
            })
        })()
    }, [tourid])
    function filterGamesPlayed(team: StandingsTeam) {

        const games = team.games.filter(item => {
            const gamePlayed = item.quarter.reduce((p, c, i) => p + c.quarter_score, 0) > 0 || item.quarter.reduce((p, c, i) => p + c.quarter_score_against, 0) > 0
            return gamePlayed
        })

        return {
            ...team,
            games: games
        }

    }
    function mapStandings(teams: StandingsTeam[]) {
        return {
            teams: teams.map((team, i) => {
                const gamesWon = filterGamesPlayed(team).games.filter((game, i) => {
                    return game.quarter.reduce((p, c, i) => p + c.quarter_score, 0) > game.quarter.reduce((p, c, i) => p + c.quarter_score_against, 0)
                }).length;
                const totalGames = filterGamesPlayed(team).games.filter(item => item).length;
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
                                win: gameWon,
                                gamePlayed: game.quarter.reduce((p, c, i) => p + c.quarter_score, 0) > 0 || game.quarter.reduce((p, c, i) => p + c.quarter_score_against, 0) > 0,
                            }
                        })
                    }
                )
            })
        }
    }
    return (
        <section className="flex w-full min-h-[40vh] flex-1 justify-between flex-col pc:flex-row gap-y-10">
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
                    standings.teams.length > 0 && standings.teams.sort((a, b) => b.points - a.points).map((team, i) => {
                        return (
                            <li key={i} className="flex justify-between duration-[50ms] transition-[transform] cursor-pointer hover:scale-[1.01] hover:shadow-[0px_4px_8px_0px_rgba(0,0,0,0.2)] last:pb-4 last:border-b-[1px] last:border-b-slate-300">
                                <div className="flex gap-x-4 items-center">
                                    <div className={`size-6 shrink-0 rounded-md flex items-center justify-center ${i >= 6 ? 'bg-sec' : 'bg-amber-500'} text-white`}>
                                        <p>{i + 1}</p>
                                    </div>
                                    <img src={(!team.logoPath || team.logoPath.length == 0) ? '/paok.png' : team.logoPath} className="size-8" style={{ objectFit: 'contain' }} />
                                    <p className="-ml-2 first-letter:uppercase">{team.teamName}</p>
                                </div>
                                <div className="flex w-[40%] min-w-[300px] wireless:min-w-[150px]">
                                    <ul className="flex w-[75%] *:w-[25%] *:text-center">
                                        <p>{team.totalGames}</p>
                                        <p>{team.gamesWon}</p>
                                        <p>{team.gamesLost}</p>
                                        <p>{team.points}</p>
                                    </ul>
                                    <ul className="flex w-[25%]  group [&>*:nth-child(n+4)]:wireless:hidden [&>*:nth-child(n+3)]:wireless:rounded-r">
                                        {team.games.filter(item => item.gamePlayed != false).slice(0, 5).map((item, index) => {
                                            return (
                                                <li key={index} className={`text-white font-wotfard-md text-center w-5 first:rounded-l last:rounded-r 
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
            <UpcomingMatches tourid={tourid} />
        </section>
    )
}

function UpcomingMatches({ tourid }: { tourid: string }) {
    const [matches, setMatches] = useState<Match[]>([])
    useEffect(() => {
        (async () => {

            const res = await fetch(`${process.env.NODE_ENV == 'development' ? `http://localhost:${process.env.REACT_APP_SERVER_PORT}` : ''}/api/teams/championship/${tourid}`)
            const teams = await res.json();

            for (let i = 0; i < Math.min(teams.length - 1, 3); i++) {
                const res2 = await fetch(`${process.env.NODE_ENV == 'development' ? `http://localhost:${process.env.REACT_APP_SERVER_PORT}` : ''}/api/games/games?roundId=${i}&championshipId=${tourid}`)
                const data = await res2.json();
                if (!res2.ok) continue;
                setMatches(prev => [...prev, ...data])
            }
        })()
    }, [])
    return (
        <div className="basis-[30%] flex flex-col gap-y-5">
            <div className="flex justify-center items-center gap-x-2 mt-2">
                <div className="size-4 bg-yellow-400 rounded-full"></div>
                <p className="font-medium">Ανερχόμενα παιχνίδια</p>
                <div className="size-4 bg-yellow-400 rounded-full"></div>
            </div>
            <ul className="justify-center grid pc:grid-cols-1 mobile:grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-4">
                {
                    matches.slice(0, 3).map((item, i) => {
                        return (
                            <UpcomingMatch key={item.id + "-" + i} match={{ ...item, round_id: (item.id as any).round.id.id }} tourid={parseInt(tourid)} />
                        )
                    })
                }
            </ul>
        </div>
    )
}