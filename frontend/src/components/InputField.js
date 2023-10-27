function InputField(props) {
  // for label
  const labelHtmlFor = props.labelHtmlFor;
  const labelClassName = props.labelClassName;
  const labelPlaceHolder = props.labelPlaceHolder;
  const inputName = props.name;
  const onChange = props.onChange;
  // for input field
  const inputType = props.inputType;
  const inputClassName = props.inputClassName;
  const inputPlaceholder = props.inputPlaceholder;
  return (
    <div className="py-1 px-3">
      <label htmlFor={labelHtmlFor} className={labelClassName}>
        {labelPlaceHolder}
      </label>
      <input
        type={inputType}
        id={labelHtmlFor}
        className={inputClassName}
        onChange={onChange}
        placeholder={inputPlaceholder}
        name={inputName}
        required
      />
    </div>
  );
}

export default InputField;
