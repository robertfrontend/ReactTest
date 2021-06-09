import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import Modal from '../components/Modal';



const HeaderUser = styled.div`
    width: 90%;
    margin: 0 auto;
    margin-top: 2em;
    padding: 3em 1em;
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    border-bottom: 2px solid #dfe6e9;
    background-color: white;
    box-shadow: 0px 0px 20px #b2bec3;
    border-left: 5px solid #452feb8e;
    position: relative;
    border-radius: 10px;
    i {
        color: #6c5ce7;
    }
    color: #34495e;

    div {
        min-height: inherit;
    }
    .avatar {
        width: 130px;
        border-radius: 100px;
        margin: 0 1.5em;
        img {
            width: inherit;
            height: inherit;
            border-radius: inherit;
        }
    }
    .infogen {
        padding-top: 2em;
        width: 80%;
        margin: 0 auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        div {
            padding: 0.5em 1em;
            margin: 0.4em 0;
            border-radius: 20px;
            box-shadow: 0px 0px 20px #b2bec3;
            color: #6c5ce7;
            font-size: 90%;
        }
    }
    @media (max-width: 1000px) {
        width: 100%;
        .avatar{
            margin: 0 auto;
        }
        .infogen {
            width: 100%;
        }

    }
    
`;


const ContentRepo = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`

const ItemRepo = styled.div`
    margin-top: 2em;
    width: 25%;
    padding: 1em 1em;
    text-align: center;
    cursor: pointer;
    border-left: 3px solid #452feb8e;
    border-bottom: 3px solid #452feb8e;
    box-shadow: 0px 0px 10px #b2bec3;
    border-radius: 4px;
    background-color: #6c5ce7;
    color: white;
    :hover {
        transition: all .2s;
        background-color: #452feb8e;
    }
    @media (max-width: 1000px) {
        width: 100%;
    }
`

const ModalInfo = styled.div`
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
        width: 450px;
        background-color: white;
        border-radius: 10px;
        padding: 1em 1em;
        display: flex;
        flex-direction: column;
        justify-content: centers;
        align-items: center;
        text-align: center;
        div 
        {
            padding: 1em;
            h1 {
                color: #6c5ce7;
            }
            h3, h4{
                font-weight: 400;
            }
        }
    }

    @media (max-width: 1000px) {
        .modal {
            width: 350px;
        }

    }

`;


const Loading = styled.div`
    width: 100%;
    text-align: center;
    font-size: 5em;
    color: #6c5ce7;
`

const DetailUser = (props) => {
    const [user, setUser] = useState(props.match.params.id)

    const [general, setGeneral] = useState({})
    const [repos, setRepos] = useState([])

    const [openmodal, setOpenModal] = useState(false)
    const [reposelect, setRepoSelect] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {

        getDatosUser()

        return () => {
        }
    }, [])

    const getDatosUser = async () => {
        setIsLoading(true)
        const url = 'https://api.github.com/users'

        try {
            const response = await axios.get(`${url}/${user}`)
            const data = response.data
            setGeneral({
                name: data.name,
                username: data.login,
                avatar: data.avatar_url,
                email: data.email,
                bio: data.bio,
                location: data.location,
                url: data.url,
                followers: data.followers,
                following: data.following,
                repos: data.public_repos,
                url_repos: data.repos_url
            })

            getRepos()

        } catch (error) {
            console.error(error, 'error');
        }
        setIsLoading(false)

    }

    const getRepos = async () => {
        setIsLoading(true)
        try {
            const response = await axios.get(`https://api.github.com/users/${user}/repos`)
            setRepos(response.data)

        } catch (error) {
            console.error(error, 'error en get repositorios');
        }
        setIsLoading(false)

    }

    const openModalInfo = (data) => {
        setRepoSelect(data)
        setOpenModal(true)
    }

    const closeModal = (e) => {
        console.log(e.target);
        if (e.target.classList[2] === 'contentModal') {
            setOpenModal(false)
        }
    }


    if (isLoading) return (
        <Loading>
           <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </Loading>
    )



    return (
        <>
            <HeaderUser>
                <div className="avatar">
                    <img src={general.avatar} alt="" />
                </div>
                <div className="userinfo" >
                    <h3><i className="fas fa-user"></i> {general.name} </h3>
                    <h3><i className="fas fa-at"></i> {general.username === '' ? 'username' : general.username }</h3>
                    <h4><i className="fas fa-envelope"></i> {general.email ? general.email : 'No disponible' } </h4>
                    <p>
                        Biografia:
                        {
                            general.bio ? ' ' + general.bio : ' No disponible'
                        }
                    </p>
                    <p><i className="fas fa-map-marker-alt"></i> {general.location}
                    </p>
                    <a href={general.url}><i className="fas fa-link"></i> {general.url}</a>
                </div>
                <div className="infogen">
                    <div><h3>{general.repos} Repositorios</h3></div>
                    <div><h3>{general.followers} seguidores</h3></div>
                    <div><h3>{general.following} seguidos </h3></div>
                </div>
            </HeaderUser>
            <br />
            <div className="container">
                <h2>Repositorios</h2>
                <ContentRepo>
                    {
                        repos.map(rep => {
                            return (
                                <ItemRepo onClick={() => openModalInfo(rep)} key={rep.id}>
                                    <div className="name"><h3> {rep.name}</h3></div>
                                </ItemRepo>
                            )

                        })
                    }
                </ContentRepo>
            </div>
            {
                openmodal ?
                    <Modal datos={reposelect} closeModal={closeModal}/>
                    : null
            }
        </>
    )
}

export default DetailUser
