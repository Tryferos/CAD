import React, { useState, useEffect, useContext, createContext, ReactNode } from "react";
import PopupElement from "../Popup/PopupElement";
export type User = {
    user_id: string;
    username: string;
    role: 'admin' | 'secretary';
}

export type UserCredentials = {
    username: string;
    password: string;
}

export enum PopupType {
    login = 'login',
    team = 'team',
    player = 'player',
}

const UserContext = createContext({ user: null, handleLogIn: () => { }, handleLogOut: () => false }) as
    React.Context<{ user: User | null; handleLogIn: (user: UserCredentials, callback: (success: boolean, error?: string) => void) => void; handleLogOut: () => boolean }>;

const PopupContext = createContext({ popup: null, handlePopup: (popup: ReactNode, title?: string, data?: unknown) => { }, title: '' }) as
    React.Context<{ popup: PopupType | null; handlePopup: (popup: ReactNode, data?: unknown) => void, title: string }>;

export function Wrapper({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>({ user_id: '1', username: 'iee2020085', role: 'admin' });
    const [popup, setPopup] = useState<PopupType | null>(null);
    const [popupData, setPopupData] = useState<unknown | null>(null);
    const [title, setTitle] = useState<string>();

    const handlePopup = (popup: PopupType, title?: string, data?: unknown) => {
        setPopup(popup);
        setPopupData(data);
        setTitle(title);
    }

    const handleLogIn = (user: UserCredentials, callback: (success: boolean, error?: string) => void) => {
        //TODO: Log in user
        setUser({
            user_id: '1',
            username: user.username,
            role: 'admin'
        })
        callback(true);
    }
    const handleLogOut = () => {
        if (!user) return false;
        setUser(null);
        return true;
    }



    return (
        <UserContext.Provider value={{ user: user, handleLogIn: handleLogIn, handleLogOut: handleLogOut }}>
            <PopupContext.Provider value={{ popup: popup, handlePopup: handlePopup, title: title }}>
                {children}
            </PopupContext.Provider>
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext);
export const usePopup = () => useContext(PopupContext);
