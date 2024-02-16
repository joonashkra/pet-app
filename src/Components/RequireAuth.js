import React from 'react'

export default function RequireAuth(props) {
    const accessToken = sessionStorage.getItem('accessToken')

    if(!accessToken) {
        return (
            <div style={{fontSize: "26px"}}>Error. Please login.</div>
          )
    }

    return React.cloneElement(props.children, { accessToken })
}
