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

  const [isEditAvatarPopup, setIsEditAvatarPopup] = useState(false);
  const [isEditProfilePopup, setIsEditProfilePopup] = useState(false);
  const [isAddPlacePopup, setIsAddPlacePopup] = useState(false);
  const [isConfirmPopup, setIsConfirmPopup] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isValidDefault, setIsValidDefault] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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

  function handleEditAvatarPopupOpen() {
    setIsEditAvatarPopup(true);
  }

  function handleEditProfilePopupOpen() {
    setIsEditProfilePopup(true);
  }

  function handleAddPlacePopupOpen() {
    setIsAddPlacePopup(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopup(false);
    setIsEditProfilePopup(false);
    setIsAddPlacePopup(false);
    setIsConfirmPopup(false);
    setSelectedCard(null);
    setIsValidDefault(false);
  }

  function handleValid() {
    setIsValidDefault(true);
  }

  function handleUpdateUser({ name, about }) {
    setIsLoading(true);
    api.changeUserInfo({ name, about })
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false))
  }

  function handleUpdateavatar({ avatar }) {
    setIsLoading(true);
    api.updateAvatar({ avatar })
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false))
  }

  function handleConfirmPopup(card) {
    setIsConfirmPopup(true)
    setBuffer(card);
  }

  function handleCardDelete() {
    setIsLoading(true);
    api.deleteImage(buffer._id)
      .then(setCards(state => state.filter(c => c._id !== buffer._id)))
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false));
    setIsConfirmPopup(false);
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
    setIsLoading(true);
    api.addCard({ name, link })
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false))
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <Header />
          <Main
            onEditAvatar={handleEditAvatarPopupOpen}
            onEditProfile={handleEditProfilePopupOpen}
            onAddPlace={handleAddPlacePopupOpen}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleConfirmPopup}
            cards={cards} />
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopup}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading} />
        <AddPlacePopup
          isOpen={isAddPlacePopup}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          validDefault={isValidDefault}
          setValidDefault={handleValid}
          isLoading={isLoading} />
        <EditAvatarPopup
          isOpen={isEditAvatarPopup}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateavatar}
          validDefault={isValidDefault}
          setValidDefault={handleValid}
          isLoading={isLoading} />
        <ConfirmPopup
          isOpen={isConfirmPopup}
          onClose={closeAllPopups}
          onDeliteCard={handleCardDelete}
          isLoading={isLoading} />
        <PopupImageOpen card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
