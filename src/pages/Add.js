import { useState } from "react";
import "./Add.css";

function Add() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("todo");
  const [dueDate, setDueDate] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    await fetch(`${process.env.REACT_APP_API_URL}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, status, dueDate }),
    });
    window.location.href = "/";
  };

  return (
    <div className="add-container">
      <form onSubmit={submit} className="add-form">
        <h1>Add Task</h1>
        <input
          className="add-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <textarea
          className="add-textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        ></textarea>
        <select
          className="add-select"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="todo">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <input
          type="date"
          className="add-input"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button type="submit" className="add-btn">Add Task</button>
      </form>
    </div>
  );
}

export default Add;
