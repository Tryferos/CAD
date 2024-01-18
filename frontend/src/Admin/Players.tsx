import React, { FC, Fragment, useState } from 'react'
import { Player } from '../Teams';

import { AddIcon } from '../icons';
import { AdminTeam, ItemHeader } from './Admin';
import { PopupType, usePopup } from '../Layout/Wrapper';
import { motion } from 'framer-motion';


type Props = {
    players: Player[]
}

const Players: FC<Props> = (props) => {
    const { handlePopup } = usePopup();
    const { players } = props;
    return (
        <section className='w-[80%] bg-slate-100 rounded-md flex flex-col items-center'>
            <ItemHeader
                onClick={() => { handlePopup(PopupType.player, 'Δημιουργία παίκτη') }}
                btnText='Προσθήκη'
                length={players.length}
                title='Παίκτες που συμμετέχουν στα Τουρνουά: '
                backgroundImageClass='bg-basketball-player'
            />
            <ul className='flex flex-wrap gap-5 w-full p-5 items-center justify-around'>
                {
                    players.slice(0, 9).map((item, i) => {

                        return (
                            <motion.li key={item.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: i * 0.25 + 0.25 }}
                                className='w-[25%] h-[150px] outline hover:scale-[1.02] transition-transform hover:shadow-box outline-1 outline-slate-300 
                                rounded-md py-2 px-4 flex-grow text-center shadow-box-sm relative cursor-pointer text-white'>
                                <img src={(item.logoPath && item.logoPath.length > 0) ? item.logoPath : '/lebron.jpg'} alt={item.firstName}
                                    className='w-full h-full scale-90 absolute top-0 left-0 object-cover blur-[2px] brightness-50' />
                                <img src={(item.logoPath && item.logoPath.length > 0) ? item.logoPath : '/lebron.jpg'} alt={item.firstName}
                                    className='w-full h-full absolute top-0 left-0 object-cover brightness-50' />
                                <div className='absolute flex items-center flex-col top-5 left-0 justify-center w-full'>
                                    <div className='font-semibold first-letter:uppercase py-1 rounded text-lg *:first-letter:uppercase flex gap-x-1'>
                                        <p>{item.firstName.toLowerCase()} </p>
                                        <p>{item.lastName.toLowerCase()}</p>
                                    </div>
                                    <div className='font-semibold *:first-letter:uppercase py-1 rounded text-base text-gray-300 flex gap-x-1'>
                                        <p>{item.positionType.split("_")[0].toLowerCase()}</p>
                                        {item.positionType.split("_").length > 1 &&
                                            <p>{item.positionType.split("_")[1].toLowerCase()}</p>}
                                    </div>
                                </div>
                                <div className='absolute flex bottom-2 w-[calc(100%-32px)] justify-center text-gray-300 font-semibold text-sm flex-col'>
                                    <p className='text-base first-letter:uppercase'>{item.nationality.toLowerCase()}</p>
                                </div>
                            </motion.li>
                        )
                    })
                }
            </ul>
        </section>
    )
}

export default Players