import { useState, useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, validDefault, setValidDefault, load, setLoad }) {

  const [hasValid, setHasValid] = useState(true);
  const [validText, setValidText] = useState('');


  const avatarRef = useRef();

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
    setLoad();
  }

  function handleChangeInput(evt) {
    setHasValid(evt.target.validity.valid);
    setValidText(evt.target.validationMessage);
    setValidDefault(evt.target.validity.valid);
  }

  function validityForm() {
    return  validDefault && hasValid;
  }

  useEffect(() => {
    avatarRef.current.value = '';
  }, [isOpen]);

  const valueTextButton = load ? "Сохранить" : "Сохранение...";
  const inputClassName = hasValid ? "popup__input-text" : "popup__input-text popup__input-text_type_error";

  return (
    <PopupWithForm
    name="update-avatar"
    title="Обновить аватар"
    textButton={valueTextButton}
    isOpen={isOpen}
    onClose={onClose}
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
