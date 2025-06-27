import React, { useState } from "react";
import { API_BASE_URL } from "../config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const TaskList = ({ tasks, refreshTasks }) => {
    const [deleteTaskId, setDeleteTaskId] = useState(null);

    const markCompleted = async (task) => {
        await fetch(`${API_BASE_URL}/${task.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...task,
                completed: !task.completed,
            }),
        });
        refreshTasks();
    };

    const confirmDelete = (id) => {
        setDeleteTaskId(id);
    };

    const cancelDelete = () => {
        setDeleteTaskId(null);
    };

    const deleteTask = async () => {
        if (deleteTaskId !== null) {
            await fetch(`${API_BASE_URL}/${deleteTaskId}`, { method: "DELETE" });
            refreshTasks();
            setDeleteTaskId(null);
        }
    };

    return (
        <>
            <ul className="list-group mt-3">
                {tasks.map((task) => (
                    <li
                        key={task.id}
                        className="list-group-item d-flex align-items-center"
                    >
                        <input
                            className="form-check-input me-3"
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => markCompleted(task)}
                        />
                        <span
                            className={`flex-grow-1 ${task.completed ? "text-decoration-line-through text-muted" : ""
                                }`}
                        >
                            <strong>{task.title}</strong>
                            {task.description && `: ${task.description}`}
                        </span>
                        <button
                            onClick={() => confirmDelete(task.id)}
                            className="btn btn-sm btn-outline-danger ms-3"
                            aria-label="Delete task"
                        >
                            <FontAwesomeIcon icon={faTrash} size="lg" />
                        </button>
                    </li>
                ))}
            </ul>

            {/* Custom confirmation dialog */}
            {deleteTaskId !== null && (
                <div
                    className="position-fixed top-0 start-0 vw-100 vh-100 d-flex justify-content-center align-items-center"
                    style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}
                >
                    <div className="bg-white p-4 rounded shadow" style={{ minWidth: "300px" }}>
                        <p>Are you sure you want to delete this task?</p>
                        <div className="d-flex justify-content-end gap-2">
                            <button className="btn btn-secondary" onClick={cancelDelete}>
                                Cancel
                            </button>
                            <button className="btn btn-danger" onClick={deleteTask}>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default TaskList;
