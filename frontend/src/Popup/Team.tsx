import React, { FC, Fragment, forwardRef, useEffect, useState } from 'react'
import { usePopup, useUser } from '../Layout/Wrapper'
import { DropdownSize, SimpleDropdown } from '@tryferos/dropdown';
import { Field, FormField, ImageFieldRef, SubmitBtn } from './FormElements';
import { toast } from 'react-toastify';

type Team = {
    teamName: string;
    shortName: string;
    city: City;
    stadiumName: string;
    logoPath: string;
    coachName: string;
}

export type City = {
    cityName: string;
    id: number;
}


const Team: FC = (props) => {
    const { handlePopup } = usePopup();
    const { user, handleLogIn, handleLogOut, authRequest } = useUser();
    const [team, setTeam] = useState<Team>({ teamName: '', shortName: '', city: { cityName: '', id: 0 }, stadiumName: '', logoPath: '', coachName: '' });
    const [cities, setCities] = useState<City[]>([])
    useEffect(() => {

        (async () => {

            const response = await fetch('http://localhost:3309/api/cities/', authRequest('GET'));
            const data = await response.json();
            setCities(data);
        })()

    }, [])
    const onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
        if (team.city.cityName.length == 0) {
            toast.error('Παρακαλώ επιλέξτε ομάδα');
            return;
        }
        if (team.logoPath.length == 0) {
            toast.error('Παρακαλώ επιλέξτε εικόνα');
            return;
        }
        if (!cities.map(item => item.cityName).includes(team.city.cityName)) {
            (async () => {
                const res = await fetch('http://localhost:3309/api/cities/add', authRequest('POST', { cityName: team.city.cityName }));
                const city = await res.json();
                setTeam(prev => ({ ...prev, city: { cityName: city.cityName, id: city.id } }))
            })()
        }
        (async () => {
            const promise = new Promise(async (resolve, reject) => {
                try {
                    await fetch('http://localhost:3309/api/teams/add', authRequest('POST', { ...team, logoPath: '' }));
                    resolve(null)
                    handlePopup(null);
                } catch (err) {
                    reject(err)
                }
            })
            toast.promise(promise, {
                success: 'Η ομάδα προστέθηκε επιτυχώς',
                error: 'Η ομάδα δεν προστέθηκε',
                pending: 'Προσθήκη ομάδας...',
            })
        })()

        //TODO: API CALL
    }
    const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setTeam({ ...team, [ev.target.name]: ev.target.value });
    }
    const handleFileChange = (logoPath: string) => {
        setTeam({ ...team, logoPath });
    }
    const getTeamId = (cityName: string) => {
        const city = cities.find(item => item.cityName == cityName);
        if (city) return city.id;
        return -1;
    }
    return (
        <FormField onSubmit={onSubmit}>
            <Field label='Όνομα ομάδας' placeholder='Ομάδα' name='teamName' value={team.teamName} onChange={handleChange} />
            <Field label='Αναγνωριστικό ομάδας' placeholder='π.χ. PAO' name='shortName' value={team.shortName} onChange={handleChange} />
            <Field label='Στάδιο' name='stadiumName' value={team.stadiumName} onChange={handleChange} />
            <Field label='Προπονητής' name='coachName' value={team.coachName} onChange={handleChange} />
            <div className='w-[60%] wireless:w-[90%]'>
                {
                    cities.length > 0 &&
                    <SimpleDropdown
                        items={cities.map((item) => item.cityName)}
                        shadow={false}
                        search={true}
                        onSelect={(item) => setTeam((prev) => ({ ...prev, city: { cityName: item, id: getTeamId(item) } }))}
                        onSearchChange={(text) => setTeam((prev) => ({ ...prev, city: { cityName: text, id: getTeamId(text) } }))}
                        placeholder='Πόλη'
                        maxHeight='100px'
                        selected={team.city.cityName}
                        size={DropdownSize.full}
                        title='Πόλη ομάδας'
                        highlight='underline'
                    />
                }
            </div>
            <ImageFieldRef onChange={handleFileChange} logoPath={team.logoPath} handleRemove={() => setTeam((prev) => ({ ...prev, logoPath: '' }))} />
            <SubmitBtn />
        </FormField>
    )
}

export default Team;
