// import React from 'react'

import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import useAuth from "../../hooks/useAuth";

export const Logout = () => {

    const {setAuth, setCounters} = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        // vaciar el localStorage
        localStorage.clear();

        // setear estado globales de auth a vacio
        setAuth({});
        setCounters({});

        // Navegar al login
        navigate("/login");

    }, [setAuth, setCounters, navigate]);
    
  return (
    <h1>Cerrando sesion...</h1>
  )
}
