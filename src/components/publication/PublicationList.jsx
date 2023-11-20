import PropTypes from 'prop-types';

import ReactTimeAgo from "react-time-ago";

import { Global } from "../../helpers/Global";
import { Link } from "react-router-dom";
import avatar from "../../assets/img/user.png";
import useAuth from "../../hooks/useAuth";


export const PublicationList = ({publications, getPublications, isMorePage, setIsMorePage, page, setPage}) => {
  const { auth } = useAuth();

  const deletePublication = async (publicationId) => {
    await fetch(
      Global.url + "publication/remove/" + publicationId,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    // const data = await request.json();

    setPage(1);
    setIsMorePage(true);
    getPublications(1, true);
  };

  const nextPage = () => {
    let next = page + 1;
    setPage(next);
    getPublications(next);
  };

  return (
    <>
      <div className="content__posts">
        {publications.map((publication) => {
          return (
            <article className="posts__post" key={publication._id}>
              <div className="post__container">
                <div className="post__image-user">
                  <Link
                    to={"/social/perfil/" + publication.user._id}
                    className="post__image-link">
                    {publication.user.image != "default.png" && (
                      <img
                        src={
                          Global.url + "user/avatar/" + publication.user.image
                        }
                        className="post__user-image"
                        alt="Foto de perfil"
                      />
                    )}

                    {/* si no tiene foto */}
                    {publication.user.image == "default.png" && (
                      <img
                        src={avatar}
                        className="post__user-image"
                        alt="Foto de perfil"
                      />
                    )}
                  </Link>
                </div>

                <div className="post__body">
                  <div className="post__user-info">
                    <Link
                      to={"/social/perfil/" + publication.user._id}
                      className="user-info__name">
                      {publication.user.name + " " + publication.user.surname}

                      <span className="user-info__divider"> | </span>
                      <span className="user-info__create-date">
                        <ReactTimeAgo
                          date={publication.created_at}
                          locale="es-ES"
                        />
                      </span>
                    </Link>
                  </div>

                  <h4 className="post__content">{publication.text}</h4>
                  {publication.file && (
                    <img
                      src={Global.url + "publication/media/" + publication.file}
                      width={300}
                    />
                  )}
                </div>
              </div>

              {auth._id == publication.user._id && (
                <div className="post__buttons">
                  <button
                    className="post__button"
                    onClick={() => deletePublication(publication._id)}>
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                </div>
              )}
            </article>
          );
        })}
      </div>

      {isMorePage && (
        <div className="content__container-btn">
          <button className="content__btn-more-post" onClick={nextPage}>
            Ver mas publicaciones
          </button>
        </div>
      )}
    </>
  );
};


PublicationList.propTypes = {
  publications: PropTypes.array.isRequired,
  getPublications: PropTypes.func,
  isMorePage: PropTypes.bool,
  setIsMorePage: PropTypes.func,
  page: PropTypes.number,
  setPage: PropTypes.func,
}