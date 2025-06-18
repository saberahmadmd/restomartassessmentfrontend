import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Edit.css";

function Edit() {
  const { id } = useParams();
  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "todo",
    dueDate: "",
  });

  useEffect(() => {
    const fetchTask = async () => {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/tasks`);
      const data = await res.json();
      const found = data.find((t) => t.id === id);
      setTask(found || {});
    };
    fetchTask();
  }, [id]);

  const update = async (e) => {
    e.preventDefault();
    await fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    window.location.href = "/";
  };

  return (
    <div className="edit-container">
      <form onSubmit={update} className="edit-form">
        <h1>Edit Task</h1>
        <input
          className="edit-input"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
          required
        />
        <textarea
          className="edit-textarea"
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
        ></textarea>
        <select
          className="edit-select"
          value={task.status}
          onChange={(e) => setTask({ ...task, status: e.target.value })}
        >
          <option value="todo">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <input
          type="date"
          className="edit-input"
          value={task.dueDate ? task.dueDate.slice(0, 10) : ""}
          onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
        />
        <button type="submit" className="edit-btn">Update Task</button>
      </form>
    </div>
  );
}

export default Edit;
