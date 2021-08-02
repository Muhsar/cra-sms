import React from 'react'
import jwt_decode from "jwt-decode"
import { useParams, Redirect } from "react-router-dom"
export default function ErrorPage(props) {
    console.log(props)
    const {location, match} = props
    const token = jwt_decode(localStorage?.token)
    const {slug} = useParams()
    console.log(useParams())
    if(localStorage?.token && localStorage!=="undefined" && token?.groups.length===1 && token?.groups[0]==="School Owner") {
        window.location = `/${localStorage?.schoolSlug}/school`
    }
    if(localStorage?.token && localStorage!=="undefined" && token?.groups.length===1 && token?.groups[0]==="Teacher") {
        window.location = `/${localStorage?.schoolSlug}/staff`
    }
    if(localStorage?.token && localStorage!=="undefined" && token?.groups.length===1 && token?.groups[0]==="Secretary") {
        window.location = `/${localStorage?.schoolSlug}/secretary`
    }
    if(localStorage?.token && localStorage!=="undefined" && token?.groups.length===1 && token?.groups[0]==="Burasr") {
        window.location = `/${localStorage?.schoolSlug}/bursar`
    }
    if(localStorage?.token && localStorage!=="undefined" && token?.groups.length===1 && token?.groups[0]==="Parent") {
        window.location = `/${localStorage?.schoolSlug}/parent`
    }
    if(!localStorage?.token) {
        window.location = `/${match.params.slug}/parent`
    }
    return (
        <>
        </>
    )
}
