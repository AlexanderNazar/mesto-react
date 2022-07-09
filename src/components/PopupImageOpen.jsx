function PopupImageOpen(props) {

  const imagePreviewClassName = `popup popup_type_preview ${!!props.card ? "popup_opened" : ""}`;
  const cardLink = !!props.card ? props.card.link : "";
  const cardName = !!props.card ? props.card.name : "";

  return (
    <div className={imagePreviewClassName}>
      <div className="popup__container-image">
        <button className="popup__close-button" type="button" onClick={props.onClose} />
        <img
          className="popup__open-image"
          src={cardLink}
          alt={cardName} />
        <h2 className="popup__image-title">{cardName}</h2>
      </div>
    </div>
  )
}

export default PopupImageOpen;
