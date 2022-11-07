import React from 'react'
import jwtDecode from "jwt-decode"
import { useParams, Redirect } from "react-router-dom"
export default function ErrorPage(props) {
    const {location, match} = props
    const easysch_token: {groups: any} = jwtDecode(localStorage?.easysch_token)
    const params: {slug: any} = useParams()
    const slug = params.slug
    if(localStorage?.easysch_token && easysch_token?.groups.length===1 && easysch_token?.groups[0]==="Owner") {
        window.location.href = `/`
    }
    if(localStorage?.easysch_token && easysch_token?.groups.length===1 && easysch_token?.groups[0]==="Teacher") {
        window.location.href = `/`
    }
    if(localStorage?.easysch_token && easysch_token?.groups.length===1 && easysch_token?.groups[0]==="Secretary") {
        window.location.href = `/`
    }
    if(localStorage?.easysch_token && easysch_token?.groups.length===1 && easysch_token?.groups[0]==="Bursar") {
        window.location.href = `/`
    }
    if(localStorage?.easysch_token && easysch_token?.groups.length===1 && easysch_token?.groups[0]==="Parent") {
        window.location.href = `/`
    }
    if(!localStorage?.easysch_token) {
        window.location.href = `/${match.params.slug}`
    }
    return (
        <>
        </>
    )
}
