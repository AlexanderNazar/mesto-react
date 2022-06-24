function Input(props) {
  return (
    <>
      <input type={props.type}
        className="popup__input-text"
        id={props.id}
        name={props.name}
        required
        placeholder={props.placeholder}
        minLength={props.maxLength}
        maxLength={props.maxLength} />
      <span id={`${props.id}-error`} className="popup__error"></span>
    </>
  )
}

export default Input;
