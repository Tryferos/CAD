import React, { useState, useEffect, useContext, createContext, ReactNode } from "react";
import PopupElement from "../Popup/PopupElement";
import { encode } from 'base-64'
import { toast } from 'react-toastify';
export type User = {
    username: string;
    role: 'ADMIN' | 'SECRETARY';
}

export type UserCredentials = {
    username: string;
    password: string;
}

export enum PopupType {
    login = 'login',
    team = 'team',
    player = 'player',
    championship = 'championship',
    score = 'score',
}

const UserContext = createContext({ user: null, handleLogIn: () => { }, handleLogOut: () => false, authRequest: () => null }) as
    React.Context<{
        user: User | null; handleLogIn: (user: UserCredentials, callback: (success: boolean, error?: string) => void) => void; handleLogOut: () => boolean;
        authRequest: (method: 'GET' | 'POST' | 'PUT' | 'DELETE', body?: unknown) => RequestInit;
    }>;

const PopupContext = createContext({ popup: null, handlePopup: (popup: ReactNode, title?: string, data?: unknown) => { }, title: '', data: null }) as
    React.Context<{ popup: PopupType | null; handlePopup: (popup: ReactNode, title?: string, data?: unknown) => void, title: string, data: unknown }>;

export function Wrapper({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [popup, setPopup] = useState<PopupType | null>(null);
    const [popupData, setPopupData] = useState<unknown | null>(null);
    const [title, setTitle] = useState<string>();
    const [token, setToken] = useState<string>();

    const handlePopup = (popup: PopupType, title?: string, data?: unknown) => {
        setPopup(popup);
        setPopupData(data);
        setTitle(title);
    }

    const handleLogIn = (user: UserCredentials, callback: (success: boolean, error?: string) => void) => {
        if ((token && token.length > 0) && user) {
            callback(true, 'Already authorized');
            return;
        }
        (async () => {
            const promise = new Promise(async (resolve, reject) => {
                let encoded: string;
                try {
                    encoded = encode(`${user.username}:${user.password}`)
                } catch (err) {
                    reject();
                    callback(false, 'Wrong credentials');
                    return;
                }
                try {
                    const res = await fetch(`${process.env.NODE_ENV == 'development' ? `http://localhost:${process.env.REACT_APP_SERVER_PORT}` : ''}/api/token`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            "Authorization": 'Basic '.concat(encoded),
                        },
                    })
                    if (res.status != 200) {
                        reject();
                        callback(false, 'Wrong credentials');
                        return;
                    }
                    const token = await res.json();
                    setToken(token.token);
                    setUser({
                        username: token.username,
                        role: token.userDetails,
                    })
                    resolve(null);
                    callback(true);
                } catch (err) {
                    reject()
                }
            })
            toast.promise(promise, {
                error: 'Λάθος στοιχεία χρήστη',
                success: 'Επιτυχής σύνδεση',
                pending: 'Πραγματοποιείται σύνδεση'
            })
        })()
    }
    const handleLogOut = () => {
        if (!user) return false;
        setUser(null);
        setToken(null);
        return true;
    }

    const authRequest = (method: 'GET' | 'POST' | 'PUT' | 'DELETE', body?: unknown) => {
        return {
            body: JSON.stringify(body),
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '.concat(token ?? ''),
            }
        } as RequestInit;
    }



    return (
        <UserContext.Provider value={{ user: user, handleLogIn: handleLogIn, handleLogOut: handleLogOut, authRequest: authRequest }}>
            <PopupContext.Provider value={{ popup: popup, handlePopup: handlePopup, title: title, data: popupData }}>
                {children}
            </PopupContext.Provider>
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext);
export const usePopup = () => useContext(PopupContext);
