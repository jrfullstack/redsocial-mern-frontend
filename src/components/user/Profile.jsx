import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import {GetProfile} from "../../helpers/GetProfile"
import avatar from "../../assets/img/user.png";
import { Global } from "../../helpers/Global";
import useAuth from "../../hooks/useAuth";
import { PublicationList } from "../publication/PublicationList";


export const Profile = () => {
  const {auth} = useAuth();
  const [user, setUser] = useState({});
  const [counters, setCounters] = useState({});
  const [iFollow, setIFollow] = useState(false);
  const [publications, setPublications] = useState([]);
  const [page, setPage] = useState(1);
  const [isMorePage, setIsMorePage] = useState(true);
  const {userId} = useParams();

  useEffect(() => {
    getDataUser();
    getCounters();
    setIsMorePage(true);
    getPublications(1, true);
  }, [userId]);

  const getDataUser = async () => {
    let dataUser = await GetProfile(userId, setUser);

    if (dataUser.following && dataUser.following._id) {
      setIFollow(true);
    }
  };

  const getCounters = async() => {
    const request = await fetch(Global.url + "user/counters/" + userId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token"),
      },
    });

    const data = await request.json();
    // console.log(data);

    if(data.following){
      setCounters(data);
    }
    
  }

  const follow = async (userId) => {
    // peticion al backen para guardar el follow
    const request = await fetch(Global.url + "follow/save", {
      method: "POST",
      body: JSON.stringify({ followed: userId }),
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });

    const data = await request.json();

    // cuando este todo correto
    if (data.status == "success") {
      setIFollow(true)
    }
  };

  

  const unfollow = async (userId) => {
    // peticion al backen para borrar el follow
    const request = await fetch(Global.url + "follow/unfollow/" + userId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token"),
      },
    });

    const data = await request.json();

    // cuando este todo correto
    if (data.status == "success") {
      setIFollow(false);
    }
  };

  const getPublications = async(nextpage = 1, newProfile = false) => {
    const request = await fetch(Global.url + "publication/user/" + userId + "/" + nextpage, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token"),
      },
    });

    const data = await request.json();
    // console.log(data);

    if (data.status == "success") {
      let newPublications = data.publications;

      if(!newProfile && publications.length >= 1){
        newPublications = [...publications, ...data.publications]
      }

      if(newProfile){
        newPublications = data.publications;
        setIsMorePage(true);
        setPage(1);
      }

      setPublications(newPublications);

      if(!newProfile && publications.length >= (data.total - data.publications.length) ){
        setIsMorePage(false);
      }

      if(data.pages <= 1 ){
        setIsMorePage(false);
      }
    }
  }

  

  
  
  return (
    <>
      <section className="layout__content">
        {/* <header className="content__header"> */}
        {/* <h1 className="content__title">Nombre usuario</h1> */}
        <header className="aside__profile-info">
          <div className="profile-info__general-info">
            <div className="general-info__container-avatar">
              {/* si el usuario tiene foto subida */}
              {user.image != "default.png" && (
                <img
                  src={Global.url + "user/avatar/" + user.image}
                  className="container-avatar__img"
                  alt="Foto de perfil"
                />
              )}

              {/* si no tiene foto */}
              {user.image == "default.png" && (
                <img
                  src={avatar}
                  className="container-avatar__img"
                  alt="Foto de perfil"
                />
              )}
            </div>

            <div className="general-info__container-names">
              <div className="container-names__name">
                <h1>
                  {user.name} {user.surname}
                </h1>

                {user._id != auth._id && iFollow ? (
                  <button
                    className="post__button"
                    onClick={() => unfollow(user._id)}
                  >
                    Dejar de Seguir
                  </button>
                ) : (
                  <button 
                    className="content__button content__button--rigth"
                    onClick={() => follow(user._id)}

                  
                  >
                    Seguir
                  </button>
                )}

              </div>
              <h2 className="container-names__nickname">{user.nick}</h2>
              <p>{user.bio}</p>
            </div>
          </div>

          <div className="profile-info__stats">
            <div className="stats__following">
              <Link
                to={"/social/siguiendo/" + user._id}
                className="following__link">
                <span className="following__title">Siguiendo</span>
                <span className="following__number">
                  {counters.following >= 1 ? counters.following : 0}
                </span>
              </Link>
            </div>
            <div className="stats__following">
              <Link
                to={"/social/siguidores/" + user._id}
                className="following__link">
                <span className="following__title">Seguidores</span>
                <span className="following__number">
                  {counters.followed >= 1 ? counters.followed : 0}
                </span>
              </Link>
            </div>

            <div className="stats__following">
              <Link
                to={"/social/perfil/" + user._id}
                className="following__link">
                <span className="following__title">Publicaciones</span>
                <span className="following__number">
                  {counters.publications >= 1 ? counters.publications : 0}
                </span>
              </Link>
            </div>
          </div>
        </header>
        {/* </header> */}

        <PublicationList
          publications={publications}
          getPublications={getPublications}
          isMorePage={isMorePage}
          setIsMorePage={setIsMorePage}
          page={page}
          setPage={setPage}
        />
        
        
        
        <br />
      </section>
    </>
  );
};
