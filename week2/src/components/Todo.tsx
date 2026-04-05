import React from "react";
import { useState, type FormEvent } from "react";
import type { TTodo } from "../types/todo";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

const Todo = () => {
  const [todos, setTodos] = useState<TTodo[]>([]);
  const [doneTodos, setDoneTodos] = useState<TTodo[]>([]);
  const [input, setInput] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const text = input.trim(); // 앞에 공백을 잘라주는 역할 ' 123'이 들어오더라도 '123'으로 들어오게
    if (text) {
      // 텍스트가 있을 경우
      const newTodo: TTodo = { id: Date.now(), text }; // 새로운 투두!
      setTodos((prevTodos): TTodo[] => [...prevTodos, newTodo]); // 할 일 목록에 추가
      setInput("");
    }
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
    <div className="todo-container">
      <h1 className="todo-container__header">Lychee's TODO</h1>
      <TodoForm input={input} setInput={setInput} handleSubmit={handleSubmit} />
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
  );
};

export default Todo;
