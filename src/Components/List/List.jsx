import PropTypes from "prop-types";
import Button from "../Button/Button";
import Input from "../Input/Input";
import styles from "./List.module.css";

const List = ({
  items,
  swapItem,
  doneBtnHandler,
  delBtnHandler,
  editBtnHandler,
  cancelBtnhandler,
  changedInputEditHandler,
  saveBtnHandler,
  searchTerm,
}) => {
  const listItems = items.map((task, index) => (
    <li
      style={{ display: `${task.isSearchFieldEmpty ? "none" : "block"}` }}
      key={index}
      className={`p-2 ${task.isDone ? styles.doneItem : styles.listItem}`}
    >
      {!task.isEditing && (
        <>
          {task.item}
          <Button
            btnLabel="Edit"
            className={`${styles.EDIT}`}
            clickHandler={() => editBtnHandler(index)}
            disabled={task.isDone}
          />
        </>
      )}

      {task.isEditing && (
        <>
          <Input
            className={styles.editInput}
            value={task.editingItem}
            changeHandler={(data) => changedInputEditHandler(index, data)}
          />
          <Button
            btnLabel="Save"
            className={styles.save}
            clickHandler={() => saveBtnHandler(index)}
            disabled={!task.editingItem.trim().length}
          />
          <Button
            btnLabel="Cancel"
            className={styles.cancel}
            clickHandler={() => cancelBtnhandler(index)}
          />
        </>
      )}

      <Button
        className={`${styles.UP}`}
        btnLabel="UP"
        clickHandler={() => {
          swapItem(index, index - 1);
        }}
        disabled={index === 0 || searchTerm.length}
      />

      <Button
        className={`${styles.DOWN}`}
        btnLabel="DOWN"
        clickHandler={() => {
          swapItem(index, index + 1);
        }}
        disabled={index === items.length - 1 || searchTerm.length}
      />

      {task.isDone && (
        <Button
          className={`${styles.DELETE}`}
          btnLabel="DELETE"
          clickHandler={() => delBtnHandler(index)}
        />
      )}

      {!task.isDone && (
        <Button
          className={`${styles.DONE}`}
          btnLabel="DONE"
          disabled={task.isEditing}
          clickHandler={() => doneBtnHandler(index)}
        />
      )}
    </li>
  ));

  return (
    <>
      <ul className={styles.List}>{listItems} </ul>
    </>
  );
};

List.propTypes = {
  items: PropTypes.array.isRequired,
  swapItem: PropTypes.func,
  doneBtnHandler: PropTypes.func,
  delBtnHandler: PropTypes.func,
  editBtnHandler: PropTypes.func,
  cancelBtnhandler: PropTypes.func,
  changedInputEditHandler: PropTypes.func,
  saveBtnHandler: PropTypes.func,
  searchTerm: PropTypes.array,
};

export default List;
