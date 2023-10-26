/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import Button from "../Button/Button";
import Input from "../Input/Input";
import styles from "./List.module.css";

// eslint-disable-next-line react/prop-types
const List = ({
  items,
  swapItem,
  doneBtnHandler,
  delBtnHandler,
  editBtnHandler,
  cancelBtnhandler,
  changedInputEditHandler,
  saveBtnHandler,
  searchData,
  searchTerm,
}) => {
  console.log("searchData", searchData);
  console.log("searchTerm", searchTerm);
  //   const itemsData = searchData ? searchTerm : items;

  const listItems = items.map((task, index) => (
    <li
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
        disabled={index === 0}
      />

      <Button
        className={`${styles.DOWN}`}
        btnLabel="DOWN"
        clickHandler={() => {
          swapItem(index, index + 1);
        }}
        disabled={index === items.length - 1}
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

export default List;
