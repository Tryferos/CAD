
import { FC, Fragment, useState } from 'react'
import { ItemHeader } from './Admin'

const Teams: FC = (props) => {
    const [teams, setTeams] = useState([]);
    return (
        <section className='w-full flex flex-col items-center'>
            <ItemHeader
                btnText='Προσθήκη'
                length={teams.length}
                title='Ομάδες που συμμετέχουν στα Τουρνουά: '
                backgroundImageClass='bg-basketball-team'
            />
        </section>
    )
}

export default Teams