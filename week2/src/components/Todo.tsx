import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import { useTodo } from "../context/TodoContext";
import { useMode } from "../context/ModeContext";

const Todo = () => {
  const { todos, completeTodo, deleteTodo, doneTodos } = useTodo();
  const { mode, toggleMode } = useMode();

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10 font-sans text-slate-900 transition-colors dark:bg-neutral-900 dark:text-neutral-100">
      <button
        type="button"
        onClick={toggleMode}
        aria-pressed={mode === "dark"}
        className="absolute right-5 top-5 rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
      >
        {mode === "light" ? "다크 모드" : "라이트 모드"}
      </button>

      <div className="w-full max-w-[350px] rounded-lg bg-white p-5 text-center shadow-md transition-colors dark:bg-neutral-800">
        <h1 className="mb-4 text-2xl font-bold">Lychee's TODO</h1>
        <TodoForm />
        <div className="flex gap-5">
          <TodoList
            title="할 일"
            todos={todos}
            buttonLabel="완료"
            variant="complete"
            onClick={completeTodo}
          />
          <TodoList
            title="완료"
            todos={doneTodos}
            buttonLabel="삭제"
            variant="delete"
            onClick={deleteTodo}
          />
        </div>
      </div>
    </main>
  );
};

export default Todo;
