import { useEffect, useState } from "react";
import "./Home.css";

function Home() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/tasks`);
    const data = await res.json();
    setTasks(data);
  };

  const deleteTask = async (id) => {
    await fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`, { method: "DELETE" });
    setTasks(tasks.filter((t) => t.id !== id));
  };

  useEffect(() => { fetchTasks(); }, []);

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Task Manager</h1>
        <a href="/add" className="home-btn">Add Task</a>
      </header>
      <div className="home-task-list">
        {tasks.length === 0 ? <p className='no-tasks'>No tasks to show!! Add Tasks</p> : (
          tasks.map((task) => (
            <div className="home-task-card" key={task.id}>
              <h3 className="home-task-title">{task.title}</h3>
              <p className="home-task-status">Status: {task.status}</p>
              <p className="home-task-description">{task.description}</p>
              {task.dueDate && <p className="home-task-due">Due: {task.dueDate.slice(0, 10)}</p>}
              <div className="home-task-actions">
                <a href={`/edit/${task.id}`} className="home-btn-secondary">Edit</a>
                <button onClick={() => deleteTask(task.id)} className="home-btn-danger">Delete</button>
              </div>
            </div>
          ))
        )}

      </div>
    </div>
  );
}

export default Home;
