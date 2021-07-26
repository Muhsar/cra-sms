import React from 'react'
import jwt_decode from "jwt-decode"
import { useParams, Redirect } from "react-router-dom"
export default function ErrorPage(props) {
    console.log(props)
    const {location, match} = props
    const token = jwt_decode(localStorage?.token)
    const {slug} = useParams()
    console.log(useParams())
    // if(localStorage?.token && localStorage!=="undefined" && token?.groups.length===1 && token?.groups[0]==="School Owner") {
    //     return(
    //     <Redirect to={{
    //           pathname: `/${match.params.slug}/school`,
    //           state: { from: location }
    //         }} />
    //     )
    // }
    // if(localStorage?.token && localStorage!=="undefined" && token?.groups.length===1 && token?.groups[0]==="Teacher") {
    //     return(
    //     <Redirect to={{
    //           pathname: `/${match.params.slug}/staff`,
    //           state: { from: location }
    //         }} />
    //     )
    // }
    // if(!localStorage?.token) {
    //     return(
    //     <Redirect to={{
    //           pathname: `/${match.params.slug}/login`,
    //           state: { from: location }
    //         }} />
    //     )
    // }
    return (
        <>
            {
                !localStorage?.token && <Redirect to={{
              pathname: `/${match.params.slug}/login`,
              state: { from: location }
            }} />
            }
            {
                localStorage?.token && localStorage!=="undefined" && token?.groups.length===1 && token?.groups[0]==="Teacher" &&  <Redirect to={{
              pathname: `/${match.params.slug}/staff`,
              state: { from: location }
            }} />
            }
            {
                localStorage?.token && localStorage!=="undefined" && token?.groups.length===1 && token?.groups[0]==="School Owner" && <Redirect to={{
              pathname: `/${match.params.slug}/school`,
              state: { from: location }
            }} />
            }
            <>you are not supposed to be here</>
        </>
    )
}
