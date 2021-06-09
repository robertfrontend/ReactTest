import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'


const TablaUsers = styled.div`
    margin-top: 1em;
    width: 100%;
    min-height: 20vh;
    padding: 1em 1em;
    background-color: #dfe6e9;
    border-radius: 10px;

    display: flex;
    flex-direction: row !important;
    justify-content: space-between;
    align-items: center;
    flex-wrap:wrap;
    h3 {
        text-align: center;
        margin: 0 auto;
    }

`;

const ItemUser = styled.div`
    width: 100%;
    min-height: 10vh;
    background-color: white;
    border-radius: 10px;
    margin: 1em 0;
    padding: 0.5em 0;
    box-shadow: 0px 2px 10px #b2bec3;
    border-right: 5px solid #6c5ce7;
    display: flex;
    flex-direction: row;
    align-items: center;
    text-decoration: none;
    a {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: stretch;
        text-decoration: none;
    }

    .indice {
        font-size: 1em;
        padding:0  1em;
        font-weight: bold;
        color: #6c5ce7;
    }

    .avatar {
        padding:0 1em;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
            width: 70px;
            object-fit: cover;
            border-radius: 50px;
        }
    }
    .name {
        padding-left: 1em;
        text-align: center;
        font-weight: bold;
        font-size: 120%;
        color: #6c5ce7;
    }
`

const Tabla = (props) => {
    const { cantidad, usuarios } = props;
    console.log(usuarios);

    if (usuarios) {
        return (
            <>
             <TablaUsers >
                    
                    {
                        usuarios.length === 0 ? <h3>No hay resultados</h3> : <h3>  Cantidad de usuarios: {cantidad} </h3>
                    }
                    {
                        usuarios.map(((usuario, index) => {
                            return (
                                <ItemUser key={usuario.login}>
                                    <Link to={`/detalles/${usuario.login}`} >
                                        <div className="indice">{index + 1}</div>
                                            <div className="avatar">
                                                <img src={usuario.avatar_url} alt="" />
                                            </div>
                                            <div className="name">
                                                <h4>{usuario.login}</h4>
                                        </div>
                                        <div className="seguidores" >
                                        </div>
                                    </Link>
                                </ItemUser>
                            )
                        }))
                    }
                </TablaUsers>
            </>
        )
    }

}

export default Tabla