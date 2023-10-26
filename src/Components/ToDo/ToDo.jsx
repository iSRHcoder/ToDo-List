/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// ES6 Modules or TypeScript
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
  const [searchData, setSearchData] = useState("");
  const [cloneList, setCloneList] = useState(
    JSON.parse(localStorage.getItem(LS_TODO_KEY)) || []
  );

  const btnClickHandler = () => {
    // const items =[...list];
    // items.push(item);
    // setList(items);

    // we can write these 3lines above lines in 1line
    if (item.trim().length) {
      setList([
        ...list,
        { item, editingItem: item, isDone: false, isEditing: false },
      ]);
      setCloneList((prev) => [
        ...prev,
        { item, editingItem: item, isDone: false, isEditing: false },
      ]);
      setItem("");
    }
  };

  const swapItem = (initialIndex, finalIndex) => {
    const items = [...list];
    const temp = items[initialIndex];
    items[initialIndex] = items[finalIndex];
    items[finalIndex] = temp;
    setCloneList(items);
    setList(items);
  };

  const doneBtnHandler = (index) => {
    const items = [...list];
    items[index].isDone = true;
    setCloneList(items);
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
        setCloneList(filteredItems);
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
        setCloneList(items);
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
        setCloneList([]);
        setList([]);
        Swal.fire("Cleared!", "Your All Items have been Cleared.", "success");
      }
    });
  };

  const editBtnHandler = (index) => {
    console.log("index", index);
    const items = [...list];
    items[index].isEditing = true;
    setList(items);
  };

  const cancelBtnhandler = (index) => {
    const items = [...list];
    items[index].isEditing = false;
    items[index].editingItem = items[index].item;
    setCloneList(items);
    setList(items);
  };

  const changedInputEditHandler = (index, data) => {
    const items = [...list];
    const cloneItems = [...cloneList];
    items[index].editingItem = data;
    cloneItems[index].editingItem = data;
    setCloneList(cloneItems);
    setList(items);
  };

  const saveBtnHandler = (index) => {
    const items = [...list];
    console.log("HERE list", list);
    items[index].isEditing = false;
    items[index].item = items[index].editingItem;
    console.log("items", items);
    setCloneList((prev) => [...prev]);
    setList(items);
  };

  const searchInputHandler = (data) => {
    const items = [...list];
    const searchTerm = items.filter((task) => {
      console.log("task", task.item);
      console.log("data", data);

      return task.item.toLowerCase().includes(data);
    });
    console.log("searchterms", searchTerm);
    setSearchData(data);
    setSearchTerm(searchTerm);

    if (data) {
      setList(searchTerm);
    } else {
      setList(cloneList);
    }
  };
  console.log("cloneList", cloneList);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem(LS_TODO_KEY)) || [];
    setList(items);
  }, []);

  useEffect(() => {
    localStorage.setItem(LS_TODO_KEY, JSON.stringify(list));
  }, [list]);

  return (
    <div className={styles.todo}>
      <div>
        <Input
          changeHandler={(data) => setItem(data)}
          value={item}
          enterKeyHandler={btnClickHandler}
          className={styles.inputAndButtons}
          placeholder="Add Item here"
        />
        <Button
          clickHandler={btnClickHandler}
          disabled={!item.trim().length}
          btnLabel="Add to the List"
          className={styles.inputAndButtons}
        />
        <Button
          btnLabel="Clear All"
          clickHandler={clearAllHandler}
          disabled={!list.length}
          className={styles.inputAndButtons}
        />
        <Button
          btnLabel="Delete All Done Items"
          clickHandler={() => {
            delAllDoneBtnHandler();
          }}
          className={styles.inputAndButtons}
        />
      </div>

      <div className={styles.search}>
        <Input
          placeholder="Search Item here"
          changeHandler={(data) => {
            searchInputHandler(data);
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
          searchData={searchData}
          searchTerm={searchTerm}
        />
      </div>
    </div>
  );
};

export default ToDo;
