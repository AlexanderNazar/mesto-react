import { useState, useEffect }from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupImageOpen from './PopupImageOpen';
import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmPopup from './ConfirmPopup';

function App() {

  const [editAvatarPopup, setEditAvatarPopup] = useState(false);
  const [editProfilePopup, setEditProfilePopup] = useState(false);
  const [addPlacePopup, setAddPlacePopup] = useState(false);
  const [confirmPopup, setConfirmPopup] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [validDefault, setValidDefault] = useState(false);
  const [load, setLoad] = useState(true);
  const [buffer, setBuffer] = useState([]);

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

  useEffect(() => {
    getUserInfo();
    getInitialCards();
  }, [])

  function isEditAvatarPopupOpen() {
    setEditAvatarPopup(true);
    setLoad(true);
  }

  function isEditProfilePopupOpen() {
    setEditProfilePopup(true);
    setLoad(true);
  }

  function isAddPlacePopupOpen() {
    setAddPlacePopup(true);
    setLoad(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setEditAvatarPopup(false);
    setEditProfilePopup(false);
    setAddPlacePopup(false);
    setConfirmPopup(false);
    setSelectedCard(null);
    setValidDefault(false);
  }

  function handleValid() {
    setValidDefault(true);
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

  function handleLoad() {
    setLoad(false);
  }

  function handleConfirmPopup(card) {
    setConfirmPopup(true)
    setBuffer(card);
    setLoad(true);
  }

  function handleCardDelete() {
    api.deleteImage(buffer._id)
      .then(setCards(state => state.filter(c => c._id !== buffer._id)))
      .catch(err => console.log(err));
    setConfirmPopup(false);
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
            onCardDelete={handleConfirmPopup}
            cards={cards} />
        <Footer />
        <EditProfilePopup
          isOpen={editProfilePopup}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          load={load}
          setLoad={handleLoad} />
        <AddPlacePopup
          isOpen={addPlacePopup}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          validDefault={validDefault}
          setValidDefault={handleValid}
          load={load}
          setLoad={handleLoad} />
        <EditAvatarPopup
          isOpen={editAvatarPopup}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateavatar}
          validDefault={validDefault}
          setValidDefault={handleValid}
          load={load}
          setLoad={handleLoad} />
        <ConfirmPopup
          isOpen={confirmPopup}
          onClose={closeAllPopups}
          onDeliteCard={handleCardDelete}
          load={load}
          setLoad={handleLoad} />
        <PopupImageOpen card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
