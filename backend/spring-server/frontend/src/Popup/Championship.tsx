import React, { FC, Fragment, ReactNode, useEffect, useMemo, useState } from 'react'
import { Field, FormField, SubmitBtn } from './FormElements'
import { ShortTeam } from './Players';
import Team from './Team';
import { SearchIcon } from '../icons';
import { toast } from 'react-toastify';
import { usePopup, useUser } from '../Layout/Wrapper';

type Championship = {
    name: string;
    teams: Array<LogoTeam>;
}

type LogoTeam = {
    logoPath: string;
} & ShortTeam;


const Championship: FC = (props) => {
    const [championship, setChampionship] = useState<Championship>({ name: '', teams: [] })
    const [teams, setTeams] = useState<LogoTeam[]>([]);
    const [query, setQuery] = useState('')
    const { handlePopup } = usePopup();
    const { authRequest } = useUser();
    useEffect(() => {
        (async () => {
            const res = await fetch('/api/teams/')
            const data = await res.json();

            setTeams(data.map(item => ({ ...item, logoPath: '/paok.png' })));
        })()
    }, [])
    const onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
        const length = championship.teams.length;
        if (length < 4) {
            toast.error('Παρακαλώ επιλέξτε τουλάχιστον 4 ομάδες');
            return;
        }
        if (length % 2 != 0) {
            toast.error('Παρακαλώ επιλέξτε ζυγό αριθμό ομάδων');
            return;
        }
        //TODO: API CALL
        (async () => {
            const promise = new Promise(async (resolve, reject) => {
                const champ = {
                    "championship": { name: championship.name },
                    "teams": [...championship.teams.map(item => ({ id: item.id }))]
                }
                try {
                    const res = await fetch('/api/championships/championshipswithparticipations/add', authRequest('POST',
                        champ
                    ));
                    if (!res.ok) reject((await res.json()).message)
                    resolve(null);
                    handlePopup(null);
                    return;
                } catch (err) {
                    reject(err);
                }
            })
            toast.promise(promise, {
                success: 'Το τουρνουά δημιουργήθηκε επιτυχώς',
                error: { render: (err) => err.data as ReactNode },
                pending: 'Δημιουργία τουρνουά...',
            })
        })()

    }
    const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setChampionship({ ...championship, [ev.target.name]: ev.target.value })
    }
    const onSelect = (team: LogoTeam) => {
        if (championship.teams.some(item => item.id == team.id)) {
            setChampionship({ ...championship, teams: championship.teams.filter(item => item.id != team.id) })
            return;
        }
        setChampionship({ ...championship, teams: [...championship.teams, team] })
    }
    const filteredTeams = useMemo(() => {
        return teams.filter(team => team.teamName.toLowerCase().includes(query.toLowerCase()) || team.city.cityName.toLowerCase().includes(query.toLowerCase())).slice(0, 9)
    }, [query, teams])
    return (
        <FormField onSubmit={onSubmit}>
            <Field label='Όνομα Τουρνουά' placeholder='Τουρνουά' name='name' value={championship.name} onChange={handleChange} />
            <fieldset className={`flex flex-col w-full gap-y-0 relative items-center`}>
                <div className='flex w-[60%] justify-between items-center relative text-slate-700 border-b-[1px] border-b-slate-400 wireless:w-[90%]'>
                    <label className="text-sm font-medium text-slate-600">Διαθέσιμες Ομάδες<span className='text-slate-800'>*</span></label>
                    <input value={query} onChange={(ev) => setQuery(ev.target.value)} type='text' placeholder='Αναζήτηση ομάδας' className='py-2 outline-none pr-8' />
                    <div className='absolute right-2'><SearchIcon /></div>
                </div>
                <ul className='flex flex-wrap gap-4 pt-8 justify-center'>
                    {
                        filteredTeams.map(team => {
                            return (
                                <TeamItem city={team.city} onSelect={onSelect} key={team.id} {...team} checked={championship.teams.some(item => item.id == team.id)} />
                            )
                        })
                    }
                </ul>
                {(teams.length - filteredTeams.length) > 0 && <p className='absolute right-[10%] -bottom-7 text-slate-500 text-sm'>+ {teams.length - filteredTeams.length} ομάδες ακόμη...</p>}
                {championship.teams.length > 0 && <p className='absolute left-[calc(10%+8px)] -bottom-7 text-slate-500 text-sm wireless:hidden'>{championship.teams.length} επιλεγμένες ομάδες</p>}
            </fieldset>
            <SubmitBtn />
        </FormField>
    )
}
export default Championship

function TeamItem(props: ShortTeam & Pick<Team, 'logoPath'> & { checked: boolean; onSelect: (team: LogoTeam) => void }) {
    return (
        <li onClick={() => props.onSelect(props)}
            className='min-w-[150px] [&:has(input:checked)]:hover:after:content-["Αναίρεση_επιλογής"]
            h-[100px] group rounded-md relative cursor-pointer after:absolute after:bg-transparent
            after:text-white after:text-center after:font-semibold after:cursor-pointer after:text-lg after:rounded-md after:z-10 after:flex after:items-center after:justify-center
            after:hover:bg-opacity-90 hover:after:content-center hover:after:content-["Επιλογή"] after:h-[1px] after:w-full after:top-0 after:left-0 
            hover:after:h-full after:transition-all'>
            <img src={props.logoPath} className='object-cover w-full h-full blur-[2px] brightness-[0.6]' />
            <div className='absolute gap-y-1 top-0 left-0 w-full font-wotfard-md h-full flex justify-center items-center flex-col group-hover:hidden'>
                <p className='text-white text-xl font-semibold -mt-2 first-letter:uppercase'>{props.teamName}</p>
                <p className='text-sm text-slate-200 first-letter:uppercase'>{props.city.cityName}</p>
            </div>
            <input type="checkbox" readOnly checked={props.checked}
                className={`absolute size-4 rounded accent-sec  bottom-0 right-0 ${!props.checked && 'hidden'}`} />

        </li>
    )
}