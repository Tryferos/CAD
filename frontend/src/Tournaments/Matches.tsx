import React from "react";
import { StandingsTeam } from "./Standings";

export default function Matches() {
    return (
        <div>Matches</div>
    )
}

type MatchTeam = Pick<StandingsTeam, 'team_id' | 'team_name' | 'logo_path'>

type Match = {
    home_team: MatchTeam,
    away_team: MatchTeam,
    round: number;
    tournament_name: string;
    date: string;
}

export function UpcomingMatch(match: Match) {
    return (
        <li className="h-[150px] items-center flex flex-1 bg-slate-100 -z-50 outline outline-1 outline-slate-200 px-0 py-8 relative rounded-md">
            <p className="absolute text-xs left-[calc(50%-50px)] w-[100px] bottom-2">{match.date}</p>
            <p className="absolute text-xs left-[calc(50%-25px)] w-[50px] top-2">Γύρος {match.round}</p>
            <div className="basis-[50%] h-full flex items-center justify-center flex-col">
                <img src={match.home_team.logo_path} style={{ objectFit: 'contain' }} className="size-10" />
                <p>{match.home_team.team_name}</p>
            </div>
            <p>VS</p>
            <div className="basis-[50%] h-full flex items-center justify-center flex-col">
                <img src={match.away_team.logo_path} style={{ objectFit: 'contain' }} className="size-10" />
                <p>{match.away_team.team_name}</p>
            </div>

        </li>
    )

}