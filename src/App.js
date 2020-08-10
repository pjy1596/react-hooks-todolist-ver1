// https://reactjs.org/docs/hooks-state.html 참고, hook에서는 this 안 씀, functional component는 이런 거 말함
// const Example = (props) => {return <div />;} /// function Example(props) {return <div />;}
import React, { useState } from "react";
import "./App.css";

function Todo({ todo, index, completeTodo, deleteTodo }) {
  // 이거 destructuring이라서 {}안에 넣어줌. 원래는 props.todo, props.index임
  return (
    <div
      style={{ textDecoration: todo.isCompleted ? "line-through" : "none" }}
      className="todo"
    >
      {todo.text}
      <div>
        <button onClick={() => completeTodo(index)}>Complete</button>
        <button onClick={() => deleteTodo(index)}>X</button>
      </div>
    </div>
  );
}
function TodoForm({ addTodo }) {
  const [value, setValue] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        placeholder="Add Todo"
        onChange={(e) => setValue(e.target.value)}
      />
    </form>
  );
}
function App() {
  const [todos, setTodos] = useState([
    {
      text: "Learn about React",
      isCompleted: false,
    },
    {
      text: "Meet friend for lunch",
      isCompleted: false,
    },
    {
      text: "Build really cool todo app",
      isCompleted: false,
    },
  ]);
  const addTodo = (text) => {
    const NewTodos = [...todos, { text }];
    setTodos(NewTodos);
  };
  const completeTodo = (index) => {
    const NewTodos = [...todos];
    NewTodos[index].isCompleted = true;
    setTodos(NewTodos);
  };
  const deleteTodo = (index) => {
    const NewTodos = [...todos];
    NewTodos.splice(index, 1);
    setTodos(NewTodos);
  };
  return (
    <div className="app">
      <div className="todo-list">
        {todos.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
            completeTodo={completeTodo}
            deleteTodo={deleteTodo}
          />
          // Todo의 prop으로 넣어줌, key는 그냥 list에 다 들어가는 거 알지?
        ))}
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  );
}
export default App;
