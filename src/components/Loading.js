import React from 'react'
import styled from 'styled-components'

const ContetLoading = styled.div`
    width: 100%;
    text-align: center;
`

function Loading() {
    return (
        <>
            <ContetLoading>
                <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </ContetLoading>
        </>
    )
}

export default Loading
