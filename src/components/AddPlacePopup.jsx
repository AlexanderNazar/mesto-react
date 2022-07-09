import { useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {

  const [name, setName] = useState();
  const [link, setLink] = useState();
  const [validName, setValidName] = useState(true);
  const [validLink, setValidLink] = useState(true);
  const [validTextName, setValidTextName] = useState('');
  const [validTextLink, setValidTextLink] = useState('');

  function handleChangeName(evt) {
    setName(evt.target.value);
    setValidName(evt.target.validity.valid);
    setValidTextName(evt.target.validationMessage);
  }

  function handleChangeLink(evt) {
    setLink(evt.target.value);
    setValidLink(evt.target.validity.valid);
    setValidTextLink(evt.target.validationMessage);
    props.setValidDefault();
  }

  function validityForm() {
    return  props.validDefault && validName && validLink;
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onAddPlace({ name, link });
    setName('');
    setLink('');
    props.setLoad();
  }

  const valueTextButton = props.load ? "Создать" : "Сохранение...";
  const inputNameClassName = validName ? "popup__input-text" : "popup__input-text popup__input-text_type_error";
  const inputLinkClassName = validLink ? "popup__input-text" : "popup__input-text popup__input-text_type_error";

  return (
    <PopupWithForm
    name="add-image"
    title="Новое место"
    textButton={valueTextButton}
    isOpen={props.isOpen}
    onClose={props.onClose}
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
          value={name ? name : ""}
          onChange={handleChangeName} />
        <span id="place-error" className="popup__error">{validTextName}</span>
        <input
          className={inputLinkClassName}
          type="url"
          id="link"
          name="link"
          required
          placeholder="Ссылка на картинку"
          value={link ? link : ""}
          onChange={handleChangeLink} />
        <span id="link-error" className="popup__error">{validTextLink}</span>
      </>
    } />
  )
}

export default AddPlacePopup;
