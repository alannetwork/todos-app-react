import React from "react";
import { AppUI } from "./AppUI";

const defaultTodos=[
  {text:'Cortar cebolla 1',completed: false },
  {text:'Hacer limpieza 2',completed: false },
  {text:'Preparar el desayuno 3',completed: false },
  {text:'Estudiar en platzi',completed: false },
];

function App(props) {

  const [todos, setTodos] = React.useState(defaultTodos);

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

  const completeTodos = (text) =>{
    const todoIndex = todos.findIndex(todo => todo.text === text);
    const newTodos = [...todos];
    newTodos[todoIndex].completed = true;
    return setTodos(newTodos);
  };

  const deleteTodos = (text) =>{
    const todoIndex = todos.findIndex(todo => todo.text === text);
    const newTodos = [...todos];
    newTodos.splice(todoIndex,1);
    return setTodos(newTodos);
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
