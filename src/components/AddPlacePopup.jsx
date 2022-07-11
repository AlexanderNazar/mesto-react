import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, validDefault, setValidDefault, load, setLoad }) {

  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [hasValidName, setHasValidName] = useState(true);
  const [hasValidLink, setHasValidLink] = useState(true);
  const [validTextName, setValidTextName] = useState('');
  const [validTextLink, setValidTextLink] = useState('');

  function handleChangeName(evt) {
    setName(evt.target.value);
    setHasValidName(evt.target.validity.valid);
    setValidTextName(evt.target.validationMessage);
  }

  function handleChangeLink(evt) {
    setLink(evt.target.value);
    setHasValidLink(evt.target.validity.valid);
    setValidTextLink(evt.target.validationMessage);
    setValidDefault();
  }

  function validityForm() {
    return  validDefault && hasValidName && hasValidLink;
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({ name, link });
    setLoad();
  }

  useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);

  const valueTextButton = load ? "Создать" : "Сохранение...";
  const inputNameClassName = hasValidName ? "popup__input-text" : "popup__input-text popup__input-text_type_error";
  const inputLinkClassName = hasValidLink ? "popup__input-text" : "popup__input-text popup__input-text_type_error";

  return (
    <PopupWithForm
    name="add-image"
    title="Новое место"
    textButton={valueTextButton}
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleSubmit}
    valid={validityForm()}
    children={
      <>
        <input
          className={inputNameClassName}
          type="text"
          id="place"
          name="name"
          required
          placeholder="Название"
          minLength="2"
          maxLength="30"
          value={name || ""}
          onChange={handleChangeName} />
        <span id="place-error" className="popup__error">{validTextName}</span>
        <input
          className={inputLinkClassName}
          type="url"
          id="link"
          name="link"
          required
          placeholder="Ссылка на картинку"
          value={link || ""}
          onChange={handleChangeLink} />
        <span id="link-error" className="popup__error">{validTextLink}</span>
      </>
    } />
  )
}

export default AddPlacePopup;
