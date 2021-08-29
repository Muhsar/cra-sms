import React from 'react'
import jwt_decode from "jwt-decode"
import { useParams, Redirect } from "react-router-dom"
export default function ErrorPage(props) {
    console.log(props)
    const {location, match} = props
    const easysch_token = jwt_decode(localStorage?.easysch_token)
    const {slug} = useParams()
    console.log(useParams())
    if(localStorage?.easysch_token && localStorage!=="undefined" && easysch_token?.groups.length===1 && easysch_token?.groups[0]==="Owner") {
        window.location = `/${localStorage?.schoolSlug}/school`
    }
    if(localStorage?.easysch_token && localStorage!=="undefined" && easysch_token?.groups.length===1 && easysch_token?.groups[0]==="Teacher") {
        window.location = `/${localStorage?.schoolSlug}/staff`
    }
    if(localStorage?.easysch_token && localStorage!=="undefined" && easysch_token?.groups.length===1 && easysch_token?.groups[0]==="Secretary") {
        window.location = `/${localStorage?.schoolSlug}/secretary`
    }
    if(localStorage?.easysch_token && localStorage!=="undefined" && easysch_token?.groups.length===1 && easysch_token?.groups[0]==="Burasr") {
        window.location = `/${localStorage?.schoolSlug}/bursar`
    }
    if(localStorage?.easysch_token && localStorage!=="undefined" && easysch_token?.groups.length===1 && easysch_token?.groups[0]==="Parent") {
        window.location = `/${localStorage?.schoolSlug}/parent`
    }
    if(!localStorage?.easysch_token) {
        window.location = `/${match.params.slug}/parent`
    }
    return (
        <>
        </>
    )
}
