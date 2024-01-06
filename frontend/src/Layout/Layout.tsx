import { Outlet } from "react-router-dom";
import React from 'react';

export default function Layout() {
    return (
        <div className="w-[100vw] h-[100vh]">
            <h1>Layout</h1>
            <Outlet />
        </div>
    );
}