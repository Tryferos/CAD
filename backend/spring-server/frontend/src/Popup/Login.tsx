import React from "react";
import { usePopup, useUser } from "../Layout/Wrapper";

export function Login() {
    const { user, handleLogIn, handleLogOut } = useUser();
    const { popup, handlePopup } = usePopup();
    const onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        const el = ev.target as HTMLFormElement;
        if (!el.checkValidity()) {
            //TODO: Show error
            return;
        }
        const username = el.username.value;
        const password = el.password.value;
        handleLogIn({ username, password }, (success) => {
            if (success) {
                handlePopup(null);
            }
        });
    }
    return (
        <form onSubmit={onSubmit} className="flex flex-col w-full items-center gap-y-8 mt-10">
            <fieldset className="flex flex-col w-[60%] gap-y-1">
                <label className="text-lg font-semibold text-slate-700" htmlFor="username">Όνομα χρήστη</label>
                <input required minLength={4} className="border-b-2 border-b-slate-400 py-2 outline-none" placeholder="Όνομα" type="text" name="username" id="username" />
            </fieldset>
            <fieldset className="flex flex-col w-[60%] gap-y-1">
                <label className="text-lg font-semibold text-slate-700" htmlFor="password">Κωδικός</label>
                <input required minLength={4} className="border-b-2 border-b-slate-400 py-2 outline-none" placeholder="********" type="password" name="password" id="password" />
            </fieldset>
            <button className="py-4 mt-10 px-6 rounded-xl bg-sec text-white font-semibold hover:brightness-110" type="submit">Συνδέσου</button>
        </form>
    )
}