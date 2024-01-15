import React, { FC, Fragment, forwardRef, useState } from 'react'
import { usePopup, useUser } from '../Layout/Wrapper'
import { DropdownSize, SimpleDropdown } from '@tryferos/dropdown';
import { Field, FormField, ImageFieldRef, SubmitBtn } from './FormElements';
import { toast } from 'react-toastify';

type Team = {
    team_name: string;
    short_name: string;
    city_name: string;
    stadium_name: string;
    logo_path: string;
    coach_name: string;
}


const Team: FC = (props) => {
    const { } = usePopup();
    const { user, handleLogIn, handleLogOut } = useUser();
    const [team, setTeam] = useState<Team>({ team_name: '', short_name: '', city_name: '', stadium_name: '', logo_path: '', coach_name: '' });
    const onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
        if (team.city_name.length == 0) {
            toast.error('Παρακαλώ επιλέξτε ομάδα');
            return;
        }
        if (team.logo_path.length == 0) {
            toast.error('Παρακαλώ επιλέξτε εικόνα');
            return;
        }
        //TODO: API CALL
    }
    const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setTeam({ ...team, [ev.target.name]: ev.target.value });
    }
    const handleFileChange = (logo_path: string) => {
        setTeam({ ...team, logo_path });
    }
    const cities = [
        'Αθήνα',
        'Θεσσαλονίκη',
        'Πάτρα',
        'Ηράκλειο',
        'Λάρισα',
        'Βόλος',
        'Ιωάννινα',
    ]
    return (
        <FormField onSubmit={onSubmit}>
            <Field label='Όνομα ομάδας' placeholder='Ομάδα' name='team_name' value={team.team_name} onChange={handleChange} />
            <Field label='Αναγνωριστικό ομάδας' placeholder='π.χ. PAO' name='short_name' value={team.short_name} onChange={handleChange} />
            <Field label='Στάδιο' name='stadium_name' value={team.stadium_name} onChange={handleChange} />
            <Field label='Προπονητής' name='coach_name' value={team.coach_name} onChange={handleChange} />
            <div className='w-[60%]'>
                <SimpleDropdown
                    items={cities}
                    shadow={false}
                    search={true}
                    onSelect={(item) => setTeam((prev) => ({ ...prev, city_name: item }))}
                    placeholder='Πόλη'
                    maxHeight='100px'
                    selected={team.city_name}
                    size={DropdownSize.full}
                    title='Πόλη ομάδας'
                    highlight='underline'
                />
            </div>
            <ImageFieldRef onChange={handleFileChange} logo_path={team.logo_path} handleRemove={() => setTeam((prev) => ({ ...prev, logo_path: '' }))} />
            <SubmitBtn />
        </FormField>
    )
}

export default Team;
