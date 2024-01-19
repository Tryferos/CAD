import React, { useEffect, useMemo, useState } from "react";
import { StandingsTeam } from "./Standings";
import { PopupType, usePopup, useUser } from "../Layout/Wrapper";
import { EditIcon } from "../icons";
import { useParams } from "react-router-dom";
import Team from "../Popup/Team";

export type Match = {
    homeTeam: MatchTeam,
    awayTeam: MatchTeam,
    round: number;
    round_id: string;
    id: string;
    tournamentName: string;
    matchDate: string;
}

export default function Matches() {
    const { user, authRequest } = useUser()
    const { tourid } = useParams();
    const [hasDrawn, setHasDrawn] = useState(false);
    const [matches, setMatches] = useState<Match[]>([])
    const [rounds, setRounds] = useState<number>(0);
    useEffect(() => {
        if (matches.length > 0 || !tourid) return;
        (async () => {
            await fetchData();
        })()
    }, [])
    const handleDraw = () => {
        (async () => {
            const res = await fetch(`${process.env.NODE_ENV == 'development' ? `http://localhost:${process.env.REACT_APP_SERVER_PORT}` : ''}/api/championships/createDraw/${tourid}?date=${formatDate()}`, authRequest('POST'))
            const draw = await res.text();
            setHasDrawn(res.ok);
            if (res.ok) {
                await fetchData();
            }
        })()
    }
    async function fetchData() {
        const res = await fetch(`${process.env.NODE_ENV == 'development' ? `http://localhost:${process.env.REACT_APP_SERVER_PORT}` : ''}/api/teams/championship/${tourid}`)
        const teams = await res.json();
        setRounds(teams.length - 1);
        for (let i = 0; i < teams.length - 1; i++) {
            const res2 = await fetch(`${process.env.NODE_ENV == 'development' ? `http://localhost:${process.env.REACT_APP_SERVER_PORT}` : ''}/api/games/games?roundId=${i}&championshipId=${tourid}`)
            const data = await res2.json();

            if (i == 0) {
                setHasDrawn(res2.ok);
                if (!res2.ok) return;
            }

            const games: Match[] = data.map(item => ({ ...item, round: i, matchDate: formatDateHour(new Date(item.matchDate)), round_id: `${i}`, id: item.id.id }))

            let filteredGames: Match[] = []
            for (let i = 0; i < games.length; i++) {
                const game = games[i];
                if (filteredGames.some(item => item.homeTeam.id == game.awayTeam.id && item.awayTeam.id == game.homeTeam.id)) continue;
                filteredGames.push(game);
            }
            //TODO: FETCH ALL GAMES BY ROUND ID AND CHAMPIONSHIP ID
            setMatches(prev => [...prev, ...filteredGames])
        }
    }
    function formatDate(vDate?: Date) {
        const date = vDate ?? new Date();
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${year}-${month.toString().padStart(2, "0")}-${day}`
    }
    return (
        <section>
            <div className="mt-10 flex flex-col items-center gap-y-5">
                {
                    (user && !hasDrawn &&
                        <input className="px-4 py-2 min-w-[170px] w-[20%] hover:bg-sec hover:text-white outline outline-1 outline-sec text-sec shadow-sec hover:shadow-shadowSecHover cursor-pointer rounded-md"
                            onClick={handleDraw} type='button' value='Έναρξη κλήρωσης' />)
                }
                {
                    !hasDrawn && <p className="text-center text-xl">Δεν έχει γίνει κλήρωση για αυτό το τουρνουά</p>
                }
            </div>
            <ul>
                {hasDrawn &&
                    new Array(rounds).fill(1).map((item, i) => <RoundMatches tourid={parseInt(tourid)} key={i} round={i + 1} matches={matches.filter(item => item.round == i)} />)
                }
            </ul>
        </section>
    )
}
export function formatDateHour(vDate?: Date) {
    const date = vDate ?? new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hour = date.getHours().toString().padStart(2, "0");
    const minute = date.getMinutes().toString().padStart(2, "0");
    return `${day.toString().padStart(2, "0")}-${month.toString().padStart(2, "0")}-${year} ${hour}:${minute}`
}

function RoundMatches({ round, matches, tourid }: { round: number, matches: Match[]; tourid: number }) {
    return (
        <li className="flex flex-col gap-y-2">
            <p className="wireless:text-center mb-4 pl-6">Γύρος {round}</p>
            <ul className="flex flex-wrap gap-5 pb-10 pt-2 items-center justify-around">
                {
                    matches.sort((a, b) => new Date(b.matchDate).getMilliseconds() - new Date(a.matchDate).getMilliseconds())
                        .map((item, i) => <UpcomingMatch upcoming={false} key={i} match={{ ...item, round: round }} className={"w-[45%]"} tourid={tourid} />)
                }
            </ul>
        </li>
    )
}

type MatchTeam = Pick<StandingsTeam, 'id' | 'teamName' | 'logoPath'>
type Score = {
    home: number;
    away: number;
}
export function UpcomingMatch({ match, className, tourid, upcoming }: { match: Match; className?: string; tourid: number; upcoming: boolean }) {
    const { user } = useUser()
    const { handlePopup } = usePopup();
    const [score, setScore] = useState<Score>({ home: 0, away: 0 })
    useEffect(() => {

        (async () => {

            await fetchQuartersTeam(match.homeTeam, 'home')
            await fetchQuartersTeam(match.awayTeam, 'away')

        })()

    }, [])

    async function fetchQuartersTeam(team: MatchTeam, type: 'home' | 'away') {

        for (let i = 0; i < 5; i++) {
            try {
                const quarterType = i == 0 ? 'FIRST' : i == 1 ? 'SECOND' : i == 2 ? 'THIRD' : i == 3 ? 'FOURTH' : 'OVERTIME'
                const quarterRes = await fetch(
                    `${process.env.NODE_ENV == 'development' ? `http://localhost:${process.env.REACT_APP_SERVER_PORT}` : ''}/api/teamScorePerQuarters/teamScorePerQuarter?quarter=${quarterType}&gameId=${match.id}&roundId=${match.round_id}&championshipId=${tourid}&teamId=${team.id}`)
                if (!quarterRes.ok) continue;
                const quarter = await quarterRes.json();

                setScore(prev => ({ ...prev, [type]: prev[type] + quarter.quarter_score }))
            } catch (err) {

            }
        }
    }
    const havePlayed = useMemo(() => {
        return score.away != 0 || score.home != 0
    }, [score])
    return (
        <li className={`h-[200px] min-w-[300px] hover:shadow-box hover:scale-[1.02] transition-[transform,shadow] items-center flex bg-slate-100 cursor-pointer outline outline-1 outline-slate-200 px-0 py-8 relative rounded-md ${className}`}>
            <p className="absolute text-xs left-[calc(50%-50px)] w-[100px] bottom-2 text-center">{match.matchDate}</p>
            <p className="absolute text-xs left-[calc(50%-25px)] w-[50px] top-2">Γύρος {parseInt(match.round_id) + 1}</p>
            <div className="basis-[50%] h-full flex items-center justify-center gap-x-10">
                <div className="flex flex-col items-center">
                    <img src={(!match.homeTeam.logoPath || match.homeTeam.logoPath.length == 0) ? '/paok.png' : match.homeTeam.logoPath}
                        style={{ objectFit: 'contain' }} className="size-10" />
                    <p className="first-letter:uppercase text-lg text-gray-600">{match.homeTeam.teamName}</p>
                </div>
                <p className="-mt-4 text-2xl font-semibold">{havePlayed && score.home}</p>
            </div>
            <p>{!havePlayed ? 'VS' : '-'}</p>
            <div className="basis-[50%] h-full flex items-center justify-center gap-x-10">
                <p className="-mt-4 text-2xl font-semibold">{havePlayed && score.away}</p>
                <div className="flex flex-col items-center">
                    <img src={(!match.awayTeam.logoPath || match.awayTeam.logoPath.length == 0) ? '/paok.png' : match.awayTeam.logoPath} style={{ objectFit: 'contain' }} className="size-10" />
                    <p className="first-letter:uppercase text-lg text-gray-600">{match.awayTeam.teamName}</p>
                </div>
            </div>
            {
                (user && !upcoming &&
                    <div
                        onClick={() => handlePopup(PopupType.score, `${match.homeTeam.teamName} εναντίον ${match.awayTeam.teamName}, Γύρος ${match.round_id}`,
                            { match: match, tourid: tourid })}
                        title='Επεξεργασία σκορ αγώνα' className="absolute top-2 flex items-center justify-center right-2 cursor-pointer rounded-full size-6 hover:bg-slate-300 z-[200]">
                        <EditIcon />
                    </div>
                )
            }

        </li>
    )

}