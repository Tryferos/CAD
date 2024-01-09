import React, { useState, useEffect, useContext, createContext } from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import App from "./App";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Outlet,
    Route,
    RouterProvider,
} from "react-router-dom";
import Layout from "./Layout/Layout";
import TeamsIndex from "./Teams";
import TournamentIndex from "./Tournaments/TournamentIndex";
import Team from "./Teams/Team";
import Tournament from "./Tournaments/Tournament";
import TournamentLayout from "./Layout/TournamentLayout";
import Standings from "./Tournaments/Standings";
import Matches from "./Tournaments/Matches";
import { Wrapper } from "./Layout/Wrapper";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route index element={<App />} />
            <Route path="tournaments">
                <Route index element={<TournamentIndex />} />
                <Route element={<TournamentLayout />}>
                    <Route path=":tourid">
                        <Route index element={<Standings />} />
                        <Route path="teams">
                            <Route index element={<TeamsIndex />} />
                            <Route path=":teamid" element={<Team />} />
                        </Route>
                        <Route path="standings" element={<Standings />} />
                        <Route path="matches" element={<Matches />} />
                    </Route>
                </Route>
            </Route>
        </Route>
    )
);

ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
