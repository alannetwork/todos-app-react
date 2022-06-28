import { react } from "@babel/types";
import React from "react";
import { AppUI } from "./AppUI";

/* const defaultTodos=[
  {text:'Cortar cebolla 1',completed: false },
  {text:'Hacer limpieza 2',completed: false },
  {text:'Preparar el desayuno 3',completed: false },
  {text:'Estudiar en platzi',completed: false },
]; */

function useLocalStorage(itemName,initialValue){
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [item, setItem] = React.useState(initialValue);

  React.useEffect(()=>{
    setTimeout(()=>{
      try {
      
        const localStorageItem = localStorage.getItem(itemName);
        let parsedItem;
      
        if (!localStorageItem){
          localStorage.setItem(itemName,JSON.stringify(initialValue));
          parsedItem=initialValue;
        }else{
          parsedItem = JSON.parse(localStorageItem);
        }
        setItem(parsedItem);
        setLoading(false);
    
      } catch (error) {
        setError(error);        
      }
    },1000);
  });


  const saveItem = (newItem) =>{
    try {
      const stringifiedItem = JSON.stringify(newItem);
      localStorage.setItem(itemName,stringifiedItem);
      setItem(newItem);
      
    } catch (error) {
      setError(error);
    }
  }

  return {
    item,
    saveItem,
    loading,
    error,
  };

}

function App(props) {
  const {
    item:todos,
    saveItem:saveTodos,
    loading,
    error,
  } = useLocalStorage('TODOS_V1',[]);

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
      loading={loading}
      error={error}
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
