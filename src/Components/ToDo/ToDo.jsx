import Swal from "sweetalert2";

import { useEffect, useState } from "react";
import Button from "../Button/Button";
import Input from "../Input/Input";
import List from "../List/List";
import styles from "./ToDo.module.css";

const LS_TODO_KEY = "todo";

const ToDo = () => {
  const [item, setItem] = useState("");
  const [list, setList] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);

  const btnClickHandler = () => {
    if (item.trim().length) {
      setList([
        ...list,
        {
          item,
          editingItem: item,
          isDone: false,
          isEditing: false,
          isSearchFieldEmpty: false,
        },
      ]);
      setItem("");
    }
  };

  const swapItem = (initialIndex, finalIndex) => {
    const items = [...list];
    const temp = items[initialIndex];
    items[initialIndex] = items[finalIndex];
    items[finalIndex] = temp;
    setList(items);
  };

  const doneBtnHandler = (index) => {
    const items = [...list];
    items[index].isDone = true;
    setList(items);
  };

  const delAllDoneBtnHandler = () => {
    Swal.fire({
      title: "Are you sure, You want to Delete all items?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const items = [...list];
        const filteredItems = items.filter((item) => !item.isDone);
        setList(filteredItems);
        Swal.fire("Deleted!", "All Items has been Deleted.", "success");
      }
    });
  };

  const delBtnHandler = (index) => {
    Swal.fire({
      title: "Are you sure, You want to Delete this item?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const items = [...list];
        items.splice(index, 1);
        setList(items);
        Swal.fire("Deleted!", "Your Item has been deleted.", "success");
      }
    });
  };

  const clearAllHandler = () => {
    Swal.fire({
      title: "Are you sure, You want to clear all items?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Clear All!",
    }).then((result) => {
      if (result.isConfirmed) {
        setList([]);
        Swal.fire("Cleared!", "Your All Items have been Cleared.", "success");
      }
    });
  };

  const editBtnHandler = (index) => {
    const items = [...list];
    items[index].isEditing = true;
    setList(items);
  };

  const cancelBtnhandler = (index) => {
    const items = [...list];
    items[index].isEditing = false;
    items[index].editingItem = items[index].item;
    setList(items);
  };

  const changedInputEditHandler = (index, data) => {
    const items = [...list];
    items[index].editingItem = data;
    setList(items);
  };

  const saveBtnHandler = (index) => {
    const items = [...list];
    items[index].isEditing = false;
    items[index].item = items[index].editingItem;
    setList(items);
  };

  const searchInputHandler = (data) => {
    const items = [...list];
    let searchedItems;
    if (data.toLowerCase()) {
      console.log("data.toLowerCase()", data.toLowerCase());
      searchedItems = items.map((item) => {
        if (!item.item.includes(data.toLowerCase())) {
          item.isSearchFieldEmpty = true;
        }
        return item;
      });
    }
    if (data.toLowerCase() === "") {
      searchedItems = items.map((item) => {
        if (item.item.includes(data)) {
          item.isSearchFieldEmpty = false;
        }
        return item;
      });
    }
    setList(searchedItems);
  };

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem(LS_TODO_KEY)) || [];
    setList(items);
  }, []);

  useEffect(() => {
    localStorage.setItem(LS_TODO_KEY, JSON.stringify(list));
  }, [list]);

  return (
    <div className={styles.todo}>
      <div className={styles.inputAndButtons}>
        <Input
          changeHandler={(data) => setItem(data)}
          value={item}
          enterKeyHandler={btnClickHandler}
          className={styles.input}
          placeholder="Add Item here"
        />
        <Button
          clickHandler={btnClickHandler}
          disabled={!item.trim().length}
          btnLabel="Add to the List"
          className={styles.addToListButton}
        />
        <Button
          btnLabel="Clear All"
          clickHandler={clearAllHandler}
          disabled={!list.length}
          className={styles.clearAllButton}
        />
        <Button
          btnLabel="Delete All Done Items"
          clickHandler={() => {
            delAllDoneBtnHandler();
          }}
          className={styles.deleteAllDoneButton}
        />
      </div>

      <div>
        <Input
          className={styles.search}
          placeholder="Search Item here"
          changeHandler={(data) => {
            searchInputHandler(data.trim());
            setSearchTerm(data.trim());
          }}
        />
      </div>

      <div className={styles.list}>
        <List
          items={list}
          swapItem={swapItem}
          doneBtnHandler={doneBtnHandler}
          delBtnHandler={delBtnHandler}
          editBtnHandler={editBtnHandler}
          cancelBtnhandler={cancelBtnhandler}
          changedInputEditHandler={changedInputEditHandler}
          saveBtnHandler={saveBtnHandler}
          searchTerm={searchTerm}
        />
      </div>
    </div>
  );
};

export default ToDo;
