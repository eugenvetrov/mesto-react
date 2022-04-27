import { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import PopupWithForm from "./PopupWithForm.js";

function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser]);
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }
  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="popup_profile"
      submitValue="Сохранить"
      isOpen={props.isOpen}
      onClose={(e) => props.onClose(e)}
      onSubmit={(e) => handleSubmit(e)}
    >
      <input
        className="popup__text popup__text_profile-name"
        type="text"
        name="name"
        id="profile-name"
        minLength="2"
        maxLength="40"
        value={name}
        required
        onChange={handleNameChange}
      />
      <span className="popup__error" id="profile-name-error"></span>
      <input
        className="popup__text popup__text_profile-description"
        type="text"
        name="about"
        id="profile-description"
        minLength="2"
        maxLength="200"
        value={description}
        required
        onChange={handleDescriptionChange}
      />
      <span className="popup__error" id="profile-description-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
