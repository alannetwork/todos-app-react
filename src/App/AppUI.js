import React from "react";
import { TodoContext } from "./TodoContext";
import { TodoCounter } from "../TodoCounter";
import { TodoSearch } from "../TodoSearch";
import { TodoList } from "../TodoList";
import { TodoItem } from "../TodoItem";
import { TodoForm } from "../TodoForm";
import { CreateTodoButton } from "../CreateTodoButton";
import { Modal } from "../Modal";

function AppUI(){
    const {
        error,
        loading, 
        searchedTodos,
        completeTodos, 
        deleteTodos,
        openModal,
        setOpenModal,
        } = React.useContext(TodoContext);

    return(
        <React.Fragment>
          <TodoCounter/>
          <TodoSearch />       
            <TodoList>
                      {error && <p>Desespérate, hubo un error</p>}
                      {loading && <p>Estamos cargando, no desesperes</p>}
                      {(!loading && !searchedTodos.length) && <p>¡Crea tu primer TODO!</p>}
          
                      {searchedTodos.map(todo =>(
                        <TodoItem 
                        key={todo.text} 
                        text={todo.text}
                        completed={todo.completed} 
                        onComplete={()=>completeTodos(todo.text)}
                        onDelete={()=>deleteTodos(todo.text)}
                        />
                      ))}
            </TodoList>
            {!!openModal &&(
                <Modal>
                    <TodoForm />
                </Modal>
            )}
          <CreateTodoButton 
            setOpenModal={setOpenModal}
            openModal={openModal}
          />
        </React.Fragment>
        );
};

export { AppUI };