import React from "react";
import "./TodoForm.css";
import { TodoContext } from "../App/TodoContext";

function TodoForm() {
  const [newTodoValue, setNewTodoValue] = React.useState("");

  const { addTodos, setOpenModal } = React.useContext(TodoContext);

  const onChange = (event) => {
    setNewTodoValue(event.target.value);
    //TODO
  };

  const onCancel = () => {
    setOpenModal(false);
    //TODO
  };
  const onSubmit = (event) => {
    event.preventDefault();
    addTodos(newTodoValue);
    setOpenModal(false);
  };
  return (
    <form className="form-container" onSubmit={onSubmit}>
      <label>Registra un nuevo ToDo</label>
      <textarea
        rows="15"
        cols="30"
        value={newTodoValue}
        onChange={onChange}
        placeholder="Cortar la cebolla para el almuerzo"
      />
      <div className="conatiner-buttons">
        <button className="btn btn-danger" type="button" onClick={onCancel}>
          Cancelar
        </button>
        <button className="btn btn-add" type="submit">
          Añadir
        </button>
      </div>
    </form>
  );
}

export { TodoForm };
