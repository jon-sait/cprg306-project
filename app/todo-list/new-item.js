"use client";

import { useState } from "react";

export default function NewItem(props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [priority, setPriority] = useState("high");
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handlePriorityChange = (event) => {
    setPriority(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const item = {
      id: randomId(),
      title,
      content,
      date,
      priority,
      finished: false,
    };
    console.log(item);

    props.onAddItem(item);
    props.onCloseBtnClick();
  };

  return (
    <div className="w-[400px] h-[500px] py-8 px-4 rounded-md absolute top-10 bg-emerald-900">
      <div className="w-full inline-flex">
        <h2 className="w-full text-center text-xl font-bold text-lime-300">
          Add New Task
        </h2>
        <button
          className="text-[28px] absolute right-4 top-2 hover:text-yellow-300"
          onClick={props.onCloseBtnClick}
        >
          &times;
        </button>
      </div>
      <form className="mt-10 text-black" onSubmit={handleSubmit}>
        <div className="mb-2">
          <input
            placeholder="Title"
            required
            className="w-full mt-1 border-2 border-gray-300 p-2 rounded-lg font-sans"
            type="text"
            value={title}
            onChange={handleTitleChange}
          />
          <textarea
            placeholder="Content"
            required
            className="w-full mt-1 border-2 border-gray-300 p-2 rounded-lg font-sans"
            type="text"
            value={content}
            onChange={handleContentChange}
          />
        </div>
        <div className="flex justify-between">
          <input
            type="date"
            name="task-end"
            value={date}
            min={new Date().toISOString().split("T")[0]}
            max="2025-12-31"
            className="w-40 ml-1 border-2 border-gray-300 p-2 rounded-lg font-sans"
            onChange={handleDateChange}
          />
          <select
            className="ml-1 border-2 border-gray-300 p-2 rounded-lg font-sans"
            value={priority}
            onChange={handlePriorityChange}
          >
            <option value="" disabled>
              Priority
            </option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full mt-16 py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          Confirm
        </button>
      </form>
    </div>
  );
}

function randomId() {
  // This works by reading the hex encoding of the part after the decimal point of a random number
  return Math.random().toString(16).substring(2);
}
