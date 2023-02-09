import React from "react";
import "./App.css";
import { useState } from "react";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [Todos, setTodos] = useState<Todo[]>([]);

  type Todo = {
    inputValue: string;
    id: number;
    checked: boolean;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTodo: Todo = {
      inputValue: inputValue,
      id: Todos.length,
      checked: false,
    };

    setTodos([...Todos, newTodo]);
  };

  const handleEdit = (id: number, inputValue: string) => {
    const newTodos: Todo[] = Todos.map((todo) => {
      if (todo.id === id) {
        console.log(`id: ${id}, inputValue: ${inputValue}`);
        todo.inputValue = inputValue;
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const handleChecked = (id: number, inputValue: boolean) => {
    const newTodos: Todo[] = Todos.map((todo) => {
      if (todo.id === id) {
        todo.checked = !inputValue;
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const handleDelete = (id: number) => {
    const newTodos: Todo[] = Todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  return (
    <div className="App">
      <div>
        <h2>Todo List with Typescript</h2>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <input
            type="text"
            onChange={(e) => {
              handleChange(e);
            }}
            className="inputText"
          />{" "}
          <input type="submit" className="submitButton" />
        </form>
        <ul className="todoList">
          {Todos.map((todo) => (
            <li key={todo.id}>
              <input
                type="text"
                onChange={(e) => handleEdit(todo.id, e.target.value)}
                className="inputText"
                value={todo.inputValue}
                disabled={todo.checked}
              />
              <input
                type="checkbox"
                onChange={(e) => handleChecked(todo.id, todo.checked)}
              />
              <button
                onClick={() => {
                  handleDelete(todo.id);
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
