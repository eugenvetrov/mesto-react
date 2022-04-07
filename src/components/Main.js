import defaultUserImg from "../images/default-user.png";

function Main(props) {
  console.log(props);
  return (
    <main className="main">
      <section className="profile">
        <div
          className="profile__avatar-edit"
          onClick={props.onEditAvatar}
        ></div>
        <img
          src={defaultUserImg}
          className="profile__avatar"
          alt="аватар профиля"
        />
        <h1 className="profile__info-name"></h1>
        <button
          className="profile__info-edit"
          type="button"
          onClick={props.onEditProfile}
        ></button>
        <p className="profile__info-description"></p>
        <button
          className="profile__add"
          type="button"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section className="group">
        <template id="group__cards">
          <article className="group__rectangle">
            <img className="group__image" />
            <button className="group__delete-icon" type="button"></button>
            <h2 className="group__name"></h2>
            <button className="group__like" type="button">
              <div
                className="group__like-icon"
                alt="Отметить как понравившееся"
              ></div>
            </button>
            <p className="group__like-number"></p>
          </article>
        </template>
      </section>
    </main>
  );
}

export default Main;
