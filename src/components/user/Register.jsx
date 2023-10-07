import { useForm } from "../../hooks/useForm";



export const Register = () => {

    const {form, changed} = useForm({});

    const saveUser = (e) =>{
        e.preventDefault();
        let newUser = form;
        console.log(newUser);
    }

    return (
        <>
            <header className="content__header">
                <h1 className="content__title">Registro</h1>
            </header>

            <div className="content__posts">
                <form onSubmit={saveUser} className="regiter-form">
                    <div className="form-group">
                        <label htmlFor="name">Nombre</label>
                        <input type="text" name="name" onChange={changed} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="surname">Apellidos</label>
                        <input type="text" name="surname" onChange={changed} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="nick">Nickname</label>
                        <input type="text" name="nick" onChange={changed} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Correo electronico</label>
                        <input type="email" name="email" onChange={changed} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input type="password" name="password" onChange={changed} />
                    </div>

                    <input type="submit" value="Registrate" />
                </form>
            </div>
        </>
    );
}
