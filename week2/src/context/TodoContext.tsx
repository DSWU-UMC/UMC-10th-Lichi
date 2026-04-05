import { createContext, useContext, useState } from "react";
import type { PropsWithChildren } from "react";
import type { TTodo } from "../types/todo";

interface ITodoContext {
  todos: TTodo[];
  doneTodos: TTodo[];
  addTodo: (text: string) => void;
  completeTodo: (todo: TTodo) => void;
  deleteTodo: (todo: TTodo) => void;
}

export const TodoContext = createContext<ITodoContext | undefined>(undefined);

export const TodoProvider = ({ children }: PropsWithChildren) => {
  const [todos, setTodos] = useState<TTodo[]>([]);
  const [doneTodos, setDoneTodos] = useState<TTodo[]>([]);

  const addTodo = (text: string): void => {
    // 텍스트가 있을 경우
    const newTodo: TTodo = { id: Date.now(), text }; // 새로운 투두!
    setTodos((prevTodos): TTodo[] => [...prevTodos, newTodo]); // 할 일 목록에 추가
  };

  const completeTodo = (todo: TTodo): void => {
    setTodos((prevTodos) => prevTodos.filter((t) => t.id != todo.id));
    setDoneTodos((prevDoneTodos): TTodo[] => [...prevDoneTodos, todo]);
  };
  const deleteTodo = (todo: TTodo): void => {
    setDoneTodos((prevDoneTodos): TTodo[] =>
      prevDoneTodos.filter((t): boolean => t.id !== todo.id),
    );
  };

  return (
    <TodoContext.Provider
      value={{ todos, doneTodos, addTodo, completeTodo, deleteTodo }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = (): ITodoContext => {
  const context = useContext(TodoContext);
  if (!context) {
    // context가 없는 경우
    throw new Error(
      "useTodo를 사용하기 위해서는, 무조건 TodoProvider로 감싸야 합니다.",
    );
  }
  // 무조건 context가 있는 경우
  return context;
};
