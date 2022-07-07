import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {

  const currentUser = React.useContext(CurrentUserContext);

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  const isOwn = props.card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `element__delete ${isOwn ? '' : 'element__delete_type_inactive'}`;

  const isLiked = props.card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = `element__heart ${isLiked ? 'element__heart_active' : ''}`;

  return (
    <div className="element">
      <button className={cardDeleteButtonClassName} onClick={handleDeleteClick} type="button" />
      <img className="element__image" src={props.card.link} alt={props.card.name} onClick={handleClick} />
      <div className="element__caption">
        <h2 className="element__title">{props.card.name}</h2>
        <div className="element__heart-container">
          <button className={cardLikeButtonClassName} onClick ={handleLikeClick} type="button" />
          <p className="element__heart-counter">{props.card.likes.length}</p>
        </div>
      </div>
    </div>
  )
}

export default Card;
