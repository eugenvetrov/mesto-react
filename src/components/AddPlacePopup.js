import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm.js";

function AddPlacePopup(props) {
  const [values, setValues] = useState({ name: "", link: "" });

  useEffect(() => {
    console.log(props.isOpen);
    setValues({ name: "", link: "" });
  }, [props.isOpen]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlaces({
      name: values.name,
      link: values.link,
    });
  }
  return (
    <PopupWithForm
      title="Новое место"
      name="popup_card-add"
      submitValue="Создать"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={(e) => handleSubmit(e)}
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
      <span className="popup__error" id="card-name-error"></span>
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
      <span className="popup__error" id="card-link-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
