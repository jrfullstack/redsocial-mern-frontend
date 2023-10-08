// import React from 'react'

import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Global } from "../helpers/Global";

const AuthContext = createContext()

export const AuthProvider = ({children}) => {

    const [Auth, setAuth] = useState({});

    useEffect(() => {
    authUser();
    
      
    }, [])
    
    // Autenticar el usuario
    const authUser = async() => {
        // sacar datos del usuario identidicado del localStorage
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");

        // comprobar si tengo el token y el user
        if (!token || !user) {
            return false;
        }

        // transformar los datos a un objeto de javascript
        const userObj = JSON.parse(user);
        const userId = userObj.id;        

        // peticion ajay al backen compruebe token y regrese datos del usuario
        const request = await fetch(Global.url + "user/profile/" + userId, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        });

        const data = await request.json();

        // setear el estado de auth
        setAuth(data.user);

    };

    return (
        <AuthContext.Provider 
            value={{
                Auth, 
                setAuth
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;

AuthProvider.propTypes = {
    children: PropTypes.element.isRequired
    // password: PropTypes.string.isRequired,
};