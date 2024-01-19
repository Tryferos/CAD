import { FC, Fragment, useMemo, useState } from 'react'
import { usePopup, useUser } from '../Layout/Wrapper'
import { Match } from '../Tournaments/Matches';
import { Game } from '../Tournaments/Standings';
import { FormField, SubmitBtn } from './FormElements';
import { toast } from 'react-toastify';

type Quarter = {
    quarter_score: number;
    id: {
        game: { game_id: string; team_id: string; championship_id: string },
        team: { team_id: string },
        quarterType: 'FIRST' | 'SECOND' | 'THIRD' | 'FOURTH' | 'OVERTIME'
    }
}

const Score: FC = (props) => {
    const { popup, title, data, handlePopup } = usePopup();
    const { authRequest } = useUser();
    const { match, tourid } = data as { match: Match, tourid: number };
    const [game, setGame] = useState<Game>({
        game_id: '1',
        quarter: [
            ...new Array(5).fill(1).map(((item, i) => ({ quarter: i + 1, quarter_score: 0, quarter_score_against: 0 })))
        ]
    })
    const homeTotal = useMemo(() => {
        return game.quarter.reduce((p, c, i) => p + c.quarter_score, 0);
    }, [game.quarter])
    const awayTotal = useMemo(() => {
        return game.quarter.reduce((p, c, i) => p + c.quarter_score_against, 0);
    }, [game.quarter])
    if (match == null) return null;
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
        (async () => {
            const quartersHome = game.quarter.map(quarter => {
                return {
                    id: {
                        quarterType: quarter.quarter == 1 ? 'FIRST' : quarter.quarter == 2 ? 'SECOND' : quarter.quarter == 3 ? 'THIRD' : quarter.quarter == 4 ? 'FOURTH' : 'OVERTIME',
                        team: {
                            id: match.homeTeam.id
                        },
                        game: {
                            id: {
                                id: match.id,
                                round: {
                                    id: {
                                        id: parseInt(match.round_id),
                                        championship: {
                                            id: tourid
                                        }
                                    }
                                }
                            }
                        },
                    },
                    quarter_score: quarter.quarter_score,
                }
            })
            const quartersAway = game.quarter.map(quarter => {
                return {
                    id: {
                        quarterType: quarter.quarter == 1 ? 'FIRST' : quarter.quarter == 2 ? 'SECOND' : quarter.quarter == 3 ? 'THIRD' : quarter.quarter == 4 ? 'FOURTH' : 'OVERTIME',
                        team: {
                            id: match.awayTeam.id
                        },
                        game: {
                            id: {
                                id: match.id,
                                round: {
                                    id: {
                                        id: parseInt((match.id as any).round.id.id),
                                        championship: {
                                            id: tourid
                                        }
                                    }
                                }
                            }
                        },
                    },
                    quarter_score: quarter.quarter_score_against,
                }
            })
            let allOK = true;
            quartersHome.forEach(async (quarterScore) => {
                const res = await fetch(`${process.env.NODE_ENV == 'development' ? `http://localhost:${process.env.REACT_APP_SERVER_PORT}` : ''}/api/teamScorePerQuarters/add`, authRequest('POST', quarterScore));
                if (!res.ok) allOK = false;
            })
            quartersAway.forEach(async (quarterScore) => {
                const res = await fetch(`${process.env.NODE_ENV == 'development' ? `http://localhost:${process.env.REACT_APP_SERVER_PORT}` : ''}/api/teamScorePerQuarters/add`, authRequest('POST', quarterScore));
                if (!res.ok) allOK = false;
            })

            if (allOK) {
                toast.success('Το σκορ καταχωρήθηκε επιτυχώς');
                handlePopup(null)
                return;
            }
            toast.error('Δημιουργήθηκε κάποιο σφάλμα στην καταχώρηση του σκορ');

        })();
    }
    return (
        <FormField onSubmit={handleSubmit}>
            <ul className='flex flex-wrap gap-10 wireless:justify-center min-h-[350px]'>
                {
                    new Array(5).fill(1).map((item, i) => {
                        return (
                            <li className='w-[25%] min-w-[200px]'>
                                <p className='border-b-[1px] border-b-slate-300 py-1'>
                                    {
                                        i == 4 ? `Παράταση`
                                            : i + 1 + 'ο δεκάλεπτο'
                                    }
                                </p>
                                <div className='flex py-2 justify-between'>
                                    <div>
                                        <p>{match.homeTeam.teamName}</p>
                                        <p>{match.awayTeam.teamName}</p>
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
                            <p className={`${homeTotal > awayTotal ? 'text-green-600' : 'text-red-600'}`}>{match.homeTeam.teamName}</p>
                            <p className={`${homeTotal < awayTotal ? 'text-green-600' : 'text-red-600'}`}>{match.awayTeam.teamName}</p>
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