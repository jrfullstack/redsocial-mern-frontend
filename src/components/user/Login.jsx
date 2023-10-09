import { useState } from "react";
import { Global } from "../../helpers/Global";
import { useForm } from "../../hooks/useForm";
import useAuth from "../../hooks/useAuth";

export const Login = () => {
    const { form, changed } = useForm({});
    const [saved, setSaved] = useState("not_sended");
    const {setAuth} = useAuth();

    const loginUser = async (e) => {
        e.preventDefault();

        let userToLogin = form;

        const request = await fetch(Global.url + "user/login", {
            method: "POST",
            body: JSON.stringify(userToLogin),
            headers: {
                "Content-Type": "application/json",
            },
        });

        // respuesta del servidor
        const data = await request.json();

        // guardar en localStorage para tener el token a mano
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        // para mostrar alerta
        if (data.status == "success") {

            // cambiar el estado para mostrar alertas
            setSaved("saved");

            // Set datos en el auth
            setAuth(data.usuer);

            // Redireccion
            setTimeout(() => {
                window.location.reload();
            }, 1000)
            

        } else {
            setSaved("error");
        }
    };

    return (
        <>
            <header className="content__header">
                <h1 className="content__title">Login</h1>
            </header>

            <div className="content__posts">
                {/* condicion */}
                {saved == "saved" ? (<strong className="alert alert-success">Usuario identificado correctamente</strong>) : ("")}
                {saved == "error" ? (<strong className="alert alert-danger">Usuario o contraseña incorrecta</strong>) : ("")}
                <form onSubmit={loginUser} className="form-login">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            onChange={changed}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            onChange={changed}
                        />
                    </div>
                    <input type="submit" value="Identificate" className="" />
                </form>
            </div>
        </>
    );
};
