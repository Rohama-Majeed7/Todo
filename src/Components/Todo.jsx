import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTask, removeTask, editTask } from "../store/TodoSlice";

const Todo = () => {
  const [task, setTask] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const todos = useSelector((state) => state.Todo);
  const dispatch = useDispatch();

  const handleAddTask = () => {
      dispatch(addTask({ id: Date.now(), text: task }));
      setTask("");
  };

  const handleRemoveTask = (id) => {
    dispatch(removeTask({ id }));
  };

  const handleEditTask = (id) => {
    const taskToEdit = todos.find((task) => task.id === id);
    if (taskToEdit) {
      setEditingId(id);
      setEditingText(taskToEdit.text);
    }

  };

  const handleSaveEdit = () => {
    if (editingText.trim()) {
      dispatch(editTask({ id: editingId, text: editingText }));
      setEditingId(null);
      setEditingText("");
    }
  };

  return (
    <div className="h-screen w-screen inline-flex justify-center items-center">
      <div className="bg-white shadow-lg shadow-cyan-500/50 p-4 rounded-md">
        <h1 className="font-bold text-2xl my-3">Todo</h1>
        <div className="flex justify-between gap-3 items-center">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Add a task"
            className="py-1 px-2  rounded-md outline-none border-2 border-blue-500"
          />
          <button
            onClick={handleAddTask}
            className="py-1 px-2 bg-blue-600 rounded-md text-white"
          >
            Add Task
          </button>
        </div>
        <ul className="my-6">
          {todos.map((task) => (
            <li key={task.id}>
              {editingId === task.id ? (
                <span className="flex gap-2 justify-between items-center my-6 p-2 border-2 border-blue-200 rounded-md">
                  <input
                    className="py-1 px-2  rounded-md outline-none border-2 border-black-500"
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                  />
                  <button
                    onClick={handleSaveEdit}
                    className="py-1 px-2 bg-blue-600 rounded-md text-white"
                  >
                    Save
                  </button>
                </span>
              ) : (
                <span className="flex my-1 justify-between items-center p-2 border-2 border-blue-200 rounded-md">
                  {task.text}
                  <div className="flex gap-2 items-center">
                    <button
                      className="py-1 px-2 bg-blue-600 rounded-md text-white"
                      onClick={() => handleEditTask(task.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="py-1 px-2 bg-red-600 rounded-md text-white"
                      onClick={() => handleRemoveTask(task.id)}
                    >
                      Remove
                    </button>
                  </div>
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Todo;
