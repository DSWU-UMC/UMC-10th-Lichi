import { useContext } from "react";
import "./App.css";
import Todo from "./components/Todo";
import { ModeProvider } from "./context/ModeContext";
import { ModeContext } from "./context/ModeContext";
import { TodoProvider } from "./context/TodoContext";

function App() {
  return (
    <>
      <ModeProvider>
        <TodoProvider>
          <Todo />
        </TodoProvider>
      </ModeProvider>
    </>
  );
}

export default App;
