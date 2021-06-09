import React, { createContext, useState } from 'react';


export const DataContenxt = createContext();



export const DataProvider = ({ children }) => {
    const [data, setData] = useState(null);

    const [usuario, setUsuario] = useState(null)

    return (
        <DataContenxt.Provider
            value={{
                data,
                usuario,
                setData,
                setUsuario
        }}
        >
            { children }
        </DataContenxt.Provider>
    )

}