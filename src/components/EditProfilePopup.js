import { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import PopupWithForm from "./PopupWithForm.js";

function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);
  const [values, setValues] = useState({ name: "", about: "" });
  useEffect(() => {
    if (currentUser) {
      setValues({ name: currentUser.name, about: currentUser.about });
    }
  }, [currentUser, props.isOpen]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name: values.name,
      about: values.about,
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
        value={values.name}
        required
        onChange={handleChange}
      />
      <span className="popup__error" id="profile-name-error"></span>
      <input
        className="popup__text popup__text_profile-description"
        type="text"
        name="about"
        id="profile-description"
        minLength="2"
        maxLength="200"
        value={values.about}
        required
        onChange={handleChange}
      />
      <span className="popup__error" id="profile-description-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
