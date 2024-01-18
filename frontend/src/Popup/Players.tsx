import React, { FC, Fragment, useEffect, useState } from 'react'
import { Field, FormField, ImageFieldRef, SubmitBtn } from './FormElements'
import { Position } from '../Teams';
import { DropdownSize, SimpleDropdown } from '@tryferos/dropdown';
import Team, { City } from './Team';
import { toast } from 'react-toastify';
import { usePopup, useUser } from '../Layout/Wrapper';
import { uploadImage } from '../lib';

type Player = {
    firstName: string;
    lastName: string;
    height: number;
    nationality: string;
    positionType: Position;
    logoPath: string;
    team: ShortTeam;
}

export type ShortTeam = Pick<Team, 'city' | 'teamName'> & { id: string };
const initTeam = { teamName: '', city: { cityName: '', id: -1 } as City, id: '' };

const Player: FC = (props) => {
    const { handlePopup } = usePopup();
    const { authRequest } = useUser();
    const [player, setPlayer] = useState<Player>(
        {
            firstName: '', lastName: '', height: 180, logoPath: '', nationality: '', positionType: '' as Position,
            team: { ...initTeam }
        }
    )
    const [teams, setTeams] = useState<ShortTeam[]>([]);
    useEffect(() => {

        (async () => {
            const res = await fetch('http://localhost:3309/api/teams/')
            const data = await res.json();
            setTeams(data);
        })()

    }, [])
    const onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
        if (player.positionType.length == 0) {
            toast.error('Παρακαλώ επιλέξτε θέση παίκτη');
            return;
        }
        if (player.team.city.cityName.length == 0 && player.team.teamName.length == 0) {
            toast.error('Παρακαλώ επιλέξτε ομάδα');
            return;
        }
        if (player.logoPath.length == 0) {
            toast.error('Παρακαλώ επιλέξτε εικόνα');
            return;
        }
        if (!Object.values(Position).includes(player.positionType.replaceAll(" ", "_") as Position)) {
            toast.error('Παρακαλώ επιλέξτε σωστή θέση για τον παίκτη');
            return;
        }
        if (!teams.some(item => item.id == player.team.id)) {
            toast.error('Παρακαλώ επιλέξτε σωστή ομάδα για τον παίκτη');
            return;
        }
        (async () => {
            const promise = new Promise(async (resolve, reject) => {
                const p = { ...player, logoPath: '', team: { id: player.team.id }, positionType: player.positionType.replaceAll(" ", "_") };

                const res = await uploadImage(player.logoPath)
                console.log(res)

                try {
                    await fetch('http://localhost:3309/api/players/add', authRequest('POST', p));
                    resolve(null)
                    handlePopup(null);
                } catch (err) {
                    reject(err)
                }
            })
            toast.promise(promise, {
                success: 'Ο παίκτης προστέθηκε επιτυχώς',
                error: 'Ο παίκτης δεν προστέθηκε',
                pending: 'Προσθήκη παίκτη...',
            })
        })();
    }
    const handleFileChange = (logoPath: string) => {
        setPlayer(prev => ({ ...prev, logoPath }))
    }
    const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setPlayer({ ...player, [ev.target.name]: ev.target.value })
    }
    const mappedTeams = teams.map(item => `${item.teamName}, ${item.city.cityName}`)
    const findMappedTeam = (text: string) => {
        const name = text.split(',')[0];
        const city = text.split(',')[1].trim();
        return teams.find(item => item.teamName === name && item.city.cityName == city);
    }
    const mapTeam = (team: ShortTeam) => (team.city.cityName.length == 0 && team.teamName.length == 0) ? null : `${team.teamName}, ${team.city.cityName}`;
    return (
        <FormField onSubmit={onSubmit}>
            <Field label='Όνομα παίκτη' placeholder='Όνομα' name='firstName' value={player.firstName} onChange={handleChange} />
            <Field label='Επώνυμο παίκτη' placeholder='Επώνυμο' name='lastName' value={player.lastName} onChange={handleChange} />
            <Field label='Εθνικότητα παίκτη' placeholder='Εθνικότητα' name='nationality' value={player.nationality} onChange={handleChange} />
            <Field type='number' label='Ύψος παίκτη' placeholder='Ύψος' name='height' value={player.height} onChange={handleChange} />
            <div className='w-[60%] wireless:w-[90%]'>
                <SimpleDropdown
                    items={Object.values(Position).map(item => item.replaceAll("_", " "))}
                    shadow={false}
                    search={true}
                    onSelect={(item) => setPlayer(prev => ({ ...prev, positionType: item as Position }))}
                    onSearchChange={(text) => setPlayer(prev => ({ ...prev, positionType: text as Position }))}
                    placeholder='Θέση'
                    maxHeight='100px'
                    selected={player.positionType.replaceAll("_", " ")}
                    size={DropdownSize.full}
                    title='Θέση παίκτη'
                    highlight='underline'
                />
            </div>
            <div className='w-[60%]'>
                {teams.length > 0 &&
                    <SimpleDropdown
                        items={mappedTeams}
                        shadow={false}
                        search={false}
                        onSelect={(item) => setPlayer(prev => ({ ...prev, team: findMappedTeam(item) }))}
                        placeholder='Ομάδα'
                        maxHeight='100px'
                        selected={mapTeam(player.team)}
                        size={DropdownSize.full}
                        title='Ομάδα παίκτη'
                        highlight='underline'
                    />}
            </div>
            <ImageFieldRef onChange={handleFileChange} logoPath={player.logoPath} handleRemove={() => setPlayer((prev) => ({ ...prev, logoPath: '' }))} />
            <SubmitBtn />
        </FormField>
    )
}

export default Player