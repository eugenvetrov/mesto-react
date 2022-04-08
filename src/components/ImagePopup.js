function ImagePopup(props) {
  return (
    <div
      className={`popup popup_background_fullscreen popup_fullscreen-image ${
        props.card ? "popup_opened" : ""
      }`}
      onClick={props.onClose}
    >
      <figure className="popup__fullscreen">
        <button
          className="popup__close-icon popup__close-icon_fullscreen"
          type="button"
          onClick={props.onClose}
        ></button>
        <img
          src={props.card ? props.card.link : ""}
          className="popup__fullscreen-image"
          alt="Изображение в полноэкранном режиме"
        />
        <figcaption className="popup__fullscreen-caption">
          {props.card ? props.card.name : ""}
        </figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;
