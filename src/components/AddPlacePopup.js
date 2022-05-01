import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm.js";

function AddPlacePopup(props) {
  const [values, setValues] = useState({ name: "", link: "" });
  const [formErrors, setFormErrors] = useState({ name: "", link: "" });
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    setValues({ name: "", link: "" });
  }, [props.isOpen]);

  useEffect(() => {
    setFormValid(!Object.values(formErrors).some((item) => item !== ""));
  }, [formErrors]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateField(name, value);
    console.log(formValid);
  };

  const validateField = (field, value) => {
    switch (field) {
      case "name":
        if (value.length >= 2 && value.length <= 40) {
          setFormErrors((prev) => ({
            ...prev,
            [field]: "",
          }));
        } else {
          setFormErrors((prev) => ({
            ...prev,
            [field]: "Недопустимое количество символов",
          }));
        }
        break;
      case "link":
        if (value.match(/^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*$/i)) {
          setFormErrors((prev) => ({
            ...prev,
            [field]: "",
          }));
        } else {
          setFormErrors((prev) => ({
            ...prev,
            [field]: "Пожалуйста, введите ссылку на изображение",
          }));
        }
        break;
      default:
        console.log("Error!");
        break;
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (
      formValid ||
      (values.name.length >= 2 &&
        values.name.length <= 40 &&
        values.link.match(/^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*$/i))
    ) {
      props.onAddPlaces({
        name: values.name,
        link: values.link,
      });
    } else {
      alert("Простите! Какое-то из полей заполнено некорректно");
    }
  }
  return (
    <PopupWithForm
      title="Новое место"
      name="popup_card-add"
      submitValue="Создать"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={(e) => handleSubmit(e)}
      formValid={formValid}
    >
      <input
        className="popup__text popup__text_card-name"
        id="card-name"
        type="text"
        name="name"
        placeholder="Название"
        value={values.name}
        minLength="2"
        maxLength="30"
        required
        onChange={handleChange}
      />
      <span className="popup__error popup__error_visible" id="card-name-error">
        {formErrors.name}
      </span>
      <input
        className="popup__text popup__text_card-link"
        id="card-link"
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        value={values.link}
        required
        onChange={handleChange}
      />
      <span className="popup__error popup__error_visible" id="card-link-error">
        {formErrors.link}
      </span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
