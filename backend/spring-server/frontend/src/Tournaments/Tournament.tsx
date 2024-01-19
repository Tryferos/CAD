import React from "react"
import { useParams } from "react-router-dom"
export default function Tournament(props) {
    const { tourid } = useParams()
    return <p>Tournament with id {tourid}</p>
}