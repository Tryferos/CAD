'use client'
import './App.css';
import React, { useEffect, useState } from 'react';
import { SearchElement } from '@tryferos/search';
import { AdminLeague, AdminTeam } from './Admin/Admin';
import { Link } from 'react-router-dom';


function App() {
  const [leagues, setLeagues] = useState<AdminLeague[]>([]);
  const [teams, setTeams] = useState<AdminTeam[]>([]);
  useEffect(() => {

    if (leagues.length > 0) return;

    (async () => {
      const res = await fetch(`${process.env.NODE_ENV == 'development' ? 'http://localhost:3309' : ''}/api/championships/`)
      const champData = await res.json() as AdminLeague[];
      const lengthedChampData = await Promise.all(
        champData.map(async (vChampionship, i) => {
          const teamResponse = await fetch(`${process.env.NODE_ENV == 'development' ? 'http://localhost:3309' : ''}/api/teams/championship/${vChampionship.id}`)
          const teamData = await teamResponse.json() as AdminTeam[];
          const lengthedTeamData = await Promise.all
            (
              teamData.map(async vTeam => {
                const playersResponse = await fetch(`${process.env.NODE_ENV == 'development' ? 'http://localhost:3309' : ''}/api/players/team/${vTeam.id}`)
                const playersData = await playersResponse.json();

                Object.defineProperty(vTeam, 'totalPlayers', { value: playersData.length });
                return vTeam;

              }))
          setTeams(prev => [...prev, ...lengthedTeamData.filter(v => !prev.map(p => p.id).includes(v.id))]);
          const champTotalPlayers = lengthedTeamData.reduce((acc, curr) => acc + curr.totalPlayers, 0);
          return {
            ...vChampionship,
            totalTeams: teamData.length,
            totalPlayers: champTotalPlayers
          }
        })
      )
      setLeagues(lengthedChampData);
    })()

  }, [])

  function getLeaguePopularity(league: AdminLeague) {
    return league.totalPlayers * league.totalTeams;
  }


  return (
    <section className='min-h-[100vh] w-full p-10 flex gap-x-5 relative'>
      <div className='flex flex-col basis-[100%] gap-y-5'>
        <div className='flex flex-col'>
          <p className='pb-2 border-b-[1px] border-b-gray-300 text-xl font-semibold'>Δημοφιλή πρωταθλήματα</p>
          <ul className='flex flex-wrap gap-4 py-5'>
            {
              leagues.sort((a, b) => getLeaguePopularity(b) - getLeaguePopularity(a)).slice(0, 6).map(league => {
                return (
                  <Link key={league.id} to={`/tournaments/${league.id}/`}
                    className='flex grow h-[100px] hover:scale-[1.02] relative *:text-white p-4 min-w-[250px] justify-center *:rounded-md cursor-pointer'>
                    <div className='bg-basketball size-[99%] z-40 absolute left-[0.5%] top-[0.5%] blur-[2.5px] brightness-75'></div>
                    <div className='bg-basketball w-full h-full z-30 absolute left-0 top-0 brightness-75'></div>
                    <div className='*:first-letter:uppercase bg-bla w-full z-[50] text-xl text-center absolute left-0 flex justify-center items-center text-white'>
                      <p>{league.name}</p>
                    </div>
                    <div className='flex absolute bottom-2 left-4 w-[calc(100%-32px)] justify-between text-sm'>
                      <p className='z-50 first-letter:uppercase'>Παίκτες: {league.totalPlayers}</p>
                      <p className='z-50 first-letter:uppercase'>Ομάδες: {league.totalTeams}</p>
                    </div>
                  </Link>
                )
              })
            }
          </ul>
        </div>
        <div className='basis-[100%] flex flex-col'>
          <p className='pb-2 border-b-[1px] border-b-gray-300 text-xl font-semibold'>Δημοφιλές ομάδες</p>
          <ul className='flex flex-wrap gap-4 py-5'>
            {
              teams.sort((a, b) => b.totalPlayers - a.totalPlayers).slice(0, 6).map(team => {
                return (
                  <Link key={team.id} to={`/teams/${team.id}`}
                    className='flex grow h-[130px] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-box-square cursor-pointer hover:scale-[1.01] transition-all relative *:text-white p-4 min-w-[250px] justify-center bg-slate-700 rounded-md'>
                    <div className='flex flex-col items-center'>
                      <img src={team.logoPath ?? '/paok.png'} className='object-contain size-16 brightness-90' />
                      <p className='z-50 first-letter:uppercase text-xl text-center'>{team.teamName}</p>
                    </div>
                    <div className='flex absolute bottom-2 left-4 w-[calc(100%-32px)] justify-between text-sm'>
                      <p className='z-50 first-letter:uppercase'>Παίκτες: {team.totalPlayers}</p>
                    </div>
                  </Link>
                )
              })
            }
          </ul>
        </div>
      </div>
      <img src="/landing-bg.svg" className='opacity-90 mt-[32px] h-[55vh] basis-[100%] object-contain' />

    </section>
  );
}

export default App;
