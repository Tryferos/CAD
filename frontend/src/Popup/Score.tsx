import { FC, Fragment, useMemo, useState } from 'react'
import { usePopup } from '../Layout/Wrapper'
import { Match } from '../Tournaments/Matches';
import { Game } from '../Tournaments/Standings';
import { FormField, SubmitBtn } from './FormElements';
import { toast } from 'react-toastify';

const Score: FC = (props) => {
    const { popup, title, data } = usePopup();
    const team = data as Match;
    const [game, setGame] = useState<Game>({
        game_id: '1',
        quarter: [
            {
                quarter: 1,
                quarter_score: 0,
                quarter_score_against: 0
            },
            {
                quarter: 2,
                quarter_score: 0,
                quarter_score_against: 0
            },
            {
                quarter: 3,
                quarter_score: 0,
                quarter_score_against: 0
            },
            {
                quarter: 4,
                quarter_score: 0,
                quarter_score_against: 0
            },
        ]
    })
    const homeTotal = useMemo(() => {
        return game.quarter.reduce((p, c, i) => p + c.quarter_score, 0);
    }, [game.quarter])
    const awayTotal = useMemo(() => {
        return game.quarter.reduce((p, c, i) => p + c.quarter_score_against, 0);
    }, [game.quarter])
    if (team == null) return null;
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, i: number, type: 'home' | 'away') => {
        setGame(prev => {
            const quarter = prev.quarter.map((item, index) => {
                if (index == i) {
                    return {
                        ...item,
                        [type == 'home' ? 'quarter_score' : 'quarter_score_against']: parseInt(e.target.value)
                    }
                }
                return item;
            })
            return {
                ...prev,
                quarter
            }
        })
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        if (homeTotal == awayTotal) {
            toast.error('Οι ομάδες είναι ισόπαλες');
            return;
        }
    }
    return (
        <FormField onSubmit={handleSubmit}>
            <ul className='flex flex-wrap gap-10 wireless:justify-center min-h-[350px]'>
                {
                    new Array(4).fill(1).map((item, i) => {
                        return (
                            <li className='w-[25%] min-w-[200px]'>
                                <p className='border-b-[1px] border-b-slate-300 py-1'>{i + 1}ο δεκάλεπτο</p>
                                <div className='flex py-2 justify-between'>
                                    <div>
                                        <p>{team.home_team.team_name}</p>
                                        <p>{team.away_team.team_name}</p>
                                    </div>
                                    <div className='w-10 flex flex-col'>
                                        <input min={0} max={999} type='number' className={`${game.quarter[i].quarter_score > game.quarter[i].quarter_score_against ? 'text-green-600' : 'text-red-600'} text-end -mr-4`} onChange={(ev) => handleChange(ev, i, 'home')}
                                            value={game.quarter[i].quarter_score} />
                                        <input min={0} max={999} type='number' className={`${game.quarter[i].quarter_score < game.quarter[i].quarter_score_against ? 'text-green-600' : 'text-red-600'} text-end -mr-4`} onChange={(ev) => handleChange(ev, i, 'away')}
                                            value={game.quarter[i].quarter_score_against} />
                                    </div>
                                </div>
                            </li>
                        )
                    })
                }
                <li className='w-[25%] min-w-[200px]'>
                    <p className='border-b-[1px] border-b-slate-300 py-1'>Συνολικά</p>
                    <div className='flex py-2 justify-between'>
                        <div>
                            <p className={`${homeTotal > awayTotal ? 'text-green-600' : 'text-red-600'}`}>{team.home_team.team_name}</p>
                            <p className={`${homeTotal < awayTotal ? 'text-green-600' : 'text-red-600'}`}>{team.away_team.team_name}</p>
                        </div>
                        <div>
                            <p className={`${homeTotal > awayTotal ? 'text-green-600' : 'text-red-600'}`}>{homeTotal}</p>
                            <p className={`${homeTotal < awayTotal ? 'text-green-600' : 'text-red-600'}`}>{awayTotal}</p>
                        </div>
                    </div>
                </li>
            </ul>
            <SubmitBtn />
        </FormField>
    )
}

export default Score