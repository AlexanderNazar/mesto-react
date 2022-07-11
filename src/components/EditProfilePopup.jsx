import { useState, useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, load, setLoad }) {

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [hasValidName, setHasValidName] = useState(true);
  const [hasValidDescription, setHasValidDescription] = useState(true);
  const [validTextName, setValidTextName] = useState('');
  const [validTextDescription, setValidTextDescription] = useState('');

  function handleChangeName(evt) {
    setName(evt.target.value);
    setHasValidName(evt.target.validity.valid);
    setValidTextName(evt.target.validationMessage);
  }

  function handleChangeDescription(evt) {
    setDescription(evt.target.value);
    setHasValidDescription(evt.target.validity.valid);
    setValidTextDescription(evt.target.validationMessage);
  }

  function validityForm() {
    return hasValidName && hasValidDescription;
  }

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
    setLoad();
  }

  function closePopup(evt) {
    onClose();
    setName(currentUser.name);
    setDescription(currentUser.about);
    setHasValidName(evt.target.validity.valid);
    setValidTextName(evt.target.validationMessage)
    setHasValidDescription(evt.target.validity.valid);
    setValidTextDescription(evt.target.validationMessage);
  }

  const valueTextButton = load ? "Сохранить" : "Сохранение...";
  const inputNameClassName = hasValidName ? "popup__input-text" : "popup__input-text popup__input-text_type_error";
  const inputDescriptionClassName = hasValidDescription ? "popup__input-text" : "popup__input-text popup__input-text_type_error";

  return (
    <PopupWithForm
          name="profile"
          title="Редактировать профиль"
          textButton={valueTextButton}
          isOpen={isOpen}
          onClose={closePopup}
          onSubmit={handleSubmit}
          valid={validityForm()}
          children={
            <>
              <input
                className={inputNameClassName}
                type="text"
                id="name"
                name="name"
                required
                placeholder="Ваше имя"
                minLength="2"
                maxLength="40"
                value={name ? name : ""}
                onChange={handleChangeName} />
              <span id="name-error" className="popup__error">{validTextName}</span>
              <input
                className={inputDescriptionClassName}
                type="text"
                id="about"
                name="about"
                required
                placeholder="Ваша профессия"
                minLength="2"
                maxLength="200"
                value={description ? description : ""}
                onChange={handleChangeDescription} />
              <span id="name-error" className="popup__error">{validTextDescription}</span>
            </>
          }
        />
  )
}

export default EditProfilePopup;
