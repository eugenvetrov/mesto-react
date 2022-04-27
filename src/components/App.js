import { useState, useEffect } from "react";
import api from "../utils/api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import PopupWithConfirmation from "./PopupWithConfirmation.js";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardForDelete, setCardForDelete] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .getUserInfo()
      .then((user) => setCurrentUser(user))
      .catch((error) => console.log(error));

    api
      .getCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    const request = isLiked
      ? api.deleteLikeCard(card._id)
      : api.putLikeCard(card._id);
    request
      .then((newCard) => {
        setCards((cards) =>
          cards.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    setCardForDelete(card);
    setIsDeleteCardPopupOpen(true);
  }

  function handleDeleteCard(event) {
    event.preventDefault();
    console.log(cardForDelete);
    api
      .deleteCard(cardForDelete)
      .then(() => {
        console.log();
        setCards(cards.filter((c) => c != cardForDelete));
      })
      .then(setIsDeleteCardPopupOpen(false))
      .catch((err) => {
        console.log(err);
      });
  }

  const handleUpdateUser = (user) => {
    api
      .setUserInfo(user.name, user.about)
      .then((user) => {
        setCurrentUser(user);
        setIsEditProfilePopupOpen(false);
      })
      .catch((error) => console.log(error));
  };

  const handleUpdateAvatar = (link) => {
    api
      .changeAvatar(link.avatar)
      .then((user) => {
        setCurrentUser(user);
        setIsEditAvatarPopupOpen(false);
      })
      .catch((error) => console.log(error));
  };

  const handleAddPlace = (card) => {
    api
      .addCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        setIsAddPlacePopupOpen(false);
      })
      .catch((error) => console.log(error));
  };

  const closeAllPopups = (event) => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlaces={handleAddPlace}
        />

        <PopupWithForm
          title="Вы уверены?"
          name="popup_delete-card"
          submitValue="Да"
        ></PopupWithForm>
        <ImagePopup card={selectedCard} onClose={(e) => closeAllPopups(e)} />

        <PopupWithConfirmation
          title="Вы уверены?"
          name="popup_delete-card"
          submitValue="Да"
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleDeleteCard}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
