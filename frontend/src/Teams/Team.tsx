import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Team as TeamProps } from "./index";
export default function Team() {
    const { teamid } = useParams();
    const [team, setTeam] = useState<TeamProps>()
    const [leagues, setLeagues] = useState<{ name: string, id: number }[]>([])
    useEffect(() => {
        (async () => {
            let vTeam: TeamProps = {} as TeamProps;
            const teamResponse = await fetch(`http://localhost:3309/api/teams/${teamid}`)
            const teamData = await teamResponse.json();
            vTeam = { ...teamData, logoPath: teamData.logoPath ?? '/paok.png' };
            const playersResponse = await fetch(`http://localhost:3309/api/players/team/${teamid}`)
            const playersData = await playersResponse.json();
            vTeam = { ...vTeam, players: [...playersData], cityName: teamData.city.cityName };
            setTeam(vTeam);
            const championshipsRes = await fetch(`http://localhost:3309/api/championships/team/${teamid}`)
            const championshipsData = await championshipsRes.json();
            setLeagues(championshipsData)

        })()
    }, [teamid])
    if (!team) return null;
    return (
        <section className="flex justify-center gap-x-5 py-20 px-10 wireless:gap-y-10 wireless:flex-col-reverse">
            <div className="basis-[120%] flex flex-col items-center gap-y-5">
                <p className="text-xl w-full font-semibold border-b-gray-300 border-b-[1px] pb-2">Ρόστερ ομάδας</p>
                <ul className="flex flex-wrap gap-5">
                    {
                        team.players.map((player, i) => {
                            return (
                                <li key={player.id}
                                    className="flex justify-between flex-grow outline outline-1 hover:shadow-box cursor-pointer shadow-box-sm hover:outline-slate-300 hover:scale-[1.02] transition-[transform,shadow]
                                 outline-slate-200 rounded items-center px-2 gap-x-2">
                                    <img src={(player.logoPath && player.logoPath.length > 0) ? player.logoPath : '/messi.png'} alt="" className="size-12 object-cover rounded-full" />
                                    <div className="flex gap-x-4 items-center pr-2 w-full">
                                        <div className="flex flex-col gap-y-1 py-2">
                                            <div className="flex gap-x-1 *:first-letter:uppercase font-semibold">
                                                <p>{player.firstName}</p>
                                                <p>{player.lastName}</p>
                                            </div>
                                            <div className="flex gap-x-1 text-sm text-gray-600">
                                                <p className="first-letter:uppercase">{player.nationality}</p>
                                                <p>|</p>
                                                <p className="lowercase first-letter:uppercase">{player.positionType.replaceAll("_", " ")}</p>
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-600">{(player.height / 100).toFixed(2)}m</p>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
                <div className="w-full flex flex-col gap-y-5 py-5">
                    <p className="text-xl w-full font-semibold border-b-gray-300 border-b-[1px] pb-2">Συμμετοχές</p>
                    <ul className="flex flex-wrap gap-2">
                        {
                            leagues.slice(0, 12).map(league => {
                                return (
                                    <Link key={league.id} to={`/tournaments/${league.id}/`}>
                                        <li
                                            className="flex justify-between px-2 py-2 rounded outline-gray-300 flex-grow outline outline-1 hover:outline-gray-400 cursor-pointer ">
                                            <div className="flex flex-col gap-y-1 py-2">
                                                <div className="flex gap-x-1 *:first-letter:uppercase font-semibold">
                                                    <p>{league.name}</p>
                                                </div>
                                            </div>
                                        </li>
                                    </Link>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
            <div className="basis-[50%] flex items-center flex-col gap-y-4">
                <img src={team.logoPath} alt="" className="w-40 h-40 object-contain" />
                <p className="first-letter:uppercase text-2xl font-semibold">{team.teamName} {team.cityName}</p>
                <div className="text-center flex flex-col gap-y-2 *:first-letter:uppercase">
                    <div className="mb-2">Στάδιο: <p className="first-letter:uppercase font-semibold text-lg">{team.stadiumName}</p></div>
                    <div className="mb-2">Μάνατζερ: <p className="first-letter:uppercase font-semibold text-lg">{team.coachName}</p></div>
                    <div>Ρόστερ: <p className="font-semibold text-lg">{team.players.length}</p></div>
                    <div>Συμμετοχές: <p className="font-semibold text-lg">{leagues.length}</p></div>
                </div>
            </div>
        </section>
    )
}