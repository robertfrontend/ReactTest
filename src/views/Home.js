import React, {
    useEffect,
    useState,
    useCallback
} from 'react'
import axios from 'axios';
import styled from 'styled-components';

import Tabla from '../components/Tabla';


const Filtro = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    padding: 1em 0;
    font-size: 120%;
    flex-wrap: wrap;
    justify-content: space-between;
    div {
        padding: 0.5em 0;
    }

    .palabra{
        input {
            margin-top: 5px;
            padding: 8px 20px;
            border-radius: 10px;
            border: 1px solid #6c5ce7;
            font-size: 80%;
            outline: none;

        }
    }
    .cantidad{
        select {
            margin-top: 5px;
            width: 100%;
            padding: 8px 20px;
            border: 1px solid #6c5ce7;
            background-color: white;
            border-radius: 10px;
            outline: none;
            option {
                font-size: 120%;
            }
        }
    }
    .mayorMenor{
        margin: 0 1em;
        cursor: pointer;
        text-align: center;
        i {
            padding-top: 5px;
            font-size: 2em;
            color: #6c5ce7;
        }
    }

`;

const Paginador = styled.div`
  display: inline-block;
  margin-top: 1em;
  display: flex;
  justify-content: flex-end;
    a {
        color: black;
        float: left;
        padding: 8px 16px;
        text-decoration: none;
        border: 2px solid #6c5ce7;
        margin: 0 0.5em;
        border-radius: 5px;
        font-weight: 500;
    }
.active {
    background-color: #6c5ce7;
    color: white;
}
`;

const Loading = styled.div`
    width: 100%;
    text-align: center;
    font-size: 5em;
    color: #6c5ce7;
`;


const Home = () => {
    
    const [usuarios, setUsuarios] = useState([])
    const [newusuarios, setNewUsuarios] = useState([])

    const [cantidad, setCantidad] = useState(25)
    const [mayor, setMayorMenor] = useState(false)

    const [page, setPage] = useState(0)

    const [isLoading, setLoading] = useState(false)
    
    useEffect(() => {

        getUsers(cantidad);
        setPage(0)

    }, [])


    // traer todos los usuarios
    const url = 'https://api.github.com/users';

    const initUsers = () => {
        setUsuarios([])
        setNewUsuarios([])
        setNewUsuarios([...usuarios])
    }

    const getUsers = async (cantidad, thipage) => {
        setLoading(true)
        try {
            const respuesta = await axios.get(
                `https://api.github.com/users?since=${thipage}s&per_page=${cantidad}`,
            )
                const data = respuesta.data
                initUsers()
                // estado para mostrar los uusarios por cantidad
                setUsuarios(data)
                setNewUsuarios(data)

        } catch (error) {
            console.error(error,'Ha ocurrido un error en la peticion')
        }
        setLoading(false)
    }


    // filtor por cantidad
    const filtroCantidad = (event) => {
        const cantidad = event.target.value

        
        // filtrar los usuarios
        getUsers(cantidad, 0)

        // actualizar el estado del select
        setCantidad(cantidad)

        setMayorMenor(false)
    }

    // filtrar de mayor a menor
    const filtrarMayoMenor = () => {
        setPage(0)
        // cambiar estado del boton mayor/menor
        setMayorMenor(!mayor)
        newusuarios.reverse()
    }

    const onSearch = (value) => {
        const query = value.target.value;
        if (query === '') {
            initUsers()
            getUsers(cantidad)
         }
        
        const temporal = [...usuarios]
        let respuesta = []
        respuesta = temporal.filter(res => {
            return res.login.toLowerCase().indexOf(query.toLowerCase()) > -1;
        })

        setNewUsuarios([...respuesta])
    }


    const changePage = (value) => {
        setPage(value)
        getUsers(cantidad, value)
    }


    if (isLoading) return (
        <Loading>
           <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </Loading>
    )


    return (
        <>
        <div className="container">
                <Filtro>
                    <div className="palabra">
                        <h4>Buscar en la tabla</h4>
                        <input type="text" placeholder="Buscar por nombre" onChange={onSearch} />
                    </div>
                    <div className="cantidad">
                        <h4>Cantidad Usuarios</h4>
                        <select name="select" id="numberuser" onChange={filtroCantidad} value={cantidad} >
                            <option value="25">25 Usuarios</option>
                            <option value="50">50 Usuarios </option>
                            <option value="100">100 Usuarios</option>
                        </select>
                    </div>
                    <div className="mayorMenor" onClick={filtrarMayoMenor}>
                        <h4>
                           Ordenar por: {mayor ? 'mayor': 'menor'}
                        </h4>
                        <i className={mayor ? "fas fa-sort-up" : "fas fa-sort-down" }  ></i>
                    </div>
                </Filtro>

                <Tabla usuarios={newusuarios} cantidad={cantidad} ></Tabla>

                <Paginador>
                    <a href="#" className={page === 0 ? 'active' : ''} onClick={() => changePage(0)} >1</a>
                    <a href="#" className={page === 10 ? 'active' : ''} onClick={() => changePage(10)} >2</a>
                    <a href="#" className={page === 25 ? 'active' : ''} onClick={() => changePage(25)} >3</a>
                    <a href="#" className={page === 50 ? 'active' : ''} onClick={() => changePage(50)} >4</a>
                </Paginador>


            </div>
        </>
    )
}

export default Home
