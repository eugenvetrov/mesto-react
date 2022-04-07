import { useState } from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const closeAllPopups = (e) => {
    if (
      e.target.classList.contains("popup_opened") ||
      e.target.classList.contains("popup__close-icon")
    ) {
      setIsEditProfilePopupOpen(false);
      setIsAddPlacePopupOpen(false);
      setIsEditAvatarPopupOpen(false);
    }
  };

  return (
    <div className="page">
      <Header />
      <Main
        onEditProfile={() => handleEditProfileClick()}
        onAddPlace={() => handleAddPlaceClick()}
        onEditAvatar={() => handleEditAvatarClick()}
      />
      <PopupWithForm
        title="Редактировать профиль"
        name="popup_profile"
        submitValue="Сохранить"
        isOpen={isEditProfilePopupOpen}
        onClose={(e) => closeAllPopups(e)}
      >
        <input
          className="popup__text popup__text_profile-name"
          type="text"
          name="name"
          id="profile-name"
          defaultValue=""
          minLength="2"
          maxLength="40"
          required
        />
        <span className="popup__error" id="profile-name-error"></span>
        <input
          className="popup__text popup__text_profile-description"
          type="text"
          name="about"
          id="profile-description"
          defaultValue=""
          minLength="2"
          maxLength="200"
          required
        />
        <span className="popup__error" id="profile-description-error"></span>
      </PopupWithForm>

      <PopupWithForm
        title="Обновить аватар"
        name="popup_profile-avatar"
        submitValue="Сохранить"
        isOpen={isEditAvatarPopupOpen}
        onClose={(e) => closeAllPopups(e)}
      >
        <input
          className="popup__text popup__text_profile-avatar"
          id="profile-avatar"
          type="url"
          name="avatar"
          placeholder="Ссылка на аватар"
          required
        />
        <span className="popup__error" id="profile-avatar-error"></span>
      </PopupWithForm>

      <PopupWithForm
        title="Новое место"
        name="popup_card-add"
        submitValue="Создать"
        isOpen={isAddPlacePopupOpen}
        onClose={(e) => closeAllPopups(e)}
      >
        <input
          className="popup__text popup__text_card-name"
          id="card-name"
          type="text"
          name="name"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required
        />
        <span className="popup__error" id="card-name-error"></span>
        <input
          className="popup__text popup__text_card-link"
          id="card-link"
          type="url"
          name="link"
          placeholder="Ссылка на картинку"
          required
        />
        <span className="popup__error" id="card-link-error"></span>
      </PopupWithForm>

      <PopupWithForm
        title="Вы уверены?"
        name="popup_delete-card"
        submitValue="Да"
      ></PopupWithForm>

      <Footer />
    </div>
  );
}

export default App;
