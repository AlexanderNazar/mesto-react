import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import PopupImageOpen from './PopupImageOpen';
import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {

  const [editAvatarPopup, setEditAvatarPopup] = React.useState(false);
  const [editProfilePopup, setEditProfilePopup] = React.useState(false);
  const [addPlacePopup, setAddPlacePopup] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  function getUserInfo() {
    api.setUserInfo()
    .then(data => {setCurrentUser(data)})
    .catch(err => console.log(err))
  }

  function getInitialCards() {
    api.getInitialCards()
    .then(cards => setCards([...cards]))
    .catch(err => console.log(err))
  }

  React.useEffect(() => {
    getUserInfo();
    getInitialCards();
  }, [])

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
    setSelectedCard(null);
  }

  function handleUpdateUser({ name, about }) {
    api.changeUserInfo({ name, about })
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.log(err))
  }

  function handleUpdateavatar({ avatar }) {
    api.updateAvatar({ avatar })
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.log(err))
  }

  function handleCardDelete(card) {
    api.deleteImage(card._id)
      .then(setCards(state => state.filter(c => c._id !== card._id)))
      .catch(err => console.log(err))
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikePosition(card._id, !isLiked)
      .then(newCard => {
        setCards(state => state.map(c => c._id === card._id ? newCard : c));
      })
      .catch(err => console.log(err))
  }

  function handleAddPlaceSubmit({ name, link }) {
    api.addCard({ name, link })
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(err))
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <Header />
          <Main
            onEditAvatar={isEditAvatarPopupOpen}
            onEditProfile={isEditProfilePopupOpen}
            onAddPlace={isAddPlacePopupOpen}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}
          />
        <Footer />
        <EditProfilePopup isOpen={editProfilePopup} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <AddPlacePopup isOpen={addPlacePopup} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
        <EditAvatarPopup isOpen={editAvatarPopup} onClose={closeAllPopups} onUpdateAvatar={handleUpdateavatar} />
        <PopupWithForm
          name="confirm"
          title="Вы уверены?"
          textButton="Да"
          onClose={closeAllPopups}
        />
        <PopupImageOpen card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
