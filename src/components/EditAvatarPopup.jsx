import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {

  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
    avatarRef.current.value = '';
  }

  return (
    <PopupWithForm
    name="update-avatar"
    title="Обновить аватар"
    textButton="Сохранить"
    isOpen={props.isOpen}
    onClose={props.onClose}
    onSubmit={handleSubmit}
    children={
      <>
        <input
          className="popup__input-text"
          type="url"
          id="avatar"
          name="avatar"
          required
          placeholder="Ссылка на аватар"
          ref={avatarRef} />
        <span id="avatar-error" className="popup__error"></span>
      </>
    } />
  )
}

export default EditAvatarPopup;
