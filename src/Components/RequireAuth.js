import React from 'react'
import { GetUserId } from './GetUserId'

export default function RequireAuth(props) {

    const accessToken = sessionStorage.getItem('accessToken')
    const userId = GetUserId(accessToken)

    if(!accessToken) {
        return (
            <div style={{fontSize: "26px"}}>Error. Please login.</div>
          )
    }

    return React.cloneElement(props.children, { accessToken, userId })
}