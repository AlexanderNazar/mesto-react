import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {

  const [name, setName] = React.useState();
  const [description, setDescription] = React.useState();

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeDescription(evt) {
    setDescription(evt.target.value);
  }

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
          name="profile"
          title="Редактировать профиль"
          textButton="Сохранить"
          isOpen={props.isOpen}
          onClose={props.onClose}
          onSubmit={handleSubmit}
          children={
            <>
              <input
                className="popup__input-text"
                type="text"
                id="name"
                name="name"
                required
                placeholder="Ваше имя"
                minLength="2"
                maxLength="40"
                value={name ? name : ""}
                onChange={handleChangeName} />
              <span id="name-error" className="popup__error"></span>
              <input
                className="popup__input-text"
                type="text"
                id="about"
                name="about"
                required
                placeholder="Ваша профессия"
                minLength="2"
                maxLength="200"
                value={description ? description : ""}
                onChange={handleChangeDescription} />
              <span id="name-error" className="popup__error"></span>
            </>
          }
        />
  )
}

export default EditProfilePopup;
