import { useEffect, useState } from "react";

import { Global } from "../../helpers/Global";
import { UserList } from "./UserList";


export const People = () => {

  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [isMorePage, setIsMorePege] = useState(true);
  const [following, setFollowing] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // console.log(users);

  useEffect(() => {
    getUsers(1);
  }, [])
  

  const getUsers = async(nextPage = 1) => { 
    
    // Efecto de carga
    setIsLoading(true);
  
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
      setFollowing(data.user_following);
      setIsLoading(false);

    }

    // paginacion
    if (users.length >= (data.total - data.users.length)) {
      setIsMorePege(false)
    }
  }

  

  

  return (
    <>
      <section className="layout__content">
        <header className="content__header">
          <h1 className="content__title">Usuarios</h1>
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
