import { useState } from "react";
import type { FormEvent } from "react";
import { useTodo } from "../context/TodoContext";

const TodoForm = () => {
  const [input, setInput] = useState<string>("");
  const { addTodo } = useTodo();

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const text = input.trim();

    if (text) {
      addTodo(text);
      setInput("");
    }
  };

  return (
    <form onSubmit={handleSubmit} id="todo-form" className="mb-5 flex gap-2.5">
      <input
        value={input}
        onChange={(e): void => setInput(e.target.value)}
        type="text"
        id="todo-input"
        className="min-w-0 flex-1 rounded-md border border-slate-300 bg-white px-2 py-2 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-neutral-500 dark:bg-neutral-700 dark:text-neutral-100 dark:placeholder:text-neutral-400 dark:focus:border-blue-400 dark:focus:ring-blue-500/30"
        placeholder="할 일을 입력하세요"
        required
      />
      <button
        type="submit"
        className="shrink-0 rounded-md bg-emerald-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-400"
      >
        추가
      </button>
    </form>
  );
};

export default TodoForm;
