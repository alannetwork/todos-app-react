import React from "react";
import { useLocalStorage } from "./useLocalStorage";

const TodoContext = React.createContext();  

function TodoProvider(props){
    const {
        item:todos,
        saveItem:saveTodos,
        loading,
        error,
      } = useLocalStorage('TODOS_V1',[]);
    
      const [searchValue,setSearchValue] = React.useState('');
      const [openModal, setOpenModal] = React.useState(false);

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
    
      const addTodos = (text) =>{
        const newTodos = [...todos];
        newTodos.push({
          completed: false,
          text
        });
        return saveTodos(newTodos);
      };
    
    
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
    
    return(
        <TodoContext.Provider value={{
            loading,
            error,
            totalTodos,
            completedTodos,
            searchValue,
            setSearchValue,
            searchedTodos,
            addTodos,
            completeTodos,
            deleteTodos,
            openModal,
            setOpenModal,
        }}> 
            {props.children}
        </TodoContext.Provider>
    );
};

export {TodoContext, TodoProvider};