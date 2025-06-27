import React, { useState } from "react";
import { API_BASE_URL } from "../config";

const TaskFormComponent = ({ refreshTasks }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (title.trim() === "") {
            setError("Title field is mandatory");
            return;
        }

        setError("");

        await fetch(API_BASE_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: title.trim(),
                description: description.trim(),
                completed: false,
            }),
        });

        setTitle("");
        setDescription("");
        refreshTasks();
    };

    return (
        <form onSubmit={handleSubmit} noValidate className="mb-3">
            <div className="row g-2 align-items-end position-relative">
                {/* Title Field */}
                <div className="col-12 col-md-5" style={{ position: "relative" }}>
                    <label className="form-label mb-1">
                        Title <span className="text-danger">*</span>
                    </label>
                    <input
                        className={`form-control ${error ? "is-invalid" : ""}`}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    {error && (
                        <div
                            className="text-danger small"
                            style={{
                                position: "absolute",
                                top: "115%",
                                left: 0,
                                zIndex: 10,

                            }}
                        >
                            {error}
                        </div>
                    )}
                </div>

                {/* Description Field */}
                <div className="col-12 col-md-6">
                    <label className="form-label mb-1">Description</label>
                    <input
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                {/* Add Task Button */}
                <div className="col-12 col-md-1 d-grid">
                    <button type="submit" className="btn btn-primary mt-md-4">
                        Add Task
                    </button>
                </div>
            </div>
        </form>
    );
};

export default TaskFormComponent;
