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

  const [hasEditAvatarPopup, setHasEditAvatarPopup] = useState(false);
  const [hasEditProfilePopup, setHasEditProfilePopup] = useState(false);
  const [hasAddPlacePopup, setHasAddPlacePopup] = useState(false);
  const [hasConfirmPopup, setHasConfirmPopup] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [hasValidDefault, setHasValidDefault] = useState(false);
  const [hasLoad, setHasLoad] = useState(true);
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
    setHasEditAvatarPopup(true);
    setHasLoad(true);
  }

  function isEditProfilePopupOpen() {
    setHasEditProfilePopup(true);
    setHasLoad(true);
  }

  function isAddPlacePopupOpen() {
    setHasAddPlacePopup(true);
    setHasLoad(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setHasEditAvatarPopup(false);
    setHasEditProfilePopup(false);
    setHasAddPlacePopup(false);
    setHasConfirmPopup(false);
    setSelectedCard(null);
    setHasValidDefault(false);
  }

  function handleValid() {
    setHasValidDefault(true);
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
    setHasLoad(false);
  }

  function handleConfirmPopup(card) {
    setHasConfirmPopup(true)
    setBuffer(card);
    setHasLoad(true);
  }

  function handleCardDelete() {
    api.deleteImage(buffer._id)
      .then(setCards(state => state.filter(c => c._id !== buffer._id)))
      .catch(err => console.log(err));
    setHasConfirmPopup(false);
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
          isOpen={hasEditProfilePopup}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          load={hasLoad}
          setLoad={handleLoad} />
        <AddPlacePopup
          isOpen={hasAddPlacePopup}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          validDefault={hasValidDefault}
          setValidDefault={handleValid}
          load={hasLoad}
          setLoad={handleLoad} />
        <EditAvatarPopup
          isOpen={hasEditAvatarPopup}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateavatar}
          validDefault={hasValidDefault}
          setValidDefault={handleValid}
          load={hasLoad}
          setLoad={handleLoad} />
        <ConfirmPopup
          isOpen={hasConfirmPopup}
          onClose={closeAllPopups}
          onDeliteCard={handleCardDelete}
          load={hasLoad}
          setLoad={handleLoad} />
        <PopupImageOpen card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
