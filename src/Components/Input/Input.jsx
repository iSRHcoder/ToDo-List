import PropTypes from "prop-types";
const Input = ({
  changeHandler,
  value,
  enterKeyHandler,
  placeholder,
  className,
}) => {
  return (
    <>
      <input
        type="text"
        className={className}
        onChange={(e) => {
          changeHandler(e.target.value);
        }}
        value={value}
        placeholder={placeholder}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            enterKeyHandler();
          }
        }}
      />
    </>
  );
};

Input.propTypes = {
  changeHandler: PropTypes.func.isRequired,
  value: PropTypes.string,
  enterKeyHandler: PropTypes.func,
  placeholder: PropTypes.string,
  className: PropTypes.string,
};

export default Input;
