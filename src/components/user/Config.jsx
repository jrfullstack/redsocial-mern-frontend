// import React from 'react'

import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Global } from "../../helpers/Global";
import avatar from "../../assets/img/user.png";
import { SerializeForm } from "../../helpers/SerializeForm";



export const Config = () => {

  const {auth, setAuth} = useAuth();
  const [saved, setSaved] = useState("not_saved");

  const updateUser = async(e) => {
    e.preventDefault();
    
    // recoger datos del formulario serializados
    let newDataUser = SerializeForm(e.target);

    // Eliminar datos innecesarios
    delete newDataUser.file0;

    // Actualizar usuario en la base de datos
    const request = await fetch(Global.url + "user/update", {
      method: "PUT",
      body: JSON.stringify(newDataUser),
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token")
      }
    });
    
    const data = await request.json();

    if (data.status == "success") {
      // eliminamos la clave
      delete data.user.password;

      // actualizamos la informacion del usuario
      setAuth(data.user);

      // actualizamos el estado del mensaje
      setSaved("saved");
    }else{
      setSaved("error");
    }
  }

  return (
    <>
      <header className="content__header">
        <h1 className="content__title">Ajustes</h1>
      </header>

      <div className="content__posts">
        {/* condicion */}
        {saved == "saved" ? (
          <strong className="alert alert-success">            
            Usuario actualizado correctamente!!
          </strong>
        ) : (
          ""
        )}
        {saved == "error" ? (
          <strong className="alert alert-danger">
            El usuario no se ha podido actualizar
          </strong>
        ) : (
          ""
        )}

        <form onSubmit={updateUser} className="config-form">
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input type="text" name="name" defaultValue={auth.name} />
          </div>

          <div className="form-group">
            <label htmlFor="surname">Apellidos</label>
            <input type="text" name="surname" defaultValue={auth.surname} />
          </div>

          <div className="form-group">
            <label htmlFor="nick">Nickname</label>
            <input type="text" name="nick" defaultValue={auth.nick} />
          </div>

          <div className="form-group">
            <label htmlFor="nick">Biografia</label>
            <textarea name="bio" defaultValue={auth.bio} />
          </div>

          <div className="form-group">
            <label htmlFor="email">Correo electronico</label>
            <input type="email" name="email" defaultValue={auth.email} />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input type="password" name="password" />
          </div>

          <div className="form-group">
            <label htmlFor="file0">Avatar</label>
            <div className="avatar">{/* Mostrar imagen */}</div>
            <input type="file" name="file0" id="file" />
            <br />
            <br />
            <div className="general-info__container-avatar">
              {/* si el usuario tiene foto subida */}
              {auth.image != "default.png" && (
                <img
                  src={Global.url + "user/avatar/" + auth.image}
                  className="container-avatar__img"
                  alt="Foto de perfil"
                />
              )}

              {/* si no tiene foto */}
              {auth.image == "default.png" && (
                <img
                  src={avatar}
                  className="container-avatar__img"
                  alt="Foto de perfil"
                />
              )}
            </div>
          </div>
          <br />
          <input type="submit" value="Actualizar" />
        </form>
      </div>
    </>
  );
}
