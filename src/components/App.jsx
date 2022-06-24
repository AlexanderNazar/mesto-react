import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import PopupImageOpen from './PopupImageOpen';
import Input from './Input';

function App() {

  const [editAvatarPopup, setEditAvatarPopup] = React.useState(false);
  const [editProfilePopup, setEditProfilePopup] = React.useState(false);
  const [addPlacePopup, setAddPlacePopup] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState('');

  function isEditAvatarPopupOpen() {
    setEditAvatarPopup(true);
  }

  function isEditProfilePopupOpen() {
    setEditProfilePopup(true);
  }

  function isAddPlacePopupOpen() {
    setAddPlacePopup(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setEditAvatarPopup(false);
    setEditProfilePopup(false);
    setAddPlacePopup(false);
    setSelectedCard('');
  }

  return (
    <>
      <div className="root">
        <Header />
        <Main
          onEditAvatar={isEditAvatarPopupOpen}
          onEditProfile={isEditProfilePopupOpen}
          onAddPlace={isAddPlacePopupOpen}
          onCardClick={handleCardClick}
        />
        <Footer />
        <PopupWithForm
          name="profile"
          title="Редактировать профиль"
          textButton="Сохранить"
          isOpen={editProfilePopup ? "popup_opened" : ""}
          onClose={closeAllPopups}
          children={
            <>
              <Input type="text" id="name" name="name" placeholder="Ваше имя" minLength="2" maxLength="40" />
              <Input type="text" id="about" name="about" placeholder="Ваша профессия" minLength="2" maxLength="200" />
            </>
          }
        />
        <PopupWithForm
          name="add-image"
          title="Новое место"
          textButton="Создать"
          isOpen={addPlacePopup ? "popup_opened" : ""}
          onClose={closeAllPopups}
          children={
            <>
              <Input type="text" id="place" name="name" placeholder="Название" minLength="2" maxLength="30" />
              <Input type="url" id="link" name="link" placeholder="Ссылка на картинку" />
            </>
          }
        />
        <PopupWithForm
          name="update-avatar"
          title="Обновить аватар"
          textButton="Сохранить"
          isOpen={editAvatarPopup ? "popup_opened" : ""}
          onClose={closeAllPopups}
          children={
            <>
              <Input type="url" id="avatar" name="avatar" placeholder="Ссылка на аватар" />
            </>
          }
        />
        <PopupWithForm
          name="confirm"
          title="Вы уверены?"
          textButton="Да"
          isOpen={1}
          onClose={closeAllPopups}
        />
        <PopupImageOpen card={selectedCard} onClose={closeAllPopups} />
      </div>
    </>
  );
}

export default App;
