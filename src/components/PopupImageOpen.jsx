function PopupImageOpen(props) {
  return (
    <div key={props.card._id} className={`popup popup_type_preview ${!!props.card ? "popup_opened" : ""}`}>
      <div className="popup__container-image">
        <button className="popup__close-button" type="button" onClick={props.onClose}></button>
        <img
          className="popup__open-image"
          src={!!props.card ? props.card.link : ""}
          alt={!!props.card ? props.card.name : ""} />
        <h2 className="popup__image-title">{!!props.card ? props.card.name : ""}</h2>
      </div>
    </div>
  )
}

export default PopupImageOpen;
