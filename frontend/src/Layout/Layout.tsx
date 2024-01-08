import { Outlet } from "react-router-dom";
import React, { useState } from 'react';
import { SearchElement } from "@tryferos/search";
import { BasketballIcon, SearchIcon } from "../icons";
import { motion, AnimatePresence } from 'framer-motion'

export default function Layout() {
    return (
        <div className="w-[100vw] h-[100vh] flex">
            <NavigationBar />
            <main className="ml-[clamp(200px,15%,250px)] mobile:ml-[0%] mobile:w-[100%]  w-[85%] overflow-y-auto scrollbar">
                <Outlet />
            </main>
        </div>
    );
}

function NavigationBar() {
    return (
        <nav className="w-[15%] mobile:hidden min-w-[200px] max-w-[250px] bg-gradient-to-r from-slate-300 to-slate-100 flex fixed flex-col gap-y-10 h-full text-slate-800 font-wotfard">
            <section className="px-4">
                <div className="h-[75px] flex items-center justify-center">
                    <p className="font-cubano text-2xl  text-sec">BasketStats</p>
                </div>
                <SearchElement
                    sections={[]}
                >
                    <SearchBar />
                </SearchElement>
            </section>
            <section className="flex flex-col gap-y-4 pb-2">
                <HeaderText text={'Διοργανώσεις'} href={'/tournaments'} />
                <ul className=" flex flex-col gap-y-4 *:py-3 px-2">
                    {
                        [{
                            name: 'Τουρνουά Ελλάδος'
                        },
                        {
                            name: 'Τουρνουά Ευρώπης'
                        },
                        {
                            name: 'Τουρνουά Γαλλίας'
                        }
                        ].map((item, i) => {
                            return (
                                <motion.li key={i}
                                    data-selected={i == 1}
                                    animate={{ opacity: 1 }}
                                    initial={{ opacity: 0 }}
                                    transition={{ duration: 0.2, delay: 0.2 * i + 0.2 }}
                                    className="font-sans hover:scale-[1.01]  flex data-[selected=true]:shadow-box hover:shadow-box items-center data-[selected=true]:bg-slate-300
                                    px-2 truncate gap-x-2 flex-1 hover:bg-slate-300 rounded-md justify-between font-medium text-sm text-slate-600 hover:text-slate-900 cursor-pointer transition-all">
                                    <img src={'/basketball.svg'} width={20} height={20} className="basis-[10%]" />
                                    <p className="font-semibold text-start basis-[120%]">{item.name}</p>
                                </motion.li>
                            )
                        })
                    }
                </ul>
            </section>
            <section className="flex flex-col gap-y-4">
                <HeaderText text={'Κορυφαίες Ομάδες'} />
                <ul className=" flex flex-col gap-y-4 *:py-3 px-2">
                    {
                        [{
                            team_name: 'Π.Α.Ο.Κ.',
                            logo_path: '/paok.png'
                        },
                        {
                            team_name: 'Ρεάλ Μαδρίτης'
                        },
                        {
                            team_name: 'ΤΣΣΚΑ Μόσχας'
                        }
                        ].map((item, i) => {
                            return (
                                <motion.li key={i}
                                    animate={{ opacity: 1 }}
                                    initial={{ opacity: 0 }}
                                    transition={{ duration: 0.2, delay: 0.2 * i + 0.2 }}
                                    className="font-sans flex items-center px-2 truncate gap-x-2 flex-1 hover:bg-slate-300 rounded-md justify-between font-medium text-sm text-slate-600 hover:text-slate-900 cursor-pointer transition-all">
                                    <img src={item.logo_path ?? '/basketball.svg'} width={20} height={20} className="basis-[10%]" />
                                    <p className="font-semibold text-start basis-[120%]">{item.team_name}</p>
                                </motion.li>
                            )
                        })
                    }
                </ul>
            </section>
        </nav>
    )
}

function HeaderText({ text, href }: { text: string, href?: string }) {
    if (!href) return (
        <div className="text-center border-b-[1px] border-b-slate-300 pb-4 font-sans font-semibold flex items-center justify-center gap-x-2">
            <p>{text}</p>
        </div>
    )
    return (
        <div className="text-center border-b-[1px] border-b-slate-300 pb-4 font-sans font-semibold flex items-center justify-center gap-x-2">
            <a href={href} className="cursor-pointer">{text}</a>
        </div>
    )
}

function SearchBar() {
    return (
        <div className="w-full h-[25px] justify-between px-2 text-slate-600 transition-all hover:text-slate-900 flex items-center py-5 bg-gradient-to-r from-slate-300 via-slate-300 to-slate-200 rounded-md cursor-pointer">
            <p className="font-sans px-2 font-medium text-sm">Αναζήτηση...</p>
            <SearchIcon />
        </div>
    )
}