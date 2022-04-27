function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_background_form popup_${props.name} ${
        props.isOpen ? "popup_opened" : ""
      }`}
      onClick={props.onClose}
    >
      <div className="popup__container">
        <button
          className="popup__close-icon popup__close-icon_profile"
          type="button"
          onClick={props.onClose}
        ></button>
        <form
          className="popup__form popup__form_profile"
          name={`${props.name}`}
          autoComplete="off"
          noValidate
          onSubmit={props.onSubmit}
        >
          <h2 className="popup__title">{props.title}</h2>
          {props.children}
          <button
            className="popup__submit"
            type="submit"
          >{`${props.submitValue}`}</button>
        </form>
      </div>
    </div>
  );
}
export default PopupWithForm;
