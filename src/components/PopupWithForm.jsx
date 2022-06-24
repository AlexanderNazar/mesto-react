function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? "popup_opened" : ""}`}>
      <div className={`popup__container popup__container_type_${props.name}`}>
        <button className="popup__close-button" type="button" onClick={props.onClose} />
        <form className={`popup__form popup__form_type_${props.name}`} name={`${props.name}`}>
          <h2 className="popup__title">{props.title}</h2>
          {props.children}
          <button type="submit" className="popup__save-button" name="submit">{props.textButton}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;
