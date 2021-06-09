import React from 'react'
import styled from 'styled-components';


const ModalInfo = styled.div `
    width: 100%;
    height: 110vh !important;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: rgba(0,1,20,.719);
    display: flex;
    align-items: center;
    justify-content: center;

    .modal {
        width: 500px;
        background-color: white;
        border-radius: 10px;
        padding: 1em 1em;
        display: flex;
        flex-direction: column;
        justify-content: centers;
        align-items: center;
        text-align: center;
        word-wrap: break-word !important;
        div 
        {
            padding: 0.5em;
            h1 {
                color: #6c5ce7;
            }
            h3, h4{
                font-weight: 400;
                font-size: 105%;
            }
            
            a {
                text-decoration: none;
                padding: 8px 1em;
                background-color: #6c5ce7;
                color: white;
                font-weight: 500;
                border-radius: 5px;
            }
        }
    }

    .forkinfo {
        display: flex;
        flex-direction: row;
        div {
            padding: 0 0.5em;
        }
    }

    @media (max-width: 1000px) {
        .modal {
            width: 350px;
            h1 {
                font-size: 140%;
            }
        }

    }

`;


const Modal = (props) => {
    
    const datos = props.datos

    return (
        <>
            <ModalInfo onClick={
                props.closeModal
            }
                className="contentModal" >
                <div className="modal">
                    <div>
                        <h1>
                            {datos.name}
                        </h1>
                    </div>
                  <div>  <h3><b>Descripcion:</b> {datos.description ? datos.description : 'No disponible'} </h3></div>
                    <div> <h4><b>Lenguaje:</b> {datos.language}</h4></div>
                    <div className="forkinfo">
                        <div>
                            <i className="fas fa-code-branch"></i> {datos.forks_count}
                        </div>
                        <div>
                            <i className="fas fa-eye"></i> {datos.watchers}
                        </div>
                    </div>
                    <div>
                        <a href={datos.html_url} rel="noreferrer" target="_blank" >Ver repositorio <i className="fas fa-external-link-alt"></i></a>
                    </div>
                </div>
            </ModalInfo>
        </>
    )
}

export default Modal
