import { useState, useEffect } from "react";
import api from "../utils/api.js";
import defaultUserImg from "../images/default-user.png";
import Card from "./Card.js";

function Main(props) {
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [cards, setCards] = useState([]);
  useEffect(() => {
    api
      .getUserInfo()
      .then((userInfo) => {
        setUserName(userInfo.name);
        setUserDescription(userInfo.about);
        setUserAvatar(userInfo.avatar);
      })
      .catch((err) => {
        console.log(err);
      });
    api
      .getCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  const Cards = cards.map((item) => {
    return <Card key={item._id} card={item} onCardClick={props.onCardClick} />;
  });

  return (
    <main className="main">
      <section className="profile">
        <div
          className="profile__avatar-edit"
          onClick={props.onEditAvatar}
        ></div>
        <img
          src={userAvatar ? userAvatar : defaultUserImg}
          className="profile__avatar"
          alt="аватар профиля"
        />
        <h1 className="profile__info-name">{userName}</h1>
        <button
          className="profile__info-edit"
          type="button"
          onClick={props.onEditProfile}
        ></button>
        <p className="profile__info-description">{userDescription}</p>
        <button
          className="profile__add"
          type="button"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section className="group">{Cards}</section>
    </main>
  );
}

export default Main;
