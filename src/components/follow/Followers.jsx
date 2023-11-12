import { useEffect, useState } from "react";

import { Global } from "../../helpers/Global";
import { UserList } from "../user/UserList";
import { useParams } from "react-router-dom";
// import avatar from "../../../assets/img/user.png";

export const Followers = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [isMorePage, setIsMorePege] = useState(true);
  const [following, setFollowing] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();

  useEffect(() => {
    getUsers(1);
  }, []);

  const getUsers = async (nextPage = 1) => {
    // Efecto de carga
    setIsLoading(true);

    // sacar userId de la url
    const userId = params.userId;
    // console.log(params);

    // peticion sacar usuario
    const request = await fetch(
      Global.url + "follow/followers/" + userId + "/" + nextPage,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    const data = await request.json();
    // console.log(data.follows);

    // recorrer y limpiar follows para quedarme don los followed
    let cleanUsers = [];
    data.follows.forEach((follow) => {
      cleanUsers = [...cleanUsers, follow.user];
    });
    data.users = cleanUsers;
    // console.log(cleanUsers);

    // crear estado y listarlo
    if (data.users && data.status == "success") {
      let newUsers = data.users;

      if (users.length >= 1) {
        newUsers = [...users, ...data.follows];
      }

      setUsers(newUsers);
      setFollowing(data.user_following);
      setIsLoading(false);
    }

    // paginacion
    if (users.length >= data.total - data.follows.length) {
      setIsMorePege(false);
    }
  };

  return (
    <>
      <section className="layout__content">
        <header className="content__header">
          <h1 className="content__title">Seguidores de NOMBRE</h1>
        </header>

        <UserList
          users={users}
          getUsers={getUsers}
          following={following}
          setFollowing={setFollowing}
          isMorePage={isMorePage}
          isLoading={isLoading}
          page={page}
          setPage={setPage}
        />
      </section>
      <br />
    </>
  );
};
