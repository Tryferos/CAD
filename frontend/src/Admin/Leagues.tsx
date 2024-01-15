import { FC, Fragment, useState } from 'react'
import { ItemHeader } from './Admin';
import { PopupType, usePopup } from '../Layout/Wrapper';

const Leagues: FC = (props) => {
    const [leagues, setLeagues] = useState([]);
    const { handlePopup } = usePopup();
    return (
        <section className='w-full items-center flex flex-col'>
            <ItemHeader
                onClick={() => { handlePopup(PopupType.championship, 'Δημιουργία Τουρνουά') }}
                btnText='Προσθήκη'
                length={leagues.length}
                title='Συνολικά Τουρνουά: '
                backgroundImageClass='bg-basketball-league'
            />
        </section>
    )
}

export default Leagues