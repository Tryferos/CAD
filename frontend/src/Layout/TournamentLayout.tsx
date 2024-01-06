import React from "react";
import { Outlet } from "react-router-dom";

export default function TournamentLayout() {
    return (
        <div>
            <Layout />
            <main className="mt-[75px] min-h-[calc(100vh-75px)] p-5 ">
                <Outlet />
            </main>
        </div>
    );
}

function Layout() {
    return (
        <nav className="fixed top-0 w-full h-[75px] bg-gradient-to-r from-slate-100 to-white">
            <ul className="flex items-center h-full px-5 gap-x-10 text-slate-600 font-medium *:cursor-pointer *:text-lg *:underline-offset-[16px] *:decoration-sec *:decoration-4">
                <li className="hover:underline"><a href="/teams">Standings</a></li>
                <li data-selected={true}
                    className="data-[selected=true]:underline data-[selected=true]:font-semibold data-[selected=true]:text-lg "><a href="/teams">Teams</a></li>
                <li className="hover:underline"><a href="/teams">Matches</a></li>
            </ul>
        </nav>
    )
}