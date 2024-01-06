import React from "react"
import { useParams } from "react-router-dom";
export default function TeamsIndex() {
    const { tourid } = useParams();
    return <div>This page will display all teams from tournament with id {tourid} </div>;
}