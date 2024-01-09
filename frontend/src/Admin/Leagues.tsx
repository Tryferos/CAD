import { FC, Fragment, useState } from 'react'
import { ItemHeader } from './Admin';

const Leagues: FC = (props) => {
    const [leagues, setLeagues] = useState([]);
    return (
        <section className='w-full items-center flex flex-col'>
            <ItemHeader
                btnText='Προσθήκη'
                length={leagues.length}
                title='Συνολικά Τουρνουά: '
                backgroundImageClass='bg-basketball-league'
            />
        </section>
    )
}

export default Leagues