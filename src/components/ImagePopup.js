function ImagePopup({ card, onClose }) {
  return (
    <div
      className={`popup popup_background_fullscreen popup_fullscreen-image ${
        card ? "popup_opened" : ""
      }`}
      onClick={onClose}
    >
      <figure className="popup__fullscreen">
        <button
          className="popup__close-icon popup__close-icon_fullscreen"
          type="button"
          onClick={onClose}
        ></button>
        <img
          src={card ? card.link : ""}
          className="popup__fullscreen-image"
          alt={card ? "Изображение в полноэкранном режиме" : ""}
        />
        <figcaption className="popup__fullscreen-caption">
          {card ? card.name : ""}
        </figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;
