import { useState } from "react";
import PopupWithForm from "./PopupWithForm";

function ConfirmPopup(props) {

  const [valid] = useState(true);

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onDeliteCard();
    props.setLoad();
  }

  const valueTextButton = props.load ? "Да" : "Удаление...";

  return (
    <PopupWithForm
    name="confirm"
    title="Вы уверены?"
    textButton={valueTextButton}
    isOpen={props.isOpen}
    onClose={props.onClose}
    onSubmit={handleSubmit}
    valid={valid} />
  )
}

export default ConfirmPopup;

