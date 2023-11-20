
import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";


import { Global } from "../../helpers/Global";

import { PublicationList } from "./PublicationList";

export const Feed = () => {

    const [publications, setPublications] = useState([]);
    const [page, setPage] = useState(1);
    const [isMorePage, setIsMorePage] = useState(true);
    // const { userId } = useParams();

    useEffect(() => {
      getPublications(1, false);
    }, []);

    const getPublications = async (nextpage = 1, showNews = true) => {

        if (showNews) {
            setPublications([]);
            setPage(1);
            nextpage = 1;
        }
      const request = await fetch(
        Global.url + "publication/feed/" + nextpage,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      const data = await request.json();
      // console.log(data);

      if (data.status == "success") {
        let newPublications = data.publications;

        if (!showNews && publications.length >= 1) {
          newPublications = [...publications, ...data.publications];
        }
        

        setPublications(newPublications);

        if (!showNews && publications.length >= data.total - data.publications.length) {
          setIsMorePage(false);
        }

        if (data.pages <= 1) {
          setIsMorePage(false);
        }
      }
    };

    return (
      <>
        <section className="layout__content">
          <header className="content__header">
            <h1 className="content__title">Timeline</h1>
            <button className="content__button" onClick={() => getPublications(1, true)}>Mostrar nuevas</button>
          </header>

          <PublicationList
            publications={publications}
            getPublications={getPublications}
            isMorePage={isMorePage}
            setIsMorePage={setIsMorePage}
            page={page}
            setPage={setPage}
          />
        </section>
      </>
    );
}
