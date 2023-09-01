import React, { useState } from "react";
import "./App.css";
import { todoListStorage } from "./untils/localStorage";
import TodoList from "./components/TodoList/TodoList";
import TodoItems from "./components/TodoItems/TodoItems";
import InputTodo from "./components/InputTodo/InputTodo";
const App = () => {
  const [todoList, setTodoList] = useState(todoListStorage.load());
  const [editingItem, setEditingItem] = useState(null);
  const [filterByType, setFilterByType] = useState("all");
  const [coloringItem, setColoringItem] = useState(null);

  // Filter
  const handleFilter = (filterType) => {
    let filteredList = [];
    switch (filterType) {
      case "all":
        filteredList = todoListStorage.load();
        break;
      case "completed":
        filteredList = todoListStorage.load().filter((todo) => todo.status);
        break;
      case "unCompleted":
        filteredList = todoListStorage.load().filter((todo) => !todo.status);
        break;
      default:
        filteredList = todoListStorage.load();
    }
    setTodoList(filteredList);
    setFilterByType(filterType);
    setColoringItem(null);
  };
  // Add new todo
  const handleAddNewTodo = (text) => {
    const newTodo = {
      title: text,
      id: new Date().getTime(),
      status: false,
    };
    const newTodoList = [...todoListStorage.load(), newTodo];
    todoListStorage.save(newTodoList);
    setTodoList(newTodoList);
  };
  // edit todo
  const handleEditTodo = (text) => {
    const editedTodo = { ...todoListStorage.find(editingItem), title: text };
    todoListStorage.edit(editingItem, editedTodo);

    setTodoList(
      todoList.map((todo) => (todo.id === editingItem ? editedTodo : todo))
    );
    setEditingItem(null);
  };

  // remove all todo
  const handleRemoveAll = () => {
    todoListStorage.removeAll();
    setTodoList([]);
    setEditingItem(null);
    setFilterByType("all");
  };
  // edit item by id
  const editItemById = (id) => {
    setEditingItem(id);
  };
  // re-render after remove item
  const reRenderAfterRemoveItem = (id) => {
    setTodoList(todoList.filter((todo) => todo.id !== id));
  };
  // show palette by id
  const showPaletteById = (id) => {
    setColoringItem(id === coloringItem ? null : id);
  };
  // re-render after set color
  const reRenderAfterSetColor = (id, color) => {
    setTodoList(todoList.map((todo) =>todo.id === id ? { ...todo, color: color } : todo));
  };
  return (
    <div className="container">
      <InputTodo
        handleAddNewTodo={handleAddNewTodo}
        handleEditTodo={handleEditTodo}
        editingItem={editingItem}
      />
      <div className="body-space">
        <div className="filter-space">
          <button
            onClick={() => handleFilter("all")}
            className={filterByType === "all" ? "focus-btn" : ""}
          >
            All
          </button>
          <button
            onClick={() => handleFilter("completed")}
            className={filterByType === "completed" ? "focus-btn" : ""}
          >
            Completed
          </button>
          <button
            onClick={() => handleFilter("unCompleted")}
            className={filterByType === "unCompleted" ? "focus-btn" : ""}
          >
            Uncompleted
          </button>
        </div>
        <TodoList>
          {todoList.map(item => (
            <TodoItems
              {...item}
              key={item.id}
              reRenderAfterRemoveItem={reRenderAfterRemoveItem}
              coloringItem={coloringItem}
              editItemById={editItemById}
              reRenderAfterSetColor={reRenderAfterSetColor}
              showPaletteById={showPaletteById}
            />
          ))}
        </TodoList>
        {todoListStorage.load().length > 2 && (
          <div className="remove-all">
            <button onClick={handleRemoveAll}>Clear All</button>
          </div>
        )}
        {todoListStorage.load().length === 0 && (
          <p className="is-clear">Your list is clear!</p>
        )}
      </div>
    </div>
  );
};

export default App;
