function Button(props) {
  const buttonType = props.buttonType;
  const buttonLabel = props.buttonLabel;
  const buttonClassName = props.buttonClassName;
  const onClick = props.onClick;
  return (
    <>
      <div className="flex justify-center">
        <button type={buttonType} className={buttonClassName} onClick={onClick}>
          {buttonLabel}
        </button>
      </div>
    </>
  );
}

export default Button;
