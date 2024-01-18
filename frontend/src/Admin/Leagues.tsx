import { FC, Fragment, useEffect, useState } from 'react'
import { AdminLeague, ItemHeader } from './Admin';
import { PopupType, usePopup } from '../Layout/Wrapper';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

type Props = {
    leagues: AdminLeague[];
}

const Leagues: FC<Props> = (props) => {
    const { handlePopup } = usePopup();
    const { leagues } = props;
    return (
        <section
            className='w-[80%] items-center flex flex-col bg-slate-100 rounded-md px-1'>
            <ItemHeader
                onClick={() => { handlePopup(PopupType.championship, 'Δημιουργία Τουρνουά') }}
                btnText='Προσθήκη'
                length={leagues.length}
                title='Συνολικά Τουρνουά: '
                backgroundImageClass='bg-basketball-league'
            />
            <ul className='flex flex-wrap gap-5 w-full p-5 items-center justify-around'>
                {
                    leagues.map((item, i) => {
                        return (
                            <Link to={`/tournaments/${item.id}/`} className='w-[25%] h-[120px] flex-grow outline hover:scale-[1.02] transition-transform hover:shadow-box outline-1 outline-slate-300 
                            rounded-md py-2 px-4 text-center shadow-box-sm relative cursor-pointer'>
                                <motion.li key={item.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5, delay: i * 0.25 + 0.25 }}>
                                    <p className='font-semibold first-letter:uppercase bg-slate-200 py-1 rounded'>{item.name}</p>
                                    <div className='absolute flex bottom-2 left-4 justify-between w-[calc(100%-32px)] text-gray-600 font-semibold text-sm'>
                                        <p>Ομάδες: {item.totalTeams}</p>
                                        <p>Παίκτες: {item.totalPlayers}</p>
                                    </div>
                                </motion.li>
                            </Link>
                        )
                    })
                }
            </ul>
        </section>
    )
}

export default Leagues