// import React from 'react'

import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Global } from "../helpers/Global";

const AuthContext = createContext()

export const AuthProvider = ({children}) => {

    const [auth, setAuth] = useState({});
    const [counters, setCounters] = useState({});

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

        // peticion para los contadores
        const requestCounters = await fetch(Global.url + "user/counters/" + userId, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
        });

        const dataCounters = await requestCounters.json();

        

        // setear el estado de auth
        setAuth(data.user);

        // setear el estado de conters
        setCounters(dataCounters);

    };

    return (
        <AuthContext.Provider 
            value={{
                auth, 
                setAuth,
                counters
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