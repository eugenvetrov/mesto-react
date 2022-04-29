import { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import PopupWithForm from "./PopupWithForm.js";

function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);
  const [values, setValues] = useState({
    name: "",
    about: "",
  });
  const [formErrors, setFormErrors] = useState({ name: "", about: "" });
  const [fieldValid, setFieldValid] = useState({ name: true, about: true });
  const [formValid, setFormValid] = useState(true);

  useEffect(() => {
    if (currentUser) {
      setValues((prev) => ({
        ...prev,
        name: currentUser.name,
        about: currentUser.about,
      }));
    }
  }, [currentUser, props.isOpen]);

  useEffect(() => {
    setFormValid(!Object.values(fieldValid).some((item) => item === false));
  }, [fieldValid]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateField(name, value);
  };

  const validateField = (field, value) => {
    if ((fieldValid[field] = value.length >= 2 && value.length <= 40)) {
      setFieldValid((prev) => ({
        ...prev,
        [field]: true,
      }));
      setFormErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    } else {
      setFieldValid((prev) => ({
        ...prev,
        [field]: false,
      }));
      setFormErrors((prev) => ({
        ...prev,
        [field]: "Недопустимое количество символов",
      }));
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    formValid
      ? props.onUpdateUser({
          name: values.name,
          about: values.about,
        })
      : alert("Простите! Какое-то из полей заполнено некорректно.");
  }
  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="popup_profile"
      submitValue="Сохранить"
      isOpen={props.isOpen}
      onClose={(e) => props.onClose(e)}
      onSubmit={(e) => handleSubmit(e)}
      formValid={formValid}
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
      <span
        className="popup__error popup__error_visible"
        id="profile-name-error"
      >
        {formErrors.name}
      </span>
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
      <span
        className="popup__error popup__error_visible"
        id="profile-description-error"
      >
        {formErrors.about}
      </span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
