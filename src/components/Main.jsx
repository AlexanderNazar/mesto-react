import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
      <main className="content">
        <section className="profile">
          <div className="profile__avatar-container" onClick={props.onEditAvatar}>
            <img src={currentUser.avatar} alt="Фото пользовантеля" className="profile__avatar" />
          </div>
          <div className="profile__info">
            <div className="profile__title">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button type="button" className="profile__edit-button" aria-label="Редактировать" onClick={props.onEditProfile} />
            </div>
            <p className="profile__about">{currentUser.about}</p>
          </div>
          <button type="button" className="profile__add-button" aria-label="Добавить" onClick={props.onAddPlace} />
        </section>
        <section className="elements">
          {props.cards.map(card => <Card
            key={card._id}
            card={card}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />)}
        </section>
      </main>
  )
}

export default Main;
