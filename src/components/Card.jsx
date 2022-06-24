function Card(props) {

  function handleClick() {
    props.onCardClick(props.card);
  }

  return (
    <div className="element">
      <button className="element__delete" type="button"></button>
      <img className="element__image" src={props.card.link} alt={props.card.name} onClick={handleClick} />
      <div className="element__caption">
        <h2 className="element__title">{props.card.name}</h2>
        <div className="element__heart-container">
          <button className="element__heart" type="button"></button>
          <p className="element__heart-counter">{props.card.likes.length}</p>
        </div>
      </div>
    </div>
  )
}

export default Card;
