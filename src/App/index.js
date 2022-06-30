import { react } from "@babel/types";
import React from "react";
import { AppUI } from "./AppUI";
import { TodoProvider } from "./TodoContext";


/* const defaultTodos=[
  {text:'Cortar cebolla 1',completed: false },
  {text:'Hacer limpieza 2',completed: false },
  {text:'Preparar el desayuno 3',completed: false },
  {text:'Estudiar en platzi',completed: false },
]; */

function App(props) {
 
  return (
    <TodoProvider>
      <AppUI   />
    </TodoProvider>
  );
}

export default App;
