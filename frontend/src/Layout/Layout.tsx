import { Outlet, Link } from "react-router-dom";
import React, { Fragment, useState } from 'react';
import { SearchElement } from "@tryferos/search";
import { BasketballIcon, LogoutIcon, SearchIcon, UserIcon } from "../icons";
import { motion, AnimatePresence } from 'framer-motion'
import { PopupType, Wrapper, usePopup, useUser } from "./Wrapper";
import PopupElement from "../Popup/PopupElement";
import { PopupItem } from "../Popup/PopupItem";
import { Login } from "../Popup/Login";
import Team from "../Popup/Team";
import Player from "../Popup/Players";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Championship from "../Popup/Championship";
import Score from "../Popup/Score";

export default function Layout() {
    return (
        <Fragment>
            <Wrapper>
                <div className="w-[100vw] h-[100vh] flex z-[999]">
                    <div className="z-[9999999999999999999]">
                        <ToastContainer
                            position='top-center'
                            autoClose={5000}
                            newestOnTop={true}
                            limit={2}
                        />
                    </div>
                    <NavigationBar />
                    <main className="ml-[clamp(200px,15%,250px)] mobile:ml-[0%] mobile:w-[100%]  w-[85%] overflow-y-auto scrollbar">
                        <Outlet />
                    </main>
                    <PopupElement>
                        <PopupItem popup={PopupType.login} element={<Login />} />
                        <PopupItem popup={PopupType.team} element={<Team />} />
                        <PopupItem popup={PopupType.player} element={<Player />} />
                        <PopupItem popup={PopupType.championship} element={<Championship />} />
                        <PopupItem popup={PopupType.score} element={<Score />} />
                    </PopupElement>
                </div>
            </Wrapper>
        </Fragment>
    );
}

function NavigationBar() {
    return (
        <nav className="w-[15%] z-[20000] mobile:hidden min-w-[200px] max-w-[250px] bg-gradient-to-r from-slate-300 to-slate-100 flex fixed flex-col gap-y-10 h-full text-slate-800 font-wotfard">
            <section className="px-4 z-[200000]">
                <div className="h-[75px] flex items-center justify-center">
                    <p className="font-cubano text-2xl  text-sec">BasketStats</p>
                </div>
                <SearchElement
                    shadow={false}
                    sections={[
                        {
                            items: [{
                                content: 'Super League, ΝΒΑ',
                                title: 'PAOK',
                                href: ''
                            }],
                            title: 'Ομάδες',
                        },
                        {
                            items: [{
                                content: '',
                                title: 'Διοργάνωση 1',
                                href: ''
                            }],
                            title: 'Διοργανώσεις',
                        },
                    ]}
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
                                    className="font-sans hover:scale-[1.01] data-[selected=true]:outline outline-1 outline-slate-300  flex data-[selected=true]:shadow-box hover:shadow-box items-center data-[selected=true]:bg-slate-300
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
            <Logging />
        </nav>
    )
}

function Logging() {

    const { user, handleLogIn, handleLogOut } = useUser();
    const { popup, handlePopup } = usePopup();

    return (
        <section className="flex absolute bottom-20 w-full justify-center font-medium font-sans flex-col items-center gap-y-5">
            <div className="flex flex-col text-center gap-y-2 w-full"><p className="font-semibold border-b-[1px] border-b-gray-300 pb-4 w-full mb-4">{user?.username ?? 'Guest'}</p>
            </div>
            {
                user &&
                <Link to={'/admin'}
                    className="flex transition-all duration-150 gap-x-2 items-center outline shadow-shadowSec text-sm outline-[2px] rounded font-semibold text-sec cursor-pointer outline-sec hover:bg-sec hover:text-white hover:shadow-shadowSecHover px-4 py-2" >
                    <UserIcon /><p>Λογαριασμός</p>
                </Link>

            }
            {
                user ?
                    <div onClick={() => handleLogOut()}
                        className="flex gap-x-2 transition-all duration-150 items-center outline shadow-shadowRed text-sm outline-[2px] rounded font-semibold text-red-600 cursor-pointer outline-red-600 hover:bg-red-600 hover:text-white hover:shadow-shadowRedHover px-4 py-2"><LogoutIcon /><p>Αποσύνδεση</p></div>
                    :
                    <input type='button' onClick={() => handlePopup(PopupType.login, 'Σύνδεση')} value='Συνδέσου' className="outline shadow-shadowSec text-sm outline-[2px] rounded font-semibold text-sec cursor-pointer outline-sec hover:bg-sec hover:text-white hover:shadow-shadowSecHover px-4 py-2" />
            }

        </section>
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