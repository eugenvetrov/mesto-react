function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }
  return (
    <article className="group__rectangle">
      <img
        className="group__image"
        src={props.card.link}
        onClick={handleClick}
      />
      <button className="group__delete-icon" type="button"></button>
      <h2 className="group__name">{props.card.name}</h2>
      <button className="group__like" type="button">
        <div
          className="group__like-icon"
          alt="Отметить как понравившееся"
        ></div>
      </button>
      <p className="group__like-number">{props.card.likes.length}</p>
    </article>
  );
}

export default Card;
