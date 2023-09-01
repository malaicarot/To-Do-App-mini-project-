import React, { useState } from "react";
import "./TodoItems.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import {
  faSquareCheck,
  faTrash,
  faPenToSquare,
  faPalette,
} from "@fortawesome/free-solid-svg-icons";
import { todoListStorage } from "../../untils/localStorage";
import ColorPalette from "../ColorPalette/ColorPalette";

const TodoItems = (props) => {
  const { title, id, status, color } = props;
  const [checked, setChecked] = useState(status);
  const handleCheck = () => {
    setChecked((prev) => {
      const checkingItem = todoListStorage.find(id);
      checkingItem.status = !prev;
      todoListStorage.edit(id, checkingItem);
      return !prev;
    });
  };
  const handleRemoveItem = () => {
    todoListStorage.removeItem(id);
    props.reRenderAfterRemoveItem(id);
  };

  const handleTogglePalette = () => {
    props.showPaletteById(id);
  };

  const handleSetColor = (color) => {
    const newTodo = { ...todoListStorage.find(id), color: color };
    todoListStorage.edit(id, newTodo);
    props.reRenderAfterSetColor(id, color);
    props.showPaletteById(id);
  };
  return (
    <div className="todo-item-wrap">
      <div
        className={`todo-item ${!checked ? "" : "todo-item-checked"}`}
        style={{ background: color }}
      >
        <p className="todo-title">{title}</p>
        <div className="setting-space">
          <div className="setting-btn" onClick={handleCheck}>
            <FontAwesomeIcon icon={!checked ? faSquare : faSquareCheck} />
          </div>
          <div className="setting-btn" onClick={handleRemoveItem}>
            <FontAwesomeIcon icon={faTrash} />
          </div>
          <div className="setting-btn" onClick={() => props.editItemById(id)}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </div>
          <div className="setting-btn" onClick={handleTogglePalette}>
            <FontAwesomeIcon icon={faPalette} />
          </div>
        </div>
      </div>
      {props.coloringItem === id && <ColorPalette handleSetColor={handleSetColor} />}
    </div>
  );
};

export default TodoItems;
