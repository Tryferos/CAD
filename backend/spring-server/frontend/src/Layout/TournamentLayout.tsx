import React from "react";
import { Link } from "react-router-dom";
import { Outlet, useParams, useResolvedPath } from "react-router-dom";

type SectionType = {
    gr: string;
    en: string;
}
const sections = [{ gr: 'Κατάταξη', en: 'Standings' }, { gr: 'Ομάδες', en: 'Teams' }, { gr: 'Αγωνιστικές', en: 'Matches' }]

export default function TournamentLayout() {
    const { pathname } = useResolvedPath({})
    const { tourid } = useParams()
    const lastSection = pathname.split('/').at(-1)
    const section = lastSection == tourid ? sections[0] : sections.find(item => item.en.toLowerCase() == lastSection.toLowerCase()) ?? sections[0]

    return (
        <div>
            <Layout section={section} tourid={tourid} />
            <main className="mt-[75px] min-h-[calc(80vh-75px)] p-5">
                <Outlet />
            </main>
        </div>
    );
}

function Layout({ section, tourid }: { section: SectionType; tourid: string }) {
    return (
        <nav className="fixed z-[999] shadow-[0px_4px_2px_0px_rgba(0,0,0,0.1)] top-0 flex-1 mobile:w-[100vw] w-[calc(100vw-clamp(200px,15%,250px)-0px)] h-[75px] bg-gradient-to-r from-slate-100 to-white flex justify-between">
            <ul className="flex items-center basis-[120%] h-full px-5 mobile:gap-x-5 mobile:px-2 gap-x-10 text-slate-600 font-medium *:cursor-pointer *:text-lg *:underline-offset-[16px] *:decoration-sec *:decoration-4">
                {
                    sections.map((item, i) => {
                        return (
                            <li key={i} className={`hover:underline ${section == item && 'underline text-lg mobile:text-base font-semibold'}`}>
                                <Link to={`/tournaments/${tourid}/${item.en.toLocaleLowerCase()}`}>{item.gr}</Link>
                            </li>
                        )
                    })
                }
            </ul>
            <p className="text-center basis-[50%] font-medium text-lg px-5 flex items-center justify-center py-4 bg-amber-100 text-slate-700 rounded-md">Τουρνουά Ευρώπης</p>
        </nav>
    )
}