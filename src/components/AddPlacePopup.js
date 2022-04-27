import { useRef } from "react";
import PopupWithForm from "./PopupWithForm.js";

function AddPlacePopup(props) {
  const cardNameInputRef = useRef();
  const cardLinkInputRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlaces({
      name: cardNameInputRef.current.value,
      link: cardLinkInputRef.current.value,
    });
  }
  return (
    <PopupWithForm
      title="Новое место"
      name="popup_card-add"
      submitValue="Создать"
      isOpen={props.isOpen}
      onClose={(e) => props.onClose(e)}
      onSubmit={(e) => handleSubmit(e)}
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
        ref={cardNameInputRef}
      />
      <span className="popup__error" id="card-name-error"></span>
      <input
        className="popup__text popup__text_card-link"
        id="card-link"
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        required
        ref={cardLinkInputRef}
      />
      <span className="popup__error" id="card-link-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
