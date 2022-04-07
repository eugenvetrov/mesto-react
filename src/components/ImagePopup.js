function ImagePopup() {
  return (
    <div className="popup popup_background_fullscreen popup_fullscreen-image">
      <figure className="popup__fullscreen">
        <button
          className="popup__close-icon popup__close-icon_fullscreen"
          type="button"
        ></button>
        <img
          className="popup__fullscreen-image"
          src="<%=require('./images/fullscreen-picture-default.svg')%>"
          alt="Изображение в полноэкранном режиме"
        />
        <figcaption className="popup__fullscreen-caption"></figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;
