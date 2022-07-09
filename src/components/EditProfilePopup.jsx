import { useState, useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [validName, setValidName] = useState(true);
  const [validDescription, setValidDescription] = useState(true);
  const [validTextName, setValidTextName] = useState('');
  const [validTextDescription, setValidTextDescription] = useState('');

  function handleChangeName(evt) {
    setName(evt.target.value);
    setValidName(evt.target.validity.valid);
    setValidTextName(evt.target.validationMessage);
  }

  function handleChangeDescription(evt) {
    setDescription(evt.target.value);
    setValidDescription(evt.target.validity.valid);
    setValidTextDescription(evt.target.validationMessage);
  }

  function validityForm() {
    return validName && validDescription;
  }

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });
    props.setLoad();
  }

  function closePopup(evt) {
    props.onClose();
    setName(currentUser.name);
    setDescription(currentUser.about);
    setValidName(evt.target.validity.valid);
    setValidTextName(evt.target.validationMessage)
    setValidDescription(evt.target.validity.valid);
    setValidTextDescription(evt.target.validationMessage);
  }

  const valueTextButton = props.load ? "Сохранить" : "Сохранение...";
  const inputNameClassName = validName ? "popup__input-text" : "popup__input-text popup__input-text_type_error";
  const inputDescriptionClassName = validDescription ? "popup__input-text" : "popup__input-text popup__input-text_type_error";

  return (
    <PopupWithForm
          name="profile"
          title="Редактировать профиль"
          textButton={valueTextButton}
          isOpen={props.isOpen}
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
