
import { FC, Fragment, useState } from 'react'
import { AdminTeam, ItemHeader } from './Admin'
import { PopupType, usePopup } from '../Layout/Wrapper';
import { motion } from 'framer-motion';

type Props = {
    teams: AdminTeam[]
}

const Teams: FC<Props> = (props) => {
    const { teams } = props;
    const { handlePopup, } = usePopup();
    return (
        <section className='w-[80%] flex flex-col items-center bg-slate-100 rounded-md'>
            <ItemHeader
                onClick={() => handlePopup(PopupType.team, 'Δημιουργία ομάδας')}
                btnText='Προσθήκη'
                length={teams.length}
                title='Ομάδες που συμμετέχουν στα Τουρνουά: '
                backgroundImageClass='bg-basketball-team'
            />
            <ul className='flex flex-wrap gap-5 w-full p-5 items-center justify-around'>
                {
                    teams.map((item, i) => {
                        return (
                            <motion.li key={item.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: i * 0.25 + 0.25 }}
                                className='w-[25%] h-[150px] outline hover:scale-[1.02] transition-transform hover:shadow-box outline-1 outline-slate-300 
                                rounded-md py-2 px-4 flex-grow text-center shadow-box-sm relative cursor-pointer text-white'>
                                <img src={item.logoPath ?? '/paok.png'} alt={item.teamName}
                                    className='w-full h-full absolute top-0 left-0 object-cover blur-[2px] brightness-[0.65]' />
                                <div className='absolute flex items-center flex-col top-5 left-0 justify-center w-full'>
                                    <p className='font-semibold first-letter:uppercase py-1 rounded text-lg'>{item.teamName}</p>
                                    <p className='font-semibold first-letter:uppercase py-1 rounded text-base text-gray-300'>{item.city.cityName}</p>
                                </div>
                                <div className='absolute flex bottom-2 w-[calc(100%-32px)] justify-center text-gray-300 font-semibold text-sm flex-col'>
                                    <p className='text-base'>{item.totalPlayers}</p>
                                    <p>Παίκτες</p>
                                </div>
                            </motion.li>
                        )
                    })
                }
            </ul>
        </section>
    )
}

export default Teams