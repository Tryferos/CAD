
import { FC, Fragment, useState } from 'react'
import { ItemHeader } from './Admin'
import { PopupType, usePopup } from '../Layout/Wrapper';

const Teams: FC = (props) => {
    const [teams, setTeams] = useState([]);
    const { handlePopup, } = usePopup();
    return (
        <section className='w-full flex flex-col items-center'>
            <ItemHeader
                onClick={() => handlePopup(PopupType.team, 'Δημιουργία ομάδας')}
                btnText='Προσθήκη'
                length={teams.length}
                title='Ομάδες που συμμετέχουν στα Τουρνουά: '
                backgroundImageClass='bg-basketball-team'
            />
        </section>
    )
}

export default Teams