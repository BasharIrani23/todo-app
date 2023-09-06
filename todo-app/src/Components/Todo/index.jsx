import React, { useEffect, useState, useContext } from "react";
import useForm from "../../hooks/form.js";
import { v4 as uuid } from "uuid";
import { settingsContext } from "../../Context/Setting";
import List from "../List/index.js";

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
    const { list, setList, incomplete, setIncomplete } =
        useContext(settingsContext);

    const [defaultValues] = useState({
        difficulty: 4,
    });

    const { handleChange, handleSubmit } = useForm(addItem, defaultValues);

    function addItem(item) {
        if (!item.text || !item.assignee) {
            alert("Both text and assignee fields are required.");
            return;
        }
        item.id = uuid();
        item.complete = false;
        setList([...list, item]);
    }

    function deleteItem(id) {
        const items = list.filter((item) => item.id !== id);
        setList(items);
    }

    function toggleComplete(id) {
        const items = list.map((item) => {
            if (item.id === id) {
                item.complete = !item.complete;
            }
            return item;
        });

        setList(items);
    }

    useEffect(() => {
        updateIncompleteCountAndTitle();
    }, [list]);

    const updateIncompleteCountAndTitle = () => {
        let incompleteCount = list.filter((item) => !item.complete).length;
        setIncomplete(incompleteCount);
        document.title = `To Do List: ${incomplete}`;
    };

    return (
        <div className="todo-container">
            <header data-testid="todo-header">
                <h1 data-testid="todo-h1">
                    To Do List: {incomplete} items pending
                </h1>
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

            <List list={list} toggleComplete={toggleComplete} />
        </div>
    );
};

export default Todo;
