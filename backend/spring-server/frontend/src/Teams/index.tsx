import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { Game, Quarter, StandingsTeam, calculateGame, getRandomGame } from "../Tournaments/Standings";

export type Team = {
    stadiumName: string;
    shortName: string;
    coachName: string;
    cityName: string;
    players: Array<Player>;
} & StandingsTeam

export type Player = {
    id: string;
    firstName: string;
    lastName: string;
    height: number;
    nationality: string;
    positionType: Position;
    logoPath: string;
}

type CitySection = {
    cityName: string;
    teams: Array<Team>;
}
export enum Position {
    PG = 'POINT_GUARD',
    SG = 'SHOOTING_GUARD',
    SF = 'SMALL_FORWARD',
    PF = 'POWER_FORWARD',
    C = 'CENTER'
}


export default function TeamsIndex() {
    const { tourid } = useParams();
    const [teams, setTeams] = useState<Team[]>([])
    useEffect(() => {

        (async () => {

            const res = await fetch(`/api/teams/championship/${tourid}`)
            const data = await res.json();
            const teamsData = data.map((team) => ({ ...team, logoPath: team.logoPath ?? '/paok.png', players: [] }));
            const newTeams = await Promise.all(
                teamsData.map(async (team) => {
                    const res2 = await fetch(`/api/players/team/${team.id}`)
                    const data2 = await res2.json();

                    const item = team;
                    //* FOR EVERY TEAM
                    let games: Game[] = [];
                    for (let i = 0; i < (teamsData.length - 1); i++) {
                        //* FOR EVERY ROUND
                        const res2 = await fetch(`/api/games/games?roundId=${i}&championshipId=${tourid}`)
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
                                    `/api/teamScorePerQuarters/teamScorePerQuarter?quarter=${quarterType}&gameId=${element.id.id}&roundId=${i}&championshipId=${tourid}&teamId=${item.id}`)
                                const quarterResAgainst = await fetch(
                                    `/api/teamScorePerQuarters/teamScorePerQuarter?quarter=${quarterType}&gameId=${element.id.id}&roundId=${i}&championshipId=${tourid}&teamId=${opponentId}`)
                                const quarterData = await quarterRes.json();
                                const quarterDataAgainst = await quarterResAgainst.json();
                                if (quarterRes.status > 399 || quarterResAgainst.status > 399) continue;
                                quarters.push({
                                    quarter: q + 1,
                                    quarter_score: quarterData.quarter_score,
                                    quarter_score_against: quarterDataAgainst.quarter_score
                                })

                            }

                            if (games.some(g => g.game_id == data[j].id)) continue;
                            games = [...games, { game_id: element.id.id, quarter: quarters }];
                        }
                    }
                    const tm = {
                        ...item,
                        games: [...games],
                        id: team.id,
                        logoPath: '/paok.png',
                    }
                    if (item.teamName == 'paok') {

                    }
                    const calc = calculateGame({
                        ...item,
                        games: [...games],
                        id: team.id,
                        logoPath: '/paok.png',
                    });

                    return {
                        ...calc,
                        ...tm,
                        players: data2
                    }
                })
            )

            setTeams(newTeams);
        })()
    }, [])
    return (
        <section className="w-full h-full py-5">
            <ul className="flex flex-wrap w-full gap-2 relative justify-center">
                {
                    teams.map((team, i) => {
                        return (
                            <li key={i} className="relative min-w-[400px] min-h-[400px] rounded-md">
                                <div className="w-full h-[50%] max-h-[400px] min-h-[400px] bg-white relative rounded-md">
                                    <div className="size-[98%] brightness-50 z-[150] absolute top-[1%] left-[1%] bg-basketball bg-cover bg-no-repeat blur-[2px] bg-center rounded-md"></div>
                                    <div className="w-full z-[100] h-full absolute top-0 left-0 bg-basketball bg-cover bg-no-repeat blur-[0px] bg-center rounded-md"></div>
                                    <img src={team.logoPath} className="w-[200px] scale-[0.8] z-[200] h-[200px] absolute top-[calc(50%-175px)] left-[calc(50%-100px)] object-contain" />
                                    <div className="flex flex-col w-full items-center top-[60%] absolute text-white font-semibold gap-y-1 z-[200]">
                                        <p className="text-xl">{team.teamName}</p>
                                        <p className="text-lg text-gray-200">{team.coachName.length > 0 ? team.coachName : 'Δεν υπάρχει προπονητής'}</p>
                                    </div>
                                    <div className="h-[20%] absolute -bottom-[2px] bg-opacity-90 w-full bg-slate-700 *:w-[25%] flex justify-evenly items-center *:-mt-2 z-[200]">
                                        {
                                            [
                                                ['Αγώνες', team.totalGames ?? 0],
                                                ['Νίκες', team.gamesWon ?? 0],
                                                ['Ήττες', team.gamesLost ?? 0],
                                                ['Πόντοι', team.points ?? 0]
                                            ].map((item, i) => (
                                                <div key={i}>
                                                    <p className="font-semibold text-center text-xl text-sec">{item[1]}</p>
                                                    <p className="text-slate-400 text-center">{item[0]}</p>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                                <ul className="w-full flex flex-col bg-slate-800 rounded-b-md">
                                    {
                                        team.players.slice(0, 6).map((player, index) => (
                                            <li key={index} className="w-full last:rounded-b-md flex items-center justify-between p-2 border-b-[1px] border-b-slate-300">
                                                <div className="flex items-center gap-x-2">
                                                    <img src={player.logoPath ?? '/lebron.jpg'} className="size-14 object-contain" />
                                                    <div className="text-slate-200 flex flex-col">
                                                        <p className="text-sec text-base truncate">{player.firstName} {player.lastName}</p>
                                                        <div className="flex gap-x-4 text-sm text-slate-300">
                                                            <p>{player.nationality}</p>
                                                            <p className="-ml-2 -mr-2 text-slate-400">|</p>
                                                            <p>{(player.height / 100).toFixed(2)}m ύψος</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="text-slate-400 text-sm">{player.positionType}</p>
                                            </li>
                                        ))
                                    }

                                </ul>

                            </li>
                        )
                    })

                }
            </ul>
        </section>
    )
}