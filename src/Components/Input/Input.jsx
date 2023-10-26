// eslint-disable-next-line react/prop-types
const Input = ({ changeHandler, value, enterKeyHandler, placeholder }) => {
  return (
    <>
      <input
        type="text"
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

export default Input;
