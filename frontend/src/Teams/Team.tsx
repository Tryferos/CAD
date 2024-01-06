import React from "react"
import { useParams } from "react-router-dom"
export default function Team() {
    const { teamid, tourid } = useParams();
    return <div>Hey team with id {teamid} and tournament id {tourid}</div>;
}