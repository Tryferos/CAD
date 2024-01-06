import React from "react";
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

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route
            element={<Layout />}>
            <Route path="/" element={<App />} />
            <Route path="/tournaments">
                <Route index element={<TournamentIndex />} />
                <Route element={<TournamentLayout />}>
                    <Route path=":tourid">
                        <Route index element={<Tournament />} />
                        <Route path="teams">
                            <Route index element={<TeamsIndex />} />
                            <Route path=":teamid" element={<Team />} />
                        </Route>
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
