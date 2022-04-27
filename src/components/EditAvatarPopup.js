import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarInputRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarInputRef.current.value,
    });
  }
  return (
    <PopupWithForm
      title="Обновить аватар"
      name="popup_profile-avatar"
      submitValue="Сохранить"
      isOpen={props.isOpen}
      onClose={(e) => props.onClose(e)}
      onSubmit={(e) => handleSubmit(e)}
    >
      <input
        className="popup__text popup__text_profile-avatar"
        id="profile-avatar"
        type="url"
        name="avatar"
        placeholder="Ссылка на аватар"
        required
        ref={avatarInputRef}
      />
      <span className="popup__error" id="profile-avatar-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
