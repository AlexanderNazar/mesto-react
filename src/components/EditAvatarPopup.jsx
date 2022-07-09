import { useState, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {

  const [valid, setValid] = useState(true);
  const [validText, setValidText] = useState('');

  const avatarRef = useRef();

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
    avatarRef.current.value = '';
    props.setLoad();
  }

  function handleChangeInput(evt) {
    setValid(evt.target.validity.valid);
    setValidText(evt.target.validationMessage);
    props.setValidDefault(evt.target.validity.valid);
  }

  function validityForm() {
    return  props.validDefault && valid;
  }

  const valueTextButton = props.load ? "Сохранить" : "Сохранение...";
  const inputClassName = valid ? "popup__input-text" : "popup__input-text popup__input-text_type_error";

  return (
    <PopupWithForm
    name="update-avatar"
    title="Обновить аватар"
    textButton={valueTextButton}
    isOpen={props.isOpen}
    onClose={props.onClose}
    onSubmit={handleSubmit}
    valid={validityForm()}
    children={
      <>
        <input
          className={inputClassName}
          type="url"
          id="avatar"
          name="avatar"
          required
          placeholder="Ссылка на аватар"
          ref={avatarRef}
          onChange={handleChangeInput} />
        <span id="avatar-error" className="popup__error">{validText}</span>
      </>
    } />
  )
}

export default EditAvatarPopup;
