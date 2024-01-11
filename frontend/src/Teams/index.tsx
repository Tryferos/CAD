import React from "react"
import { useParams } from "react-router-dom";
import { StandingsTeam, calculateGame, getRandomGame } from "../Tournaments/Standings";

export type Team = {
    stadium_name: string;
    short_name: string;
    coach_name: string;
    city_name: string;
    players: Array<Player>;
} & StandingsTeam

export type Player = {
    player_id: string;
    player_firstname: string;
    player_lastname: string;
    height: number;
    nationality: string;
    position_type: Position;
    logo_path: string;
}

type CitySection = {
    city_name: string;
    teams: Array<Team>;
}

export enum Position {
    PG = 'Point Guard',
    SG = 'Shooting Guard',
    SF = 'Short Forward',
    PF = 'Power Forward',
    C = 'Center'
}

const stadiums = ['Palataki', 'Nikos Galis', 'Karaïskakis', 'Peristeri Arena', 'OPAP Arena', 'OAKA', 'Alkazar', 'Marousi Arena', 'Lavrio Arena', 'Pavlos Giannakopoulos', 'Rodou Arena', 'Peristeri Arena'];
const cities = ['Thessaloniki', 'Thessaloniki', 'Pireaus', 'Peristeri', 'Athens', 'Pireaus', 'Athens', 'Larisa', 'Marousi', 'Lavrio', 'Athens', 'Rhodes', 'Peristeri'];
const coaches = ['Razvan Luchescu', 'Akis Mantzios', 'Giorgos Bartzokas', 'Makis Giatras', 'Kestutis Kemzura', 'Oded Kattash', 'Giannis Kastritis', 'Pep Guardiola']
const names = ['PAOK', 'ARIS', 'OLYMPIACOS', 'PERISTERI', 'PANATHINAIKOS', 'AEK', 'LARISA', 'MAROUSI', 'LAVRIO', 'PROMITHEAS', 'KOLOSSOS RODOU', 'APOLLON P.', 'PROMITHEAS']
const short_names = ['PAOK', 'ARIS', 'OSFP', 'ATRO', 'PAO', 'AEK', 'LAR', 'MAR', 'LAV', 'PRO', 'KOL', 'APOL', 'PRO']

const firstnames = ['Giannis', 'Thanasis', 'Kostas', 'Nikos', 'Vassilis', 'Dimitris', 'Giorgos', 'Panagiotis', 'Kostas', 'Dimitris', 'Ioannis', 'Vassilis', 'Kostas', 'Giannis', 'Giorgos', 'Dimitris', 'Kostas', 'Dimitris', 'Ioannis', 'Vassilis', 'Kostas', 'Giannis', 'Giorgos', 'Dimitris', 'Kostas', 'Dimitris', 'Ioannis', 'Vassilis', 'Kostas', 'Giannis', 'Giorgos', 'Dimitris', 'Kostas', 'Dimitris', 'Ioannis', 'Vassilis', 'Kostas', 'Giannis', 'Giorgos', 'Dimitris', 'Kostas', 'Dimitris', 'Ioannis', 'Vassilis', 'Kostas', 'Giannis', 'Giorgos', 'Dimitris', 'Kostas', 'Dimitris', 'Ioannis', 'Vassilis', 'Kostas', 'Giannis', 'Giorgos', 'Dimitris', 'Kostas', 'Dimitris', 'Ioannis', 'Vassilis', 'Kostas', 'Giannis', 'Giorgos', 'Dimitris', 'Kostas', 'Dimitris', 'Ioannis', 'Vassilis', 'Kostas', 'Giannis', 'Giorgos', 'Dimitris', 'Kostas', 'Dimitris', 'Ioannis', 'Vassilis', 'Kostas', 'Giannis', 'Giorgos', 'Dimitris', 'Kostas', 'Dimitris', 'Ioannis', 'Vassilis', 'Kostas']
const greekBasketballPlayers = [
    "Antetokounmpo",
    "Papapetrou",
    "Calathes",
    "Bourousis",
    "Papanikolaou",
    "Gianakopoylos",
    "Borousis",
    "Sloukas",
    "Papagiannis",
    "Papadopoulos",
    "Zisis",
    "Printezis",
    "Spanoulis",
    "Mantzaris",
    "Sloukas",
    "Papagiannis",
    "Papadopoulos",
    "Zisis",
    "Printezis",
    "Spanoulis",
    "Mantzaris",
    "Tentoglou",
    "Mitoglou",
    "Larentzakis",
    "Papagiannis",
    "Mavrokefalidis",
    "Athanasiou",
    "Charalampopoulos",
    "Koufos",
    "Katsikaris",
    "Vasileiadis",
    "Kavvadas",
    "Mitoglou",
    "Larentzakis",
    "Papagiannis",
    "Mavrokefalidis",
    "Athanasiou",
    "Charalampopoulos",
    "Koufos",
    "Katsikaris",
    "Vasileiadis",
    "Kavvadas"
];

const players: Player[] = firstnames.map((item, i) => ({
    height: Math.floor(Math.random() * 50) + 180,
    logo_path: '/messi.png',
    nationality: 'Ελλάδα',
    player_firstname: item,
    player_id: `${i + 1}`,
    player_lastname: greekBasketballPlayers[i] ?? 'No Lastname',
    position_type: Object.values(Position)[Math.floor(Math.random() * Object.values(Position).length)],
}))

export const teams: Team[] = names.map((item, i) => ({
    city_name: cities[i], coach_name: coaches[i], logo_path: '/paok.png',
    players: [...players.slice(i * 5, i * 5 + 5)],
    short_name: short_names[i], stadium_name: stadiums[i], team_id: `${i + 1}`, team_name: item,
    games: [...new Array(10).fill(1).map(item => getRandomGame())]
})).map((team, i) => ({ ...team, ...calculateGame(team) }));


export default function TeamsIndex() {
    const { tourid } = useParams();
    return (
        <section className="w-full h-full py-5">
            <ul className="flex flex-wrap w-full gap-2 relative justify-center">
                {
                    teams.map((team, i) => {
                        return (
                            <li key={i} className="relative  -z-50 min-w-[400px] min-h-[400px] rounded-md">
                                <div className="w-full h-[50%] max-h-[400px] min-h-[400px] bg-white relative rounded-md">
                                    <div className="size-[98%] brightness-50 z-[150] absolute top-[1%] left-[1%] bg-basketball bg-cover bg-no-repeat blur-[2px] bg-center rounded-md"></div>
                                    <div className="w-full z-[100] h-full absolute top-0 left-0 bg-basketball bg-cover bg-no-repeat blur-[0px] bg-center rounded-md"></div>
                                    <img src={team.logo_path} className="w-[200px] scale-[0.8] z-[200] h-[200px] absolute top-[calc(50%-175px)] left-[calc(50%-100px)] object-contain" />
                                    <div className="flex flex-col w-full items-center top-[60%] absolute text-white font-semibold gap-y-1 z-[200]">
                                        <p className="text-xl">{team.team_name}</p>
                                        <p className="text-lg text-gray-200">{team.coach_name}</p>
                                    </div>
                                    <div className="h-[20%] absolute -bottom-[2px] bg-opacity-90 w-full bg-slate-700 *:w-[25%] flex justify-evenly items-center *:-mt-2 z-[200]">
                                        {
                                            [
                                                ['Αγώνες', team.totalGames],
                                                ['Νίκες', team.gamesWon],
                                                ['Ήττες', team.gamesLost],
                                                ['Πόντοι', team.points]
                                            ].map((item, i) => (
                                                <div key={i}>
                                                    <p className="font-semibold text-center text-xl text-sec">{item[1]}</p>
                                                    <p className="text-slate-400 text-center">{item[0]}</p>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                                <ul className="w-full flex flex-col bg-slate-800 rounded-b-md">
                                    {
                                        team.players.slice(0, 6).map((player, index) => (
                                            <li key={index} className="w-full last:rounded-b-md flex items-center justify-between p-2 border-b-[1px] border-b-slate-300">
                                                <div className="flex items-center gap-x-2">
                                                    <img src={player.logo_path} className="size-14 object-contain" />
                                                    <div className="text-slate-200 flex flex-col">
                                                        <p className="text-sec text-base truncate">{player.player_firstname} {player.player_lastname}</p>
                                                        <div className="flex gap-x-4 text-sm text-slate-300">
                                                            <p>{player.nationality}</p>
                                                            <p className="-ml-2 -mr-2 text-slate-400">|</p>
                                                            <p>{(player.height / 100).toFixed(2)}m ύψος</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="text-slate-400 text-sm">{player.position_type}</p>
                                            </li>
                                        ))
                                    }

                                </ul>

                            </li>
                        )
                    })

                }
            </ul>
        </section>
    )
}