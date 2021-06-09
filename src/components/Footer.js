import React from 'react'
import styled from 'styled-components'

const MyFooter = styled.footer`
    width: 100%;
    height: 10vh;
    background-color: white;
    color: black;
    display: flex;
    align-items: center;
    justify-content: center;
    p {
        font-weight: 500;
        a {
            text-decoration: none;
            color: #6c5ce7;
        }
    }
`
 
export default function Footer() {
    return (
        <>
            <MyFooter>
                <p>Creado por <a href="https://robertrm0.github.io/" rel="noreferrer" target="_blank" >@robertrm0</a></p>
            </MyFooter>
        </>
    )
}
