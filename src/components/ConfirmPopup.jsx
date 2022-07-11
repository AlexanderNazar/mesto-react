import { useState } from "react";
import PopupWithForm from "./PopupWithForm";

function ConfirmPopup({ isOpen, onClose, onDeliteCard, load, setLoad }) {

  const [hasValid] = useState(true);

  function handleSubmit(evt) {
    evt.preventDefault();
    onDeliteCard();
    setLoad();
  }

  const valueTextButton = load ? "Да" : "Удаление...";

  return (
    <PopupWithForm
    name="confirm"
    title="Вы уверены?"
    textButton={valueTextButton}
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleSubmit}
    valid={hasValid} />
  )
}

export default ConfirmPopup;

