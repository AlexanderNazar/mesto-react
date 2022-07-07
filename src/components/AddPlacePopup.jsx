import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {

  const [name, setName] = React.useState();
  const [link, setLink] = React.useState();

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeLink(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onAddPlace({ name, link });
    setName('');
    setLink('');
  }

  return (
    <PopupWithForm
    name="add-image"
    title="Новое место"
    textButton="Создать"
    isOpen={props.isOpen}
    onClose={props.onClose}
    onSubmit={handleSubmit}
    children={
      <>
        <input
          className="popup__input-text"
          type="text"
          id="place"
          name="name"
          required
          placeholder="Название"
          minLength="2"
          maxLength="30"
          value={name ? name : ""}
          onChange={handleChangeName} />
        <span id="place-error" className="popup__error"></span>
        <input
          className="popup__input-text"
          type="url"
          id="link"
          name="link"
          required
          placeholder="Ссылка на картинку"
          value={link ? link : ""}
          onChange={handleChangeLink} />
        <span id="link-error" className="popup__error"></span>
      </>
    }
  />

  )
}

export default AddPlacePopup;
