function PopupWithForm(props) {

  const popupClassName = `popup popup_type_${props.name} ${props.isOpen ? "popup_opened" : ""}`;
  const popupContainerClassName = `popup__container popup__container_type_${props.name}`;
  const popupFormClassName = `popup__form popup__form_type_${props.name}`;
  const popupButtonSubmitClassName = !props.valid ? "popup__save-button popup__save-button_invalid" : "popup__save-button";

  return (
    <div className={popupClassName}>
      <div className={popupContainerClassName}>
        <button className="popup__close-button" type="button" onClick={props.onClose} />
        <form className={popupFormClassName} name={`${props.name}`} onSubmit={props.onSubmit}>
          <h2 className="popup__title">{props.title}</h2>
          {props.children}
          <button
            type="submit"
            className={popupButtonSubmitClassName}
            name="submit"
            disabled={!props.valid}>{props.textButton}
          </button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;
