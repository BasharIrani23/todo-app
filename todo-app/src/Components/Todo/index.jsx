import React, { useState, useContext } from "react";
import { v4 as uuid } from "uuid";
import { SettingsContext } from "../../Context/Setting/index";
import List from "../List/index.js";
import useForm from "../../hooks/form";
const InputField = ({ name, type, placeholder, value, onChange }) => (
    <label className="input-label">
        <span>{placeholder}</span>
        <input
            onChange={onChange}
            name={name}
            type={type}
            placeholder={placeholder}
            value={value}
        />
    </label>
);

const Todo = () => {
    const { list, setList } = useContext(SettingsContext);

    const [defaultValues] = useState({
        difficulty: 4,
    });

    const { handleChange, handleSubmit, values } = useForm(
        addItem,
        defaultValues
    );

    function addItem(item) {
        if (!item.text || !item.assignee) {
            alert("Both text and assignee fields are required.");
            return;
        }
        item.id = uuid();
        item.complete = false;
        setList([...list, item]);
    }

    return (
        <div className="todo-container">
            <header data-testid="todo-header">
                <h1 data-testid="todo-h1">To Do List</h1>
            </header>
            <form onSubmit={handleSubmit} className="todo-form">
                <h2>Add To Do Item</h2>

                <InputField
                    name="text"
                    type="text"
                    placeholder="Item Details"
                    onChange={handleChange}
                />

                <InputField
                    name="assignee"
                    type="text"
                    placeholder="Assignee Name"
                    onChange={handleChange}
                />

                <label className="input-label">
                    <span>Difficulty</span>
                    <input
                        onChange={handleChange}
                        defaultValue={defaultValues.difficulty}
                        type="range"
                        min={1}
                        max={5}
                        name="difficulty"
                    />
                </label>

                <div className="submit-button">
                    <button type="submit">Add Item</button>
                </div>
            </form>
            <List list={list} />
        </div>
    );
};

export default Todo;
