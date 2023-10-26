/* eslint-disable react/prop-types */

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

export default Button;
