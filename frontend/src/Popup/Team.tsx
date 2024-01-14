import React, { FC, Fragment, useState } from 'react'
import { usePopup, useUser } from '../Layout/Wrapper'
import { CloseIcon, PhotoIcon } from '../icons';
import { DropdownSize, SimpleDropdown } from '@tryferos/dropdown';

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
    const ref = React.useRef<HTMLInputElement>(null);
    const onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        const el = ev.target as HTMLFormElement;
        if (!el.checkValidity()) {
            //TODO: Show error
            return;
        }
        //TODO: API CALL
    }
    const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setTeam({ ...team, [ev.target.name]: ev.target.value });
    }
    const handleFile = (ev: React.ChangeEvent<HTMLInputElement>) => {
        if (!ev.target.files) return;
        const file = ev.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            if (!ev.target) return;
            setTeam({ ...team, logo_path: ev.target.result as string });
        }
        reader.readAsDataURL(file);
    }
    const handleClick = () => {
        if (!ref.current) return;
        ref.current.click();
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
        <form onSubmit={onSubmit} className='flex flex-col w-full items-center gap-y-5'>
            <Field label='Όνομα ομάδας' placeholder='Ομάδα' name='team_name' value={team.team_name} onChange={handleChange} />
            <Field label='Αναγνωριστικό ομάδας' placeholder='π.χ. PAO' name='short_name' value={team.short_name} onChange={handleChange} />
            <Field label='Στάδιο' name='stadium_name' value={team.stadium_name} onChange={handleChange} />
            <Field label='Προπονητής' name='coach_name' value={team.coach_name} onChange={handleChange} />
            <div className='w-[60%]'>
                <SimpleDropdown
                    items={cities}
                    shadow={false}
                    search={true}
                    onSelect={(item) => setTeam({ ...team, city_name: item })}
                    placeholder='Πόλη'
                    maxHeight='100px'
                    selected={team.city_name}
                    size={DropdownSize.full}
                    title='Πόλη ομάδας'
                    highlight='underline'
                />
            </div>
            <fieldset className="flex w-[60%] gap-y-2 justify-between items-center">
                <label className="text-sm font-semibold text-slate-700" htmlFor={'logo'}>Προσθήκη Logo</label>
                <PhotoIcon onClick={handleClick} />
                <input accept={'image/png, image/jpeg, image/svg'} ref={ref} type='file' name='logo' onChange={handleFile}
                    className='file:px-2 hidden file:py-2 file:rounded-md file:text-hi file:border-slate-700 file:border-[1px] file:bg-transparent file:hover:bg-slate-700 file:hover:text-white cursor-pointer file:cursor-pointer'
                />
            </fieldset>
            {
                team.logo_path.length > 0 &&
                <figure className='w-[60%] relative'>
                    <img src={team.logo_path} className='object-contain w-full h-[200px]' />
                    <div className='absolute top-2 right-2'>
                        <CloseIcon onClick={() => setTeam({ ...team, logo_path: '' })} />
                    </div>
                </figure>
            }
            <button
                className="py-2 mt-10 px-4 outline-sec outline outline-1 rounded-md text-sec shadow-shadowSec hover:shadow-shadowSecHover hover:bg-sec hover:text-white font-semibold transition-all"
                type="submit">Δημιουργία</button>
        </form>
    )
}

export default Team;

type FieldProps = {
    label: string;
    name: string;
    value: string;
    onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    minLength?: number;
    placeholder?: string;
}

export function Field(props: FieldProps) {
    const { label, name, required: req, minLength: min, placeholder, value, onChange } = props;
    const minLength = min ?? 4;
    const required = req ?? true;
    const placeholderText = placeholder ?? label;

    return (
        <fieldset className="flex flex-col w-[60%] gap-y-0">
            <label className="text-sm font-medium text-slate-700" htmlFor={name}>{label}{required ? <span className='text-slate-800'>*</span> : ''}
            </label>
            <input required={required} minLength={minLength}
                className="border-b-[2px] border-b-slate-400 py-2 outline-none focus:border-b-sky-700 invalid:border-b-red-500 valid:border-b-green-500" value={value} onChange={onChange}
                placeholder={placeholderText} type="text" name={name} id={name} />
        </fieldset>
    )
}