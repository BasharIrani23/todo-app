import React, { useState, useContext, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { SettingsContext } from "../../Context/Setting/index";
import List from "../List/index.js";
import useForm from "../../hooks/form";
import axios from "../../hooks/axios"; // Import axios with the updated base URL
import instance from "../../hooks/axios";
import { AuthContext } from "../../Context/AuthContext";

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
    const { user } = useContext(AuthContext);
    const [users, setUsers] = useState([]);

    const [defaultValues] = useState({
        difficulty: 4,
    });

    const { handleChange, handleSubmit, values } = useForm(
        addItem,
        defaultValues
    );

    async function addItem(item) {
        console.log("push");
        if (!item.text || !item.assignee) {
            alert("Both text and assignee fields are required.");
            return;
        }

        try {
            const response = await instance.post(
                "/todo", // Updated base URL
                item
            );

            if (response.status === 201) {
                item.id = uuid();
                item.complete = false;
                setList([...list, item]);
            } else {
                console.error("Add item failed");
            }
        } catch (error) {
            console.error("Add item error:", error);
        }
    }

    useEffect(() => {
        // Fetch the current list of items from the server on application start
        async function fetchTodoList() {
            try {
                const response = await instance.get(
                    "/todo" // Updated base URL
                );

                if (response.status === 200) {
                    setList(response.data);
                } else {
                    console.error("Fetch todo list failed");
                }
            } catch (error) {
                console.error("Fetch todo list error:", error);
            }
        }

        fetchTodoList();
    }, [setList]);

    useEffect(() => {
        async function fetchTodoList() {
            try {
                const response = await instance.get(
                    "/users" // Updated base URL
                );

                if (response.status === 200) {
                    setUsers(response.data);
                } else {
                    console.error("Fetch users failed");
                }
            } catch (error) {
                console.error("Fetch users error:", error);
            }
        }

        fetchTodoList();
    }, []);

    return (
        <div className="todo-container">
            <header data-testid="todo-header">
                <h1 data-testid="todo-h1">To Do List</h1>
            </header>
            <form onSubmit={handleSubmit} className="todo-form">
                <h2>Add To Do Item</h2>
                <input type="hidden" name="created_by" value={user.id} />
                <InputField
                    name="text"
                    type="text"
                    placeholder="Item Details"
                    onChange={handleChange}
                />

                {/* <InputField
                    name="assignee"
                    type="text"
                    placeholder="Assignee Name"
                    onChange={handleChange}
                /> */}

                <select name="assigne" id="">
                    {users?.length > 0 &&
                        users.map((e) => (
                            <option value={e.id}>{e.username}</option>
                        ))}
                </select>

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
