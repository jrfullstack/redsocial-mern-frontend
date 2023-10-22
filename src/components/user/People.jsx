import { useEffect, useState } from "react";
import { Global } from "../../helpers/Global";
import avatar from "../../assets/img/user.png";


export const People = () => {

  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [isMorePage, setIsMorePege] = useState(true)

  useEffect(() => {
    getUsers(1);
  }, [])
  

  const getUsers = async(nextPage = 1) => { 
    
    // peticion sacar usuario
    const request = await fetch(Global.url + 'user/list/' + nextPage, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem('token')
      }
    });

    const data = await request.json();

    // console.log(data);

    // crear estado y listarlo
    if (data.users && data.status == "success" ) {

      let newUsers = data.users;

      if (users.length >= 1) {
        newUsers = [...users, ...data.users]
      }

      setUsers(newUsers);
    }

    // paginacion
    if (users.length >= data.total) {
      setIsMorePege(false)
    }
  }

  const nextPage = () => { 
    let next = page + 1;

    setPage(next);

    getUsers(next);
    }

  return (
    <>
      <section className="layout__content">
        <header className="content__header">
          <h1 className="content__title">Usuarios</h1>
        </header>

        <div className="content__posts">
          {users.map((user) => {
            return (
              <article className="posts__post" key={user._id}>
                <div className="post__container">
                  <div className="post__image-user">
                    <a href="#" className="post__image-link">
                      {user.image != "default.png" && (
                        <img
                          src={Global.url + "user/avatar/" + user.image}
                          className="post__user-image"
                          alt="Foto de perfil"
                        />
                      )}

                      {/* si no tiene foto */}
                      {user.image == "default.png" && (
                        <img
                          src={avatar}
                          className="post__user-image"
                          alt="Foto de perfil"
                        />
                      )}
                      {/* <img
                        src={avatar}
                        className="post__user-image"
                        alt="Foto de perfil"
                      /> */}
                    </a>
                  </div>

                  <div className="post__body">
                    <div className="post__user-info">
                      <a href="#" className="user-info__name">
                        {user.name} {user.surname}
                      </a>
                      <span className="user-info__divider"> | </span>
                      <a href="#" className="user-info__create-date">
                        {user.created_at}
                      </a>
                    </div>

                    <h4 className="post__content">{user.bio}</h4>
                  </div>
                </div>

                <div className="post__buttons">
                  <a href="#" className="post__button post__button--green">
                    Seguir
                  </a>

                  {/* <a href="#" className="post__button">
                Dejar de Seguir
              </a> */}
                </div>
              </article>
            );
          })}
        </div>
        {isMorePage && (
          <div className="content__container-btn">
            <button className="content__btn-more-post" onClick={nextPage}>
              Ver mas usuarios
            </button>
          </div>
        )}
      </section>
      <br />
    </>
  );
};
