import React from "react";
import { AppUI } from "./AppUI";

/* const defaultTodos=[
  {text:'Cortar cebolla 1',completed: false },
  {text:'Hacer limpieza 2',completed: false },
  {text:'Preparar el desayuno 3',completed: false },
  {text:'Estudiar en platzi',completed: false },
]; */

function App(props) {

  const localStorageTodos = localStorage.getItem('TODOS_V1');

  let parsedTodos;

  if (!localStorageTodos){
    localStorage.setItem('TODOS_v1',JSON.stringify([]));
    parsedTodos=[];
  }else{
    parsedTodos = JSON.parse(localStorageTodos);
  }

  const [todos, setTodos] = React.useState(parsedTodos);

  const [searchValue,setSearchValue] = React.useState('');
  const totalTodos = todos.length;
  
  const completedTodos = todos.filter(todo=>todo.completed).length;

  let searchedTodos = [];

  if (!searchValue.length>=1){
    searchedTodos=todos;
  } else{
    searchedTodos = todos.filter(todo =>{
      const todoText = todo.text.toLowerCase();
      const searchText = searchValue.toLowerCase();

      return todoText.includes(searchText);
    });

  }

  const saveTodos = (newTodos) =>{
    const stringifiedTodos = JSON.stringify(newTodos);
    localStorage.setItem('TODOS_V1',stringifiedTodos);
    setTodos(newTodos);
  }

  const completeTodos = (text) =>{
    const todoIndex = todos.findIndex(todo => todo.text === text);
    const newTodos = [...todos];
    newTodos[todoIndex].completed = true;
    return saveTodos(newTodos);
  };

  const deleteTodos = (text) =>{
    const todoIndex = todos.findIndex(todo => todo.text === text);
    const newTodos = [...todos];
    newTodos.splice(todoIndex,1);
    return saveTodos(newTodos);
  };


  return (
    <AppUI
      totalTodos={totalTodos}
      completedTodos={completedTodos}
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      searchedTodos={searchedTodos}
      completeTodos={completeTodos}
      deleteTodos={deleteTodos}

    />
  );
}

export default App;
