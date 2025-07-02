import React, { useEffect, useState } from "react";
import {
    addTask,
    getTasks,
    updateTask,
    deleteTask,
} from "./services/taskServices";
import { Paper, TextField, Checkbox, Button } from "@mui/material";
import "./App.css";

function App() {
    const [tasks, setTasks] = useState([]);
    const [currentTask, setCurrentTask] = useState("");

    // Fetch tasks on mount
    useEffect(() => {
        async function fetchTasks() {
            try {
                const { data } = await getTasks();
                setTasks(data);
            } catch (err) {
                console.error("Error fetching tasks", err);
            }
        }
        fetchTasks();
    }, []);

    const handleChange = (e) => {
        setCurrentTask(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await addTask({ task: currentTask });
            setTasks([...tasks, data]);
            setCurrentTask("");
        } catch (err) {
            console.error("Error adding task", err);
        }
    };

    const handleUpdate = async (taskId) => {
        try {
            const updatedTasks = tasks.map((t) =>
                t._id === taskId ? { ...t, completed: !t.completed } : t
            );
            setTasks(updatedTasks);
            const task = updatedTasks.find((t) => t._id === taskId);
            await updateTask(taskId, { completed: task.completed });
        } catch (err) {
            console.error("Error updating task", err);
        }
    };

    const handleDelete = async (taskId) => {
        try {
            setTasks(tasks.filter((t) => t._id !== taskId));
            await deleteTask(taskId);
        } catch (err) {
            console.error("Error deleting task", err);
        }
    };

    return (
        <div className="app">
            <header className="app-header">
                <h1>My To-Do List</h1>
            </header>
            <div className="main-content">
                <Paper elevation={3} className="todo-container">
                    <form onSubmit={handleSubmit} className="task-form">
                        <TextField
                            variant="outlined"
                            size="small"
                            className="task-input"
                            value={currentTask}
                            required
                            onChange={handleChange}
                            placeholder="Add New TO-DO"
                        />
                        <Button
                            className="add-task-btn"
                            color="primary"
                            variant="outlined"
                            type="submit"
                        >
                            Add Task
                        </Button>
                    </form>
                    <div className="tasks-list">
                        {Array.isArray(tasks) && tasks.map((task) => (
                            <Paper key={task._id} className="task-item">
                                <Checkbox
                                    checked={task.completed}
                                    onClick={() => handleUpdate(task._id)}
                                    color="primary"
                                />
                                <div className={task.completed ? "task-text completed" : "task-text"}>
                                    {task.task}
                                </div>
                                <Button
                                    onClick={() => handleDelete(task._id)}
                                    color="secondary"
                                    className="delete-task-btn"
                                >
                                    Delete
                                </Button>
                            </Paper>
                        ))}
                    </div>
                </Paper>
            </div>
        </div>
    );
}

export default App;
