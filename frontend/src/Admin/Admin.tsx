import { FC, Fragment } from 'react'
import Players from './Players'
import { useUser } from '../Layout/Wrapper'
import { Navigate } from 'react-router-dom'
import { AddIcon } from '../icons'
import Teams from './Teams'
import Leagues from './Leagues'
import { SimpleDropdown } from '@tryferos/dropdown'
const Admin: FC = (props) => {
    const { user } = useUser();
    if (!user) {
        Navigate({ to: '/' })
        return null;
    }
    return (
        <main className='w-full h-[150vh] flex flex-col gap-y-10 py-10'>
            <Players />
            <Teams />
            <Leagues />
        </main>
    )
}

export default Admin

type ItemHeaderProps = {
    length: number;
    title: string;
    btnText: string;
    backgroundImageClass: string;
}

export function ItemHeader(props: ItemHeaderProps) {
    return (
        <div className='w-[80%] h-[100px] relative flex px-[calc(3%+6px)] items-center justify-between'>
            <div className={`absolute rounded-md z-[100] left-[0.5%] top-[1%] h-[98%] w-[99%] ${props.backgroundImageClass} bg-fixed bg-center blur-[2px] brightness-[0.45]`}></div>
            <div className={`absolute rounded-md z-[90] left-0 top-0 size-full ${props.backgroundImageClass} bg-center brightness-50`}></div>
            <p className='font-medium z-[100] text-white text-lg text-center'>{props.title} ({props.length})</p>
            <div
                className='items-center z-[100] gap-x-2 font-medium flex outline outline-1 outline-green-400 px-4 py-2 rounded text-green-400 hover:bg-green-500 hover:text-white cursor-pointer'>
                <p>{props.btnText}</p>
                <AddIcon />
            </div>
        </div>
    )
}