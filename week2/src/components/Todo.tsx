import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import { useTodo } from "../context/TodoContext";
import { useMode } from "../context/ModeContext";

const Todo = () => {
  const { todos, completeTodo, deleteTodo, doneTodos } = useTodo();
  const { mode, toggleMode } = useMode();

  return (
    <div className={`app ${mode}`}>
      <button onClick={toggleMode} className="modeBtn">
        Switch to {mode === "light" ? "dark" : "light"} mode
      </button>
      <div className="todo-container">
        <h1 className="todo-container__header">Lychee's TODO</h1>
        <TodoForm />
        <div className="render-container">
          <TodoList
            title="할 일"
            todos={todos}
            buttonLabel="완료"
            buttonColor="#28a745"
            onClick={completeTodo}
          />
          <TodoList
            title="완료"
            todos={doneTodos}
            buttonLabel="삭제"
            buttonColor="#dc3545"
            onClick={deleteTodo}
          />
        </div>
      </div>
    </div>
  );
};

export default Todo;
