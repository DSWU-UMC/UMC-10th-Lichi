import type { TTodo } from "../types/todo";

interface TodoListProps {
  title: string;
  todos?: TTodo[];
  buttonLabel: string;
  variant: "complete" | "delete"; // 색상 자체를 넘기는 대신 의미를 넘김
  onClick?: (todo: TTodo) => void;
}

const TodoList = ({
  title,
  todos,
  buttonLabel,
  variant,
  onClick,
}: TodoListProps) => {
  const buttonClassName =
    variant === "complete" // 완료일 경우 초록색, 삭제일 경우 빨간색
      ? "bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-400"
      : "bg-rose-600 hover:bg-rose-700 dark:bg-rose-500 dark:hover:bg-rose-400";

  return (
    <section className="min-w-0 flex-1 text-left">
      <h2 className="mb-2.5 flex justify-center text-lg font-semibold">
        {title}
      </h2>
      <ul id="todo-list" className="m-0 list-none p-0">
        {todos?.map((todo) => (
          <li
            key={todo.id}
            className="mb-1.5 flex w-full items-center justify-between gap-2 rounded-md border-b border-slate-200 bg-slate-50 p-2 transition-colors dark:border-neutral-700 dark:bg-neutral-700"
          >
            <span className="block min-w-0 flex-1 break-words">
              {todo.text}
            </span>
            <button
              onClick={(): void => onClick?.(todo)}
              className={`${buttonClassName} shrink-0 rounded-md px-2.5 py-1.5 text-xs font-medium text-white transition-colors`}
            >
              {buttonLabel}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TodoList;
