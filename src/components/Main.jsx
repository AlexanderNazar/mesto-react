import React from 'react';
import api from '../utils/Api';
import Card from './Card';

function Main(props) {

  const [userName, setUserName] = React.useState("");
  const [userDescription, setUserDescription] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState("");
  const [cards, setCards] = React.useState([]);

  function getUserInfo() {
    Promise.all([ api.setUserInfo(), api.getInitialCards() ])
    .then(([ data, cards ]) => {
      setUserName(data.name);
      setUserDescription(data.about);
      setUserAvatar(data.avatar);
      setCards([...cards])
    })
    .catch(err => console.log(err))
  }

  React.useEffect(() => {
    getUserInfo();
  }, [])

  return (
      <main className="content">
        <section className="profile">
          <div className="profile__avatar-container" onClick={props.onEditAvatar}>
            <img src={userAvatar} alt="Фото пользовантеля" className="profile__avatar" />
          </div>
          <div className="profile__info">
            <div className="profile__title">
              <h1 className="profile__name">{userName}</h1>
              <button type="button" className="profile__edit-button" aria-label="Редактировать" onClick={props.onEditProfile} />
            </div>
            <p className="profile__about">{userDescription}</p>
          </div>
          <button type="button" className="profile__add-button" aria-label="Добавить" onClick={props.onAddPlace} />
        </section>
        <section className="elements">
          {cards.map(card => <Card key={card._id} card={card} onCardClick={props.onCardClick} />)}
        </section>
      </main>
  )
}

export default Main;
