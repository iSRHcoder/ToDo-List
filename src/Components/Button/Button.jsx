import PropTypes from "prop-types";

const Button = ({
  clickHandler,
  disabled = false,
  btnLabel = "Click Me",
  className,
}) => {
  return (
    <>
      <button onClick={clickHandler} disabled={disabled} className={className}>
        {btnLabel}
      </button>
    </>
  );
};

Button.propTypes = {
  clickHandler: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  btnLabel: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Button;
