import React, { FC, Fragment, useState } from 'react'
import { Field, FormField, ImageFieldRef, SubmitBtn } from './FormElements'
import { Position } from '../Teams';
import { DropdownSize, SimpleDropdown } from '@tryferos/dropdown';
import Team from './Team';
import { toast } from 'react-toastify';

type Player = {
    player_firstname: string;
    player_lastname: string;
    height: number;
    nationality: string;
    position_type: Position;
    logo_path: string;
    team: TeamType;
}

type TeamType = Pick<Team, 'city_name' | 'team_name'> & { team_id: string };
const teams = [
    { team_name: 'Paok', city_name: 'Saloniki', team_id: '1' },
    { team_name: 'Aek', city_name: 'Athens', team_id: '2' },
    { team_name: 'Olympiacos', city_name: 'Piraeus', team_id: '3' },
]
const Player: FC = (props) => {
    const [player, setPlayer] = useState<Player>(
        {
            player_firstname: '', player_lastname: '', height: 180, logo_path: '', nationality: '', position_type: '' as Position,
            team: { team_name: '', city_name: '', team_id: '' }
        }
    )
    const onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
        if (player.position_type.length == 0) {
            toast.error('Παρακαλώ επιλέξτε θέση παίκτη');
            return;
        }
        if (player.team.city_name.length == 0 && player.team.team_name.length == 0) {
            toast.error('Παρακαλώ επιλέξτε ομάδα');
            return;
        }
        if (player.logo_path.length == 0) {
            toast.error('Παρακαλώ επιλέξτε εικόνα');
            return;
        }
        //TODO: API CALL
    }
    const handleFileChange = (logo_path: string) => {
        setPlayer(prev => ({ ...prev, logo_path }))
    }
    const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setPlayer({ ...player, [ev.target.name]: ev.target.value })
    }
    const mappedTeams = teams.map(item => `${item.team_name}, ${item.city_name}`)
    const findMappedTeam = (text: string) => {
        const name = text.split(',')[0];
        const city = text.split(',')[1].trim();
        return teams.find(item => item.team_name === name && item.city_name === city) as TeamType;
    }
    const mapTeam = (team: TeamType) => (team.city_name.length == 0 && team.team_name.length == 0) ? null : `${team.team_name}, ${team.city_name}`;
    return (
        <FormField onSubmit={onSubmit}>
            <Field label='Όνομα παίκτη' placeholder='Όνομα' name='player_firstname' value={player.player_firstname} onChange={handleChange} />
            <Field label='Επώνυμο παίκτη' placeholder='Επώνυμο' name='player_lastname' value={player.player_lastname} onChange={handleChange} />
            <Field label='Εθνικότητα παίκτη' placeholder='Εθνικότητα' name='nationality' value={player.nationality} onChange={handleChange} />
            <Field type='number' label='Ύψος παίκτη' placeholder='Ύψος' name='height' value={player.height} onChange={handleChange} />
            <div className='w-[60%]'>
                <SimpleDropdown
                    items={Object.values(Position)}
                    shadow={false}
                    search={true}
                    onSelect={(item) => setPlayer(prev => ({ ...prev, position_type: item as Position }))}
                    placeholder='Θέση'
                    maxHeight='100px'
                    selected={player.position_type}
                    size={DropdownSize.full}
                    title='Θέση παίκτη'
                    highlight='underline'
                />
            </div>
            <div className='w-[60%]'>
                <SimpleDropdown
                    items={mappedTeams}
                    shadow={false}
                    search={true}
                    onSelect={(item) => setPlayer(prev => ({ ...prev, team: findMappedTeam(item) }))}
                    placeholder='Ομάδα'
                    maxHeight='100px'
                    selected={mapTeam(player.team)}
                    size={DropdownSize.full}
                    title='Ομάδα παίκτη'
                    highlight='underline'
                />
            </div>
            <ImageFieldRef onChange={handleFileChange} logo_path={player.logo_path} handleRemove={() => setPlayer((prev) => ({ ...prev, logo_path: '' }))} />
            <SubmitBtn />
        </FormField>
    )
}

export default Player