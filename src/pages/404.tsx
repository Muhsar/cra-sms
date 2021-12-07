import React from 'react'
import jwt_decode from "jwt-decode"
import { useParams, Redirect } from "react-router-dom"
export default function ErrorPage(props) {
    console.log(props)
    const {location, match} = props
    const easysch_token: {groups: any} = jwt_decode(localStorage?.easysch_token)
    const params: {slug: any} = useParams()
    const slug = params.slug
    console.log(useParams())
    if(localStorage?.easysch_token && easysch_token?.groups.length===1 && easysch_token?.groups[0]==="Owner") {
        window.location.href = `/${localStorage?.schoolSlug}/school`
    }
    if(localStorage?.easysch_token && easysch_token?.groups.length===1 && easysch_token?.groups[0]==="Teacher") {
        window.location.href = `/${localStorage?.schoolSlug}/staff`
    }
    if(localStorage?.easysch_token && easysch_token?.groups.length===1 && easysch_token?.groups[0]==="Secretary") {
        window.location.href = `/${localStorage?.schoolSlug}/secretary`
    }
    if(localStorage?.easysch_token && easysch_token?.groups.length===1 && easysch_token?.groups[0]==="Burasr") {
        window.location.href = `/${localStorage?.schoolSlug}/bursar`
    }
    if(localStorage?.easysch_token && easysch_token?.groups.length===1 && easysch_token?.groups[0]==="Parent") {
        window.location.href = `/${localStorage?.schoolSlug}/parent`
    }
    if(!localStorage?.easysch_token) {
        window.location.href = `/${match.params.slug}/parent`
    }
    return (
        <>
        </>
    )
}
