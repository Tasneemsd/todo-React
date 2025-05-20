import React, { useState } from "react";
import './TodoItems.css';
import { FaTrash, FaEdit, FaSave } from "react-icons/fa";
import { MdCheckCircle, MdRadioButtonUnchecked } from "react-icons/md";

function TodoItem({ todo, deleteTodo, toggleComplete, updateTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);

  const handleSave = () => {
    updateTodo(todo.id, editedText);
    setIsEditing(false);
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <span className="category-tag">{todo.category}</span>

      {isEditing ? (
        <input
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSave()}
        />
      ) : (
        <span>{todo.text}</span>
      )}

      <div className="actions">
        <button onClick={() => toggleComplete(todo.id)}>
          {todo.completed ? <MdCheckCircle /> : <MdRadioButtonUnchecked />}
        </button>
        {isEditing ? (
          <button onClick={handleSave}><FaSave /></button>
        ) : (
          <button onClick={() => setIsEditing(true)}><FaEdit /></button>
        )}
        <button onClick={() => deleteTodo(todo.id)}><FaTrash /></button>
      </div>
    </div>
  );
}

export default TodoItem;
