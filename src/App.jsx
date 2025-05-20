import React, { useState } from "react";
import "./App.css";
import TodoItem from "./Components/TodoItems";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [category, setCategory] = useState("General");

  const addTodo = () => {
    if (input.trim() === "") return;
    setTodos([...todos, {
      id: Date.now(),
      text: input,
      completed: false,
      category: category
    }]);
    setInput("");
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo => (
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )));
  };

  const updateTodo = (id, newText) => {
    setTodos(todos.map(todo => (
      todo.id === id ? { ...todo, text: newText } : todo
    )));
  };

  return (
    <div className="app">
      <div className="todo-container">
        <h1>✨ Task Planner</h1>
        <div className="input-row">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a new task..."
          />
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="General">📁 General</option>
            <option value="Work">💼 Work</option>
            <option value="Study">📚 Study</option>
            <option value="Personal">🧘 Personal</option>
          </select>
          <button onClick={addTodo}> Add</button>
        </div>

        {todos.length === 0 ? (
          <p className="no-tasks">No tasks yet<br />Start planning by adding tasks above!</p>
        ) : (
          todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              deleteTodo={deleteTodo}
              toggleComplete={toggleComplete}
              updateTodo={updateTodo}
            />
          ))
        )}

        <div className="calendar-section">
          <h3>📅 Calendar</h3>
          <Calendar />
        </div>
      </div>
    </div>
  );
}

export default App;
