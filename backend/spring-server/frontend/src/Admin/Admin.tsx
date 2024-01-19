import { FC, Fragment, useEffect, useState } from 'react'
import Players from './Players'
import { useUser } from '../Layout/Wrapper'
import { Navigate } from 'react-router-dom'
import { AddIcon } from '../icons'
import Teams from './Teams'
import Leagues from './Leagues'
import { SimpleDropdown } from '@tryferos/dropdown'
import { ShortTeam } from '../Popup/Players'
import { Player } from '../Teams';

export type AdminLeague = {
    name: string;
    id: number;
    totalTeams: number;
    totalPlayers: number;
}

export type AdminTeam = {
    totalPlayers: number;
    logoPath: string;
} & ShortTeam

const Admin: FC = (props) => {
    const { user } = useUser();
    const [leagues, setLeagues] = useState<AdminLeague[]>([]);
    const [teams, setTeams] = useState<AdminTeam[]>([]);
    const [players, setPlayers] = useState<Player[]>([]);
    useEffect(() => {

        if (leagues.length > 0) return;

        (async () => {
            const res = await fetch(`${process.env.NODE_ENV == 'development' ? 'http://localhost:3309' : ''}/api/championships/`)
            const champData = await res.json() as AdminLeague[];
            const lengthedChampData = await Promise.all(
                champData.map(async vChampionship => {
                    const teamResponse = await fetch(`${process.env.NODE_ENV == 'development' ? 'http://localhost:3309' : ''}/api/teams/championship/${vChampionship.id}`)
                    const teamData = await teamResponse.json() as AdminTeam[];

                    const lengthedTeamData = await Promise.all
                        (
                            teamData.map(async vTeam => {
                                const playersResponse = await fetch(`${process.env.NODE_ENV == 'development' ? 'http://localhost:3309' : ''}/api/players/team/${vTeam.id}`)
                                const playersData = await playersResponse.json();

                                setPlayers(prev => [...prev, ...playersData.filter(v => !prev.map(p => p.id).includes(v.id))]);
                                Object.defineProperty(vTeam, 'totalPlayers', { value: playersData.length });
                                return vTeam;

                            }))
                    setTeams(prev => [...prev, ...lengthedTeamData.filter(v => !prev.map(p => p.id).includes(v.id))]);
                    const champTotalPlayers = lengthedTeamData.reduce((acc, curr) => acc + curr.totalPlayers, 0);
                    Object.defineProperty(vChampionship, 'totalTeams', { value: champData.length });
                    Object.defineProperty(vChampionship, 'totalPlayers', { value: champTotalPlayers });
                    return vChampionship;
                })
            )
            setLeagues(lengthedChampData);
        })()

    }, [])

    if (!user) {
        Navigate({ to: '/' })
        return null;
    }
    return (
        <main className='w-full min-h-[150vh] flex flex-col gap-y-10 pt-10 items-center mb-40'>
            <Players players={players} />
            <Teams teams={teams} />
            <Leagues leagues={leagues} />
        </main>
    )
}

export default Admin

type ItemHeaderProps = {
    length: number;
    title: string;
    btnText: string;
    backgroundImageClass: string;
    onClick: () => void;
}

export function ItemHeader(props: ItemHeaderProps) {
    return (
        <div className='w-full h-[100px] relative flex px-[calc(3%+6px)] items-center justify-between'>
            <div className={`absolute rounded-md z-[100] left-[0.5%] top-[1%] h-[98%] w-[99%] ${props.backgroundImageClass} bg-fixed bg-center blur-[2px] brightness-[0.45]`}></div>
            <div className={`absolute rounded-md z-[90] left-0 top-0 size-full ${props.backgroundImageClass} bg-center brightness-50`}></div>
            <p className='font-medium z-[100] text-white text-lg text-center'>{props.title} ({props.length})</p>
            <div onClick={props.onClick}
                className='items-center z-[100] gap-x-2 font-medium flex outline outline-1 outline-green-400 px-4 py-2 rounded text-green-400 hover:bg-green-500 hover:text-white cursor-pointer'>
                <p>{props.btnText}</p>
                <AddIcon />
            </div>
        </div>
    )
}